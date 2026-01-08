import AppError from '../../errors/appError';
import { User } from '../UsersRegistration/userRegistration.model';
import { encryptMemberApplicationPayload } from './memberApplications.encriptor';
import { TMemberApplications } from './memberApplications.interface';
import httpStatus from 'http-status-codes';
import { MemberApplications } from './memberApplications.model';
import { JwtPayload } from 'jsonwebtoken';

const createMemberIntoDB = async (
  userData: JwtPayload,
  payload: TMemberApplications,
) => {
  const userExists = await User.findById({ _id: userData?._id });

  if (!userExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User account is not created. Please go back previous step.',
    );
  }

  // cheack the application duplicate or not
  const duplicateMemberApplication = await MemberApplications.findOne({
    userId: payload?.userId,
  });

  if (duplicateMemberApplication) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You already applied for Individual subscriber enrollment form.',
    );
  }

  // Encrypt sensitive fields before saving
  const encryptedPayload = encryptMemberApplicationPayload(payload);

  const createApplication = await MemberApplications.create(encryptedPayload);

  const applicationResponceData = {
    _id: createApplication?._id,
    paymentMethod: createApplication?.paymentMethod,
    onboardingFee: createApplication?.onboardingFee,
  };

  return applicationResponceData;

  //   const jwtPayload = {
  //     email,
  //     role: role,
  //     _id: user?._id,
  //   };
  //   //===========> create token and sent to the client
  //   const resetToken = createToken(
  //     jwtPayload,
  //     config.jwt_access_secret as string,
  //     '20m',
  //   );

  //   const resetUILink = `${config.email_vErification_ui_link}?email=${email}&token=${resetToken}`;

  //   const subject = 'Verification email from Care Points Card Global.';

  //   const html = `
  //   <body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f4f4f4;">
  //   <div style="max-width:600px; margin:40px auto; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

  //     <!-- Header -->
  //     <div style="background-color:#0072C6; color:#ffffff; text-align:center; padding:25px;">
  //       <h2 style="margin:0; font-size:24px;">Welcome to Care Points Global</h2>
  //       <p style="margin:5px 0 0; font-size:14px; opacity:0.85;">Secure your account by verifying your email</p>
  //     </div>

  //     <!-- Body -->
  //     <div style="padding:25px; color:#333333;">
  //       <h3 style="font-size:18px; margin-bottom:15px;">Hello Dear,</h3>
  //       <p style="line-height:1.6; margin-bottom:20px;">
  //         Thank you for registering with us! To complete your registration and activate your account, please verify your email address by clicking the button below:
  //       </p>

  //       <p style="text-align:center; margin-bottom:20px;">
  //         <a href="${resetUILink}" style="display:inline-block; padding:12px 25px; font-size:16px; color:#ffffff; background-color:#0072C6; border-radius:5px; text-decoration:none;">Verify Email</a>
  //       </p>

  //       <p style="line-height:1.6; margin-bottom:0;">
  //         If you did not create this account, you can safely ignore this email.
  //       </p>

  //       <p style="margin-top:20px;">Best regards,<br>The Care Points Global Team</p>
  //     </div>

  //     <!-- Footer -->
  //     <div style="text-align:center; background-color:#f4f4f4; padding:20px; font-size:12px; color:#888888;">
  //       <p style="margin:0;">&copy; 2026 Care Points Global</p>
  //       <p style="margin:10px 0;">
  //         <a href="#" style="color:#0072C6; text-decoration:none; margin:0 5px;">Privacy Policy</a> |
  //         <a href="#" style="color:#0072C6; text-decoration:none; margin:0 5px;">Terms of Service</a> |
  //         <a href="#" style="color:#0072C6; text-decoration:none; margin:0 5px;">Help Center</a>
  //       </p>
  //     </div>

  //   </div>
  // </body>
  // `;

  //   sendEmail(subject, email, html);
};

const getSingleMemberApplicationFromDB = async () => {};

export const memberServices = {
  createMemberIntoDB,
  getSingleMemberApplicationFromDB,
};
