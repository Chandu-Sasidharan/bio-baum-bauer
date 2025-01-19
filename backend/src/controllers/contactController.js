import Contact from '../models/Contact.js';
import { StatusCodes } from 'http-status-codes';

/**
 * for creating contact
 * @param {*} req
 * @param {*} res
 */
export const createContact = async (req, res) => {
  const { firstName, lastName, emailAddress, message } = req.body;
  try {
    const contact = await Contact.create({
      firstName,
      lastName,
      emailAddress,
      message,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'contact created successfully', contact });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

/**
 * get all contacts
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (contacts.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `no contact found!` });
    }
    return res.status(StatusCodes.OK).json({ contacts });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

/**
 * finding an specific contact by Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const findContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.cId);
    if (!contact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `no contact found!` });
    }
    return res.status(StatusCodes.OK).json({ contact });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

/**
 * update a contact using Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateContactById = async (req, res) => {
  const { firstName, lastName, emailAddress, message } = req.body;
  const isReturnNew = { new: true };
  const update = {
    firstName,
    lastName,
    emailAddress,
    message,
  };
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.cId,
      update,
      isReturnNew
    );
    if (!contact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Contact with id=(${req.params.cId}) not found...!` });
    }
    return res.status(StatusCodes.OK).json({ contact });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

/**
 * delete a Contact by Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteContactById = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.cId);
    if (!contact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `contact with id=(${req.params.cId}) not found..!` });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: 'contact was deleted..!' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};
