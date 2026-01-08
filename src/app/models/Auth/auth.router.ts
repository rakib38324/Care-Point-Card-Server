import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import { authControllers } from './auth.controller';
import Auth from '../../middlewares/Auth';
import { USER_ROLE } from '../UsersRegistration/user.constent';

const router = express.Router();

router.post(
  '/email-verification',
  ValidateRequest(authValidations.emailValidationSchema),
  authControllers.emailVerification,
);

router.post(
  '/resend-email-verification',
  ValidateRequest(authValidations.resendEmailValidationSchema),
  authControllers.resendEmailVerification,
);

router.post(
  '/login',
  ValidateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  Auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.doctor,
    USER_ROLE.employer,
    USER_ROLE.member,
    USER_ROLE.ngo,
    USER_ROLE.provider,
    USER_ROLE.sponsor,
    USER_ROLE.superAdmin,
  ),
  ValidateRequest(authValidations.changePasswordValidationSchema),
  authControllers.changePassword,
);

router.post(
  '/forget-password',
  ValidateRequest(authValidations.forgetPasswordValidationSchema),
  authControllers.forgetPassword,
);

router.post(
  '/reset-password',
  ValidateRequest(authValidations.resetPasswordValidationSchema),
  authControllers.resetPassword,
);

router.get('/me', Auth('superAdmin', 'admin'), authControllers.getMe);

export const loginRouters = router;
