import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import commonRes from '../../utils/commonResponse';
import { ContactServices } from './contact.service';

const createContact = catchAsync(async (req, res) => {
  const result = await ContactServices.createContactIntoDB(req.body);
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      'Thank You for Contacting Care Point Server! Will get back to you as soon as possible.',
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContactFromDB();
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Contact retrieved successfully',
    data: result,
  });
});

export const ContactControllers = {
  createContact,
  getAllContacts,
};
