import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { MemberApplicationValidations } from './memberApplications.validation';
import { USER_ROLE } from '../UsersRegistration/user.constent';
import { memberControllers } from './memberApplication.controller';
import Auth from '../../middlewares/Auth';

const router = express.Router();

router.post(
  `/application`,
  Auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.doctor,
    USER_ROLE.employer,
    USER_ROLE.member,
    USER_ROLE.ngo,
    USER_ROLE.provider,
    USER_ROLE.sponsor,
  ),
  ValidateRequest(
    MemberApplicationValidations.createMemberApplicationValidationSchema,
  ),
  memberControllers.createMembers,
);

export const memberRouters = router;
