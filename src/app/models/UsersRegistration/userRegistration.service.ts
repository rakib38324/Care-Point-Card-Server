/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import { TUser } from './userRegistration.interface';
import AppError from '../../errors/appError';
import { User } from './userRegistration.model';
import { createToken } from '../Auth/auth.utils';
import config from '../../config/config';
import { sendEmail } from '../../utils/sendEmail';

const createUserIntoDB = async (payload: TUser) => {
  const { email, role } = payload;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The email address is already registered. Please use a different email.',
    );
  }

  if (payload?.role === 'superAdmin' || payload?.role === 'admin') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Only Super admin can create Admin or Super Admin account.',
    );
  }

  const userInfo = {
    ...payload,
    verified: true,
    passwordChangedAt: new Date(),
  };

  const user = await User.create(userInfo);

  const jwtPayload = {
    email,
    role: role,
    _id: user?._id,
  };
  //===========> create token and sent to the client
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '20m',
  );

  const resetUILink = `${config.email_vErification_ui_link}?email=${email}&token=${resetToken}`;

  const subject = 'Verification email from Care Points Card Global.';

  const html = `
  <body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f4f4f4;">
  <div style="max-width:600px; margin:40px auto; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background-color:#0072C6; color:#ffffff; text-align:center; padding:25px;">
      <h2 style="margin:0; font-size:24px;">Welcome to Care Points Global</h2>
      <p style="margin:5px 0 0; font-size:14px; opacity:0.85;">Secure your account by verifying your email</p>
    </div>

    <!-- Body -->
    <div style="padding:25px; color:#333333;">
      <h3 style="font-size:18px; margin-bottom:15px;">Hello Dear,</h3>
      <p style="line-height:1.6; margin-bottom:20px;">
        Thank you for registering with us! To complete your registration and activate your account, please verify your email address by clicking the button below:
      </p>

      <p style="text-align:center; margin-bottom:20px;">
        <a href="${resetUILink}" style="display:inline-block; padding:12px 25px; font-size:16px; color:#ffffff; background-color:#0072C6; border-radius:5px; text-decoration:none;">Verify Email</a>
      </p>

      <p style="line-height:1.6; margin-bottom:0;">
        If you did not create this account, you can safely ignore this email.
      </p>

      <p style="margin-top:20px;">Best regards,<br>The Care Points Global Team</p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; background-color:#f4f4f4; padding:20px; font-size:12px; color:#888888;">
      <p style="margin:0;">&copy; 2026 Care Points Global</p>
      <p style="margin:10px 0;">
        <a href="#" style="color:#0072C6; text-decoration:none; margin:0 5px;">Privacy Policy</a> | 
        <a href="#" style="color:#0072C6; text-decoration:none; margin:0 5px;">Terms of Service</a> | 
        <a href="#" style="color:#0072C6; text-decoration:none; margin:0 5px;">Help Center</a>
      </p>
    </div>

  </div>
</body>
`;

  sendEmail(subject, email, html);

  if (user) {
    const result = await User.aggregate([
      {
        $match: { email: user?.email },
      },
      {
        $project: {
          password: 0,
          passwordChangedAt: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    return result[0];
  }
};

const getAllUserFromDB = async () => {
  const userExists = await User.find().select('-password');
  return userExists;
};

const getSingleUserFromDB = async (_id: string) => {
  const result = await User.findById({ _id }).select('-password');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Information is not found.');
  }
  return result;
};

const getMeFromDB = async (email: string) => {
  const userExists = await User.findOne({ email: email })
    .select('-password')
    .populate('subscribetionId');

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Information is not found.');
  }
  return userExists;
};

const updateUserFromDB = async (
  _id: string,
  file: any,
  payload: Partial<TUser>,
) => {
  const userExists = await User.findById({ _id });
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Information is not found.');
  }

  const existEmail = await User.findOne({ email: payload?.email });
  if (existEmail) {
    throw new AppError(httpStatus.FORBIDDEN, 'Duplicate Email address.');
  }

  const result = await User.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  }).select('-password');

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  getMeFromDB,
};
