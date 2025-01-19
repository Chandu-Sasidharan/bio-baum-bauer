import express from 'express';
import {
  createContact,
  getAllContacts,
  findContactById,
  updateContactById,
  deleteContactById,
} from '../controllers/contactController.js';

import {
  validateFullContact,
  paramValidatorContact,
  validationResultContact,
} from '../helpers/contactValidationSanit.js';

const router = express.Router();

router.post(
  '/create',
  validateFullContact,
  validationResultContact,
  createContact
);

router.get('/get-all', getAllContacts);

router.get(
  '/find/:cId',
  paramValidatorContact,
  validationResultContact,
  findContactById
);

router.put(
  '/update/:cId',
  validateFullContact,
  paramValidatorContact,
  validationResultContact,
  updateContactById
);

router.delete(
  '/delete/:cId',
  paramValidatorContact,
  validationResultContact,
  deleteContactById
);

export default router;
