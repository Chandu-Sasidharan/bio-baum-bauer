import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { generateJwt } from '../helpers/jwt.js';
import User from '../models/User.js';

/**
 * the function named createNewUser is for creating new User.
 * @param {*} req ( firstName, lastName, address, email, password, mobilePhone, userType)
 * @param {*} res
 * @returns
 */

export const createNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    mobilePhone,
    userType,
    city,
    zipCode,
    address1,
    address2,
    state,
  } = req.body;

  const address = { city, zipCode, address1, address2, state };
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
      mobilePhone,
      userType,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created successfully', user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * The function name getAllUsers returns all users
 * @param {*} req ()
 * @param {*} res
 * @returns
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).lean();

    return res
      .status(StatusCodes.OK)
      .json({ users, message: 'Retrieved all users' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * getUserById returns a user based on id provided through parameters.
 * it can be used for showing the details of a user document
 * @param {uId} req
 * @param {*} res
 * @returns
 */
export const findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.uId).lean();

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with that id' });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * for finding a user record based on the email
 * @param {*} req (email)
 * @param {*} res
 */
export const findUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean(true);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with that email' });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * this function is gonna find user by Id and update it
 * @param {uId} req (mobilePhone)
 * @param {*} res
 * @returns
 */
export const updateById = async (req, res) => {
  const { mobilePhone, country, address1, address2, city, zipCode, state } =
    req.body;
  const address = {
    country: country ? country : 'Germany',
    state: state ? state : '',
    city: city,
    zipCode: zipCode,
    address1: address1,
    address2: address2 ? address2 : '',
  };
  const update = { mobilePhone, address };
  const isReturnNew = { new: true };

  try {
    const user = await User.findByIdAndUpdate(
      req.params.uId,
      update,
      isReturnNew
    );

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with that id' });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * find user with email then update it's firstName
 * @param {*} req (email,firstName)
 * @param {*} res
 * @returns
 */
export const findByEmailAndUpdate = async (req, res) => {
  const { email, firstName } = req.body;
  const filter = { email };
  const update = { firstName };

  try {
    const user = await User.findOneAndUpdate(filter, update, { new: true });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with that email' });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * for deleting user by Id
 * @param {uId} req
 * @param {*} res
 * @returns
 */
export const deleteUserBasedOnId = async (req, res) => {
  const paramId = req.params.uId;

  try {
    const user = await User.findByIdAndDelete(paramId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with that id' });
    }
    return res.status(StatusCodes.OK).json({ message: 'User deleted!' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * for authenticating user..!
 * @param {*} req
 * @param {*} res
 */
export const loginUser = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, userType: 'SPONSOR' });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Email or password does not match' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const token = generateJwt(user._id);
      return res
        .cookie('jwt', token, {
          secure: isProduction,
          httpOnly: true,
        })
        .status(StatusCodes.OK)
        .json({ user, message: 'Logged in successfully!' });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Email or password does not match' });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * for Changing the user password confirmNewPassword
 * @param {*} req
 * @param {*} res
 */
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const id = req.params.uId;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with that id' });
    }
    // check if the current password matches the password in the database
    const comparePasswords = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!comparePasswords) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'The current password is incorrect' });
    }

    //hash the new password before storing in DB
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    //update the user's new password
    await User.findByIdAndUpdate(
      id,
      {
        password: hashedNewPassword,
      },
      { new: true }
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Password updated successfully' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Somthing went wrong!' });
  }
};

/**
 * for logging out the user
 * @param {*} req
 * @param {*} res
 */
export const logoutUser = (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: isProduction,
  });

  res.status(StatusCodes.OK).json({ message: 'User logged out!' });
};
