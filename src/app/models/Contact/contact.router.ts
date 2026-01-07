import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { ContactValidations } from './contact.validation';
import { ContactControllers } from './contact.controller';
import Auth from '../../middlewares/Auth';

const router = express.Router();

router.post(
  '/create-contact',
  ValidateRequest(ContactValidations.createContactValidationSchema),
  ContactControllers.createContact,
);

router.get('/', Auth('admin', 'superAdmin'), ContactControllers.getAllContacts);

export const contactRouter = router;
