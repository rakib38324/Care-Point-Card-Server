import AppError from '../../errors/appError';
import { User } from '../UsersRegistration/userRegistration.model';
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../UsersRegistration/user.constent';
import { encryptObjectFields } from '../../utils/encryptObjectFields';
import { encrypt } from '../../utils/encryption.utils';
import { TEmployerApplication } from './employerApplication.interface';
import { EmployerApplication } from './employerApplication.model';
import { encryptEmployerApplicationPayload } from './employerApplication.encriptor';
import { decryptEmployerApplicationPayload } from './employerApplication.decrytor';

/**
 * ================= Create Employer Application =================
 */
const createEmployerIntoDB = async (
  userData: JwtPayload,
  payload: TEmployerApplication,
) => {
  const userExists = await User.findById({ _id: userData?._id });

  if (!userExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User account is not created. Please complete registration first.',
    );
  }

  const isAdminOrSuperAdmin =
    userExists?.role === USER_ROLE.admin ||
    userExists?.role === USER_ROLE.superAdmin;

  // Prevent multiple corporate applications from the same user
  const duplicateApplication = await EmployerApplication.findOne({
    userId: userData?._id,
  });

  if (duplicateApplication && !isAdminOrSuperAdmin) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your organization has already submitted a application.',
    );
  }

  // Ensure role matches or user is admin
  if (userExists?.role !== USER_ROLE.employer && !isAdminOrSuperAdmin) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Your account is registered as ${userExists?.role}. Only Employers can apply for Group Sponsorship.`,
    );
  }

  // 🔐 Encrypt corporate sensitive fields before saving
  const encryptedData = encryptEmployerApplicationPayload(payload);

  const data = {
    ...encryptedData,
    userId: userData?._id,
  };

  const createApplication = await EmployerApplication.create(data);

  return {
    _id: createApplication?._id,
    companyName: payload.companyName,
    paymentMethod: createApplication?.paymentMethod,
    estimatedAnnualCost: createApplication?.estimatedAnnualCost,
  };
};

/**
 * ================= Get Single Employer Application =================
 */
const getSingleEmployerApplicationFromDB = async (userData: JwtPayload) => {
  const applicationData = await EmployerApplication.findOne({
    userId: userData?._id,
  });

  if (!applicationData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Employer application information not found.',
    );
  }

  if (applicationData?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This application has been deactivated. Please contact support.',
    );
  }

  // 🔓 Decrypt for the user
  return decryptEmployerApplicationPayload(applicationData);
};

/**
 * ================= Get All Employer Applications (Admin) =================
 */
const getAllEmployerApplicationFromDB = async (userData: JwtPayload) => {
  const userExists = await User.findById(userData._id);

  if (
    !userExists ||
    (userExists.role !== USER_ROLE.superAdmin &&
      userExists.role !== USER_ROLE.admin)
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Access denied. Admin only.');
  }

  const applications = await EmployerApplication.find().lean();

  if (!applications.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No employer applications found.');
  }

  return applications.map((app) => decryptEmployerApplicationPayload(app));
};

/**
 * ================= Update Employer Application =================
 */
export const updateEmployerApplicationFromDB = async (
  userData: JwtPayload,
  applicationId: string,
  payload: Partial<TEmployerApplication>,
) => {
  const application = await EmployerApplication.findById(applicationId);

  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application not found.');
  }

  const isOwner = application.userId.toString() === userData._id;
  const isAdmin =
    userData.role === USER_ROLE.admin || userData.role === USER_ROLE.superAdmin;

  if (!isOwner && !isAdmin) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized access.');
  }

  // 🔐 Encrypt updated corporate fields
  const encryptedPayload = {
    ...encryptObjectFields<TEmployerApplication>(payload, [
      'companyName',
      'industry',
      'companySize',
      'registrationNumber',
      'countryOfRegistration',
      'headquartersAddress',
      'website',
      'employeeLocations',
      'coverageType',
      'eligibilityCriteria',
      'eligibilityCriteriaOther',
      'membershipTier',
      'membershipTierDetails',
      'onboardingApproach',
      'wellnessPriorities',
      'additionalServicesRequested',
      'dashboardAccess',
      'reportingFrequency',
      'keyMetrics',
      'costSharingModel',
      'paymentSchedule',
      'paymentMethod',
      'desiredStartDate',
      'communicationSupportNeeded',
    ]),

    // Handle nested primary contact update
    ...(payload.primaryContact && {
      primaryContact: {
        fullName: payload.primaryContact.fullName
          ? encrypt(payload.primaryContact.fullName)
          : undefined,
        titleOrPosition: payload.primaryContact.titleOrPosition
          ? encrypt(payload.primaryContact.titleOrPosition)
          : undefined,
        email: payload.primaryContact.email
          ? encrypt(payload.primaryContact.email)
          : undefined,
        phoneNumber: payload.primaryContact.phoneNumber
          ? encrypt(payload.primaryContact.phoneNumber)
          : undefined,
        whatsappNumber: payload.primaryContact.whatsappNumber
          ? encrypt(payload.primaryContact.whatsappNumber)
          : undefined,
      },
    }),

    // Handle nested enrollment period update
    ...(payload.openEnrollmentPeriod && {
      openEnrollmentPeriod: {
        start: payload.openEnrollmentPeriod.start
          ? encrypt(payload.openEnrollmentPeriod.start)
          : undefined,
        end: payload.openEnrollmentPeriod.end
          ? encrypt(payload.openEnrollmentPeriod.end)
          : undefined,
      },
    }),

    isDeleted: payload?.isDeleted,
    isPaid: isAdmin ? payload?.isPaid : application.isPaid, // Only admin can change payment status
  };

  const updatedDoc = await EmployerApplication.findByIdAndUpdate(
    applicationId,
    { $set: encryptedPayload },
    { new: true, runValidators: true },
  ).lean();

  return decryptEmployerApplicationPayload(updatedDoc!);
};

/**
 * ================= Delete Employer Application (Soft Delete) =================
 */
export const deleteEmployerApplicationFromDB = async (
  userData: JwtPayload,
  applicationId: string,
) => {
  const application = await EmployerApplication.findById(applicationId);

  if (!application || application.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application not found.');
  }

  const isOwner = application.userId.toString() === userData._id;
  const isAdmin =
    userData.role === USER_ROLE.admin || userData.role === USER_ROLE.superAdmin;

  if (!isOwner && !isAdmin) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not allowed to delete this.',
    );
  }

  application.isDeleted = true;
  await application.save();

  return { message: 'Employer application deleted successfully.' };
};

/**
 * ================= Get Employer Application By Email =================
 */
const getEmployerApplicationWithEmailFromDB = async (email: string) => {
  const userExists = await User.findOne({ email });

  if (!userExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Email Address.');
  }

  const applications = await EmployerApplication.find({
    userId: userExists?._id,
  });

  if (!applications.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No corporate applications found for this email.',
    );
  }

  return applications.map((app) => decryptEmployerApplicationPayload(app));
};

export const employerApplicationServices = {
  createEmployerIntoDB,
  getSingleEmployerApplicationFromDB,
  getAllEmployerApplicationFromDB,
  updateEmployerApplicationFromDB,
  deleteEmployerApplicationFromDB,
  getEmployerApplicationWithEmailFromDB,
};
