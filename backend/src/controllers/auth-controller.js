import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash-es';
import { StatusCodes } from 'http-status-codes';
import createJwt from '#src/utils/create-jwt.js';
import formatZodError from '#src/utils/format-zod-error.js';
import createVerificationToken from '#src/utils/create-verification-token.js';
import sendVerificationEmail from '#src/utils/send-verification-email.js';
import pickUserPayload from '#src/utils/pick-user-payload.js';
import User from '#src/models/user.js';

// Sign up user
export const signUp = async (req, res) => {
  try {
    const formData = req.body;
    // Validate the form data
    const result = User.validateSignupFormData(formData);

    if (!result.success) {
      const errors = formatZodError(result.error);

      return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }

    const { email, password } = formData;
    const existingUser = await User.findOne({ email });

    // Check if the user exists and is not soft deleted
    if (
      existingUser &&
      existingUser.deletedAt === null &&
      existingUser.isVerified
    ) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'Email already exists' });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a verification token
    const verificationToken = createVerificationToken();

    // If the user exists but is soft deleted
    // update the user, and wait for the verification
    if (existingUser && existingUser.deletedAt !== null) {
      await User.updateOne(
        { email },
        {
          password: hashedPassword,
          verificationToken,
          verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour
          isVerified: false,
        }
      );
    }

    // Create a new user
    if (!existingUser) {
      await User.create({
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour
      });
    }

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return res.status(StatusCodes.CREATED).json({
      message: 'Please check your inbox to confirm your account.',
    });
  } catch (error) {
    throw error;
  }
};

// Confirm account
export const confirmAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Invalid or expired verification token',
      });
    }

    // If the user is already verified
    if (user.isVerified) {
      return res.status(StatusCodes.CONFLICT).json({
        message: 'Account already confirmed',
      });
    }

    // If the user is soft deleted,
    // allow them to sign up again with the same email
    // Retain only the email and password
    // Set other properties to null
    if (user.deletedAt !== null) {
      await User.updateOne(
        { verificationToken: token },
        {
          deletedAt: null,
          isVerified: true,
          verificationToken: null,
          verificationTokenExpiresAt: null,
          firstName: null,
          lastName: null,
          address: null,
          phoneNumber: null,
          avatarUrl: 'dummy',
          passwordResetToken: null,
          passwordResetTokenExpiresAt: null,
        }
      );
    }

    // Update the user
    await User.updateOne(
      { verificationToken: token },
      {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
      }
    );

    // creatJwt pciks the fields that are needed for the token
    const jwtToken = createJwt(user);
    const userPayload = pick(user, ['_id', 'email', 'isVerified']);
    const isProduction = process.env.NODE_ENV === 'production';

    return res
      .cookie('jwt', jwtToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 1200000, // 20 minutes
      })
      .status(StatusCodes.OK)
      .json({ message: 'Account Confirmed!', user: userPayload });
  } catch (error) {
    throw error;
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isVerified: true });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Email or password does not match' });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Email or password does not match' });
    }

    // creatJwt pciks the fields that are needed for the token
    const jwtToken = createJwt(user);
    // pickUserPayload picks the fields that are needed for the response
    const userPayload = pickUserPayload(user);
    const isProduction = process.env.NODE_ENV === 'production';

    return res
      .cookie('jwt', jwtToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 1200000, // 20 minutes
      })
      .status(StatusCodes.OK)
      .json({ message: 'Logged in successfully!', user: userPayload });
  } catch (error) {
    throw error;
  }
};

// Refresh token
export const refreshToken = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }

    // creatJwt pciks the fields that are needed for the token
    const newJwtToken = createJwt(user);
    const isProduction = process.env.NODE_ENV === 'production';

    return res
      .cookie('jwt', newJwtToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 1200000, // 20 minutes
      })
      .status(StatusCodes.OK)
      .json({ message: 'Token refreshed successfully!' });
  } catch (error) {
    // If the token is invalid, clear the cookie
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      const isProduction = process.env.NODE_ENV === 'production';

      return res
        .clearCookie('jwt', {
          httpOnly: true,
          secure: isProduction,
        })
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid or expired token' });
    }

    // else throw the error
    throw error;
  }
};

// Logout user
export const logoutUser = async (_req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  return res
    .clearCookie('jwt', {
      httpOnly: true,
      secure: isProduction,
    })
    .status(StatusCodes.OK)
    .json({ message: 'User logged out!' });
};
