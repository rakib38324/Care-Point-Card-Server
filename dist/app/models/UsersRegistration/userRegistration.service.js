"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const appError_1 = __importDefault(require("../../errors/appError"));
const userRegistration_model_1 = require("./userRegistration.model");
const user_constent_1 = require("./user.constent");
const auth_utils_1 = require("../Auth/auth.utils");
const config_1 = __importDefault(require("../../config/config"));
const sendEmail_1 = require("../../utils/sendEmail");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password } = payload;
    const name = firstName + ' ' + lastName;
    const userExists = yield userRegistration_model_1.User.findOne({ email });
    if (userExists) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User already exists! Duplicate email.');
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.role) === 'superAdmin' || (payload === null || payload === void 0 ? void 0 : payload.role) === 'admin') {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Only Super admin can create Admin or Super Admin account.');
    }
    const userInfo = Object.assign(Object.assign({}, payload), { role: user_constent_1.USER_ROLE.user, passwordChangedAt: new Date() });
    const user = yield userRegistration_model_1.User.create(userInfo);
    const jwtPayload = {
        email,
        name,
        role: 'user',
        _id: user === null || user === void 0 ? void 0 : user._id,
    };
    //===========> create token and sent to the client
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '20000m');
    const resetUILink = `${config_1.default.email_vErification_ui_link}?email=${email}&token=${resetToken}`;
    const subject = 'Verification email from Care Point Server.';
    const welcomeSubject = 'Welcome to Care Point Server.';
    const adminSubject = 'User Registration Notification';
    const html = `
   <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color:rgb(246, 246, 246); text-align: center; padding: 20px;">
            <img src="https://res.cloudinary.com/softex-solution-podcast/image/upload/v1737364963/cmd_logo_m1lybt.png" alt="CMD Healthcare Services" style="max-width: 150px;">
        </div>
        <!-- Body -->
        <div style="padding: 20px; color: #333333;">
            <h1 style="font-size: 20px; margin-bottom: 15px;">Dear ${name},</h1>
            <p style="line-height: 1.6; margin-bottom: 20px;">Thank you for signing up with us! To complete your registration, please verify your email address by clicking the button below:</p>
            <p style="text-align: center; margin-bottom: 20px;">
                <a href="${resetUILink}"  style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #3a2e5c; border-radius: 5px; text-decoration: none;">Verify Email</a>
            </p>
            <p style="line-height: 1.6;">If you did not sign up for this account, please ignore this email.</p>
            <p style="margin-top: 20px;">Best regards,<br>The CMD Health Team.</p>
        </div>
        <!-- Footer -->
        <div style="text-align: center; background-color: #f4f4f4; padding: 20px; font-size: 12px; color: #888888;">
            <p style="margin: 0;">CMD Healthcare Services</p>
            <p style="margin: 10px 0;">
                <a href="#" style="color: #6c5ce7; text-decoration: none; margin: 0 5px;">Privacy Policy</a> | 
                <a href="#" style="color: #6c5ce7; text-decoration: none; margin: 0 5px;">Terms of Service</a> | 
                <a href="#" style="color: #6c5ce7; text-decoration: none; margin: 0 5px;">Help Center</a>
            </p>
        </div>
    </div>
</body>
  `;
    const welcomeHtmlForMember = `
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" style="border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600px" style="background: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: #0056b3; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">CMD Healthcare Services</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0; font-size: 16px; color: #333;">Dear ${name},</p>
              <p style="font-size: 16px; color: #333;">Congratulations on taking the first step toward concierge medical services!</p>
              <p style="font-size: 16px; color: #333;">Care Point Servers LLC and its Strategic partners are here to provide you with seamless access to top-notch healthcare services, where your health and well-being are our top priority.</p>
              <h2 style="font-size: 18px; color: #0056b3; margin-bottom: 10px;">What To Expect:</h2>
              <ul style="font-size: 16px; color: #333; padding-left: 20px;">
                <li>As a concierge medical services provider, we take a consultative approach in ensuring we meet your needs across the healthcare space:</li>
                <li>Login and activate your card membership and we will schedule your consultation with one of our Account Executives within 48 business hours to customize the benefits that meet your healthcare needs and budget.</li>
                
              
              <p style="font-size: 16px; color: #333;">We are excited to support you every step of the way!</p>
             
              <div style="text-align: center; margin: 20px 0;">
                <a href={${process.env.CLIENT_UI_LINK}} style="background: #0056b3; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 16px;">Start Now</a>
              </div>
             
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background: #f4f4f4; color: #333; padding: 20px; text-align: center; font-size: 14px;">
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 0;">The CMD Health Team</p>
              <p style="margin: 0; font-size: 12px; color: #777;">CMD Healthcare Services | Privacy Policy | Terms of Service | Help Center</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`;
    const welcomeHtmlForSponsor = `
   <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" style="border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600px" style="background: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: #0056b3; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">CMD Healthcare Services</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0; font-size: 16px; color: #333;">Dear ${name},</p>
              <p style="font-size: 16px; color: #333;">Congratulations on taking the first step toward concierge medical services!</p>
              <p style="font-size: 16px; color: #333;">Care Point Servers LLC is committed to providing seamless access to exceptional healthcare solutions, with a focus on enhancing the services or benefits you offer to your employees, members, and customers.</p>
              <h2 style="font-size: 18px; color: #0056b3; margin-bottom: 10px;">What to Expect:</h2>
           
                
                
                
              
              <p style="font-size: 16px; color: #333;">As your concierge medical services provider, we take a personalized, consultative approach to ensure we meet your unique needs in the healthcare space. One of our Account Executives will reach out to you within 48 hours to customize a mutually beneficial partnership.</p>
             
              <p style="font-size: 16px; color: #333;">We are excited to support you every step of the way!</p>
             
             
              <div style="text-align: center; margin: 20px 0;">
                <a href={${process.env.CLIENT_UI_LINK}} style="background: #0056b3; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 16px;">Start Now</a>
              </div>
             
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background: #f4f4f4; color: #333; padding: 20px; text-align: center; font-size: 14px;">
              <p style="margin: 0;">Best regards,</p>
              <p style="margin: 0;">The CMD Health Team</p>
              <p style="margin: 0; font-size: 12px; color: #777;">CMD Healthcare Services | Privacy Policy | Terms of Service | Help Center</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`;
    const adminemail = config_1.default.admin_email;
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    const adminHtml = `
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; color: #333; line-height: 1.6;">
  <table style="max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #dddddd; border-radius: 8px; width: 100%;">
    <tr>
      <td style="background: #4CAF50; color: #ffffff; padding: 15px; text-align: center; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0;">
        New User Registration
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="margin: 0 0 10px;">Hello Admin,</p>
        <p style="margin: 0 0 10px;">A new user has registered on your platform:</p>
        <p style="margin: 0 0 10px;"><strong>Name:</strong>  ${payload.firstName}  ${payload.lastName}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${payload.email}</p>
        <p style="margin: 0 0 20px;"><strong>Timestamp:</strong> ${formattedDate}</p>
        
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px; background: #f1f1f1; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
        This is an automated message. Please do not reply.
      </td>
    </tr>
  </table>
</body>`;
    (0, sendEmail_1.sendEmail)(subject, email, html);
    if ((payload === null || payload === void 0 ? void 0 : payload.userType) === 'Sponsor') {
        (0, sendEmail_1.sendEmail)(welcomeSubject, email, welcomeHtmlForSponsor);
    }
    else {
        (0, sendEmail_1.sendEmail)(welcomeSubject, email, welcomeHtmlForMember);
    }
    if (adminemail) {
        (0, sendEmail_1.sendEmail)(adminSubject, adminemail, adminHtml);
    }
    if (user) {
        const result = yield userRegistration_model_1.User.aggregate([
            {
                $match: { email: user === null || user === void 0 ? void 0 : user.email },
            },
            {
                $project: {
                    password: 0,
                    verified: 0,
                    passwordChangedAt: 0,
                    __v: 0,
                },
            },
        ]);
        return result[0];
    }
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield userRegistration_model_1.User.find().select('-password');
    return userExists;
});
const getSingleUserFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRegistration_model_1.User.findById({ _id }).select('-password');
    if (!result) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'User Information is not found.');
    }
    return result;
});
const getMeFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield userRegistration_model_1.User.findOne({ email: email })
        .select('-password')
        .populate('subscribetionId');
    if (!userExists) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'User Information is not found.');
    }
    return userExists;
});
const updateUserFromDB = (_id, file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield userRegistration_model_1.User.findById({ _id });
    if (!userExists) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'User Information is not found.');
    }
    const existEmail = yield userRegistration_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (existEmail) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, 'Duplicate Email address.');
    }
    const result = yield userRegistration_model_1.User.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    }).select('-password');
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    getMeFromDB,
};
