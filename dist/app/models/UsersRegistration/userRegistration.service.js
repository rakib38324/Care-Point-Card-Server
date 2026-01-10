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
const auth_utils_1 = require("../Auth/auth.utils");
const config_1 = __importDefault(require("../../config/config"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = payload;
    const userExists = yield userRegistration_model_1.User.findOne({ email });
    if (userExists) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'The email address is already registered. Please use a different email.');
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.role) === 'superAdmin' || (payload === null || payload === void 0 ? void 0 : payload.role) === 'admin') {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Only Super admin can create Admin or Super Admin account.');
    }
    const userInfo = Object.assign(Object.assign({}, payload), { verified: true });
    const user = yield userRegistration_model_1.User.create(userInfo);
    //-====> access granted: send accessToken, RefreshToken
    const jwtPayload = {
        _id: user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    //===========> create token and sent to the client
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    //===========> create refresh token and sent to the client
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_access_expires_in);
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
    if (user) {
        const result = yield userRegistration_model_1.User.aggregate([
            {
                $match: { email: user === null || user === void 0 ? void 0 : user.email },
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
        const data = {
            user: result[0],
            refreshToken,
            accessToken,
        };
        return data;
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
    const userExists = yield userRegistration_model_1.User.findOne({ email: email }).select('-password');
    if (!userExists) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'User Information is not found.');
    }
    return userExists;
});
const updateUserFromDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
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
