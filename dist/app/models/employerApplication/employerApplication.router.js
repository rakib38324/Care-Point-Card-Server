"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employerRouters = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constent_1 = require("../UsersRegistration/user.constent");
const employerApplication_controller_1 = require("./employerApplication.controller");
const employerApplication_validation_1 = require("./employerApplication.validation");
const router = express_1.default.Router();
/**
 * ================= Create Employer Application =================
 * Accessible by relevant corporate/admin roles
 */
router.post('/application', (0, Auth_1.default)(user_constent_1.USER_ROLE.admin, user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.employer, user_constent_1.USER_ROLE.sponsor, user_constent_1.USER_ROLE.ngo), (0, validateRequest_1.default)(employerApplication_validation_1.EmployerApplicationValidations.createEmployerApplicationValidationSchema), employerApplication_controller_1.employerApplicationControllers.createEmployerApplication);
/**
 * ================= Get Single Employer Application =================
 * Retrieves the application belonging to the logged-in user
 */
router.get('/application', (0, Auth_1.default)(user_constent_1.USER_ROLE.admin, user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.employer, user_constent_1.USER_ROLE.sponsor), employerApplication_controller_1.employerApplicationControllers.getSingleEmployerApplication);
/**
 * ================= Update Employer Application =================
 * Allows the owner or admin to update details by ID
 */
router.patch('/:id', (0, Auth_1.default)(user_constent_1.USER_ROLE.admin, user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.employer), (0, validateRequest_1.default)(employerApplication_validation_1.EmployerApplicationValidations.updateEmployerApplicationValidationSchema), employerApplication_controller_1.employerApplicationControllers.updateEmployerApplication);
/**
 * ================= Get All Employer Applications =================
 * Admin/SuperAdmin only: View all corporate sponsorship requests
 */
router.get('/all-application', (0, Auth_1.default)(user_constent_1.USER_ROLE.admin, user_constent_1.USER_ROLE.superAdmin), employerApplication_controller_1.employerApplicationControllers.getAllEmployerApplications);
/**
 * ================= Get Applications By Email =================
 * Admin/SuperAdmin only: Search for employer records by corporate email
 */
router.get('/:email', (0, Auth_1.default)(user_constent_1.USER_ROLE.admin, user_constent_1.USER_ROLE.superAdmin), employerApplication_controller_1.employerApplicationControllers.getEmployerApplicationsWithEmail);
/**
 * ================= Delete Employer Application =================
 * Admin/SuperAdmin only: Soft delete functionality
 */
router.delete('/:id', (0, Auth_1.default)(user_constent_1.USER_ROLE.admin, user_constent_1.USER_ROLE.superAdmin), employerApplication_controller_1.employerApplicationControllers.deleteEmployerApplication);
exports.employerRouters = router;
