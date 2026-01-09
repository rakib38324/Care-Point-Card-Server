import express from 'express';
import Auth from '../../middlewares/Auth';
import ValidateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../UsersRegistration/user.constent';
import { employerApplicationControllers } from './employerApplication.controller';
import { EmployerApplicationValidations } from './employerApplication.validation';

const router = express.Router();

/**
 * ================= Create Employer Application =================
 * Accessible by relevant corporate/admin roles
 */
router.post(
  '/application',
  Auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.employer,
    USER_ROLE.sponsor,
    USER_ROLE.ngo,
  ),
  ValidateRequest(
    EmployerApplicationValidations.createEmployerApplicationValidationSchema,
  ),
  employerApplicationControllers.createEmployerApplication,
);

/**
 * ================= Get Single Employer Application =================
 * Retrieves the application belonging to the logged-in user
 */
router.get(
  '/application',
  Auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.employer,
    USER_ROLE.sponsor,
  ),
  employerApplicationControllers.getSingleEmployerApplication,
);

/**
 * ================= Update Employer Application =================
 * Allows the owner or admin to update details by ID
 */
router.patch(
  '/:id',
  Auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.employer),
  ValidateRequest(
    EmployerApplicationValidations.updateEmployerApplicationValidationSchema,
  ),
  employerApplicationControllers.updateEmployerApplication,
);

/**
 * ================= Get All Employer Applications =================
 * Admin/SuperAdmin only: View all corporate sponsorship requests
 */
router.get(
  '/all-application',
  Auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  employerApplicationControllers.getAllEmployerApplications,
);

/**
 * ================= Get Applications By Email =================
 * Admin/SuperAdmin only: Search for employer records by corporate email
 */
router.get(
  '/:email',
  Auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  employerApplicationControllers.getEmployerApplicationsWithEmail,
);

/**
 * ================= Delete Employer Application =================
 * Admin/SuperAdmin only: Soft delete functionality
 */
router.delete(
  '/:id',
  Auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  employerApplicationControllers.deleteEmployerApplication,
);

export const employerRouters = router;
