import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationTypeValidations } from './applicationType.validation';
import { ApplicationTypeControllers } from './applicationType.controller';
import { USER_ROLE } from '../UsersRegistration/user.constent';
import Auth from '../../middlewares/Auth';

const router = express.Router();

/**
 * ================= Public / Authenticated Routes =================
 * Any logged-in user can view the application types/prices
 */
router.get('/', ApplicationTypeControllers.getAllApplicationTypes);

/**
 * ================= Admin Only Routes =================
 * Only SuperAdmin and Admin can Create, Update, or Delete types
 */
router.post(
  '/create-application-type',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    ApplicationTypeValidations.createApplicationTypeValidationSchema,
  ),
  ApplicationTypeControllers.createApplicationType,
);

router.get(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ApplicationTypeControllers.getSingleApplicationType,
);

router.patch(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    ApplicationTypeValidations.updateApplicationTypeValidationSchema,
  ),
  ApplicationTypeControllers.updateApplicationType,
);

router.delete(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ApplicationTypeControllers.deleteApplicationType,
);

export const ApplicationTypeRoutes = router;
