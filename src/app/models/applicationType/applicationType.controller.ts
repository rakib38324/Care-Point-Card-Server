import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import commonRes from '../../utils/commonResponse';
import { ApplicationTypeServices } from './applicationType.service';

const createApplicationType = catchAsync(async (req, res) => {
  const result = await ApplicationTypeServices.createApplicationTypeIntoDB(
    req.user,
    req.body,
  );
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Type Created Successfully.',
    data: result,
  });
  res.locals.createdResource = result;
});

const getAllApplicationTypes = catchAsync(async (req, res) => {
  const result = await ApplicationTypeServices.getAllApplicationTypesFromDB();
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Types Retrieved Successfully.',
    data: result,
  });
});

const getSingleApplicationType = catchAsync(async (req, res) => {
  const result = await ApplicationTypeServices.getSingleApplicationTypeFromDB(
    req.params.id,
  );
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Type Retrieved Successfully.',
    data: result,
  });
});

const updateApplicationType = catchAsync(async (req, res) => {
  const result = await ApplicationTypeServices.updateApplicationTypeInDB(
    req.params.id,
    req.body,
  );
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Type Updated Successfully.',
    data: result,
  });
});

const deleteApplicationType = catchAsync(async (req, res) => {
  const result = await ApplicationTypeServices.deleteApplicationTypeFromDB(
    req.params.id,
  );
  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Type Deleted Successfully.',
    data: result,
  });
});

export const ApplicationTypeControllers = {
  createApplicationType,
  getAllApplicationTypes,
  getSingleApplicationType,
  updateApplicationType,
  deleteApplicationType,
};
