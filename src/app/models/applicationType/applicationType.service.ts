import httpStatus from 'http-status-codes';
import AppError from '../../errors/appError';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../UsersRegistration/user.constent';
import { User } from '../UsersRegistration/userRegistration.model';
import { TApplicationType } from './applicationType.interface';
import { ApplicationType } from './applicationType.model';

const createApplicationTypeIntoDB = async (
  userData: JwtPayload,
  payload: TApplicationType,
) => {
  const userExists = await User.findById(userData?._id);
  if (
    !userExists ||
    (userExists.role !== USER_ROLE.admin &&
      userExists.role !== USER_ROLE.superAdmin)
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized access.');
  }
  return await ApplicationType.create(payload);
};

const getAllApplicationTypesFromDB = async () => {
  return await ApplicationType.find({ isDeleted: false }).select([
    '-isDeleted',
    '-createdAt',
    '-updatedAt',
    '-__v',
  ]);
};

const getSingleApplicationTypeFromDB = async (id: string) => {
  const result = await ApplicationType.findById(id);
  if (!result || result.isDeleted)
    throw new AppError(httpStatus.NOT_FOUND, 'Record not found.');
  return result;
};

const updateApplicationTypeInDB = async (
  id: string,
  payload: Partial<TApplicationType>,
) => {
  return await ApplicationType.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );
};

const deleteApplicationTypeFromDB = async (id: string) => {
  await ApplicationType.deleteOne({ _id: id });
  return { message: 'Deleted successfully.' };
};

export const ApplicationTypeServices = {
  createApplicationTypeIntoDB,
  getAllApplicationTypesFromDB,
  getSingleApplicationTypeFromDB,
  updateApplicationTypeInDB,
  deleteApplicationTypeFromDB,
};
