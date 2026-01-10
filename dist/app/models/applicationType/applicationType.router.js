"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationTypeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const applicationType_validation_1 = require("./applicationType.validation");
const applicationType_controller_1 = require("./applicationType.controller");
const user_constent_1 = require("../UsersRegistration/user.constent");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const router = express_1.default.Router();
/**
 * ================= Public / Authenticated Routes =================
 * Any logged-in user can view the application types/prices
 */
router.get('/', applicationType_controller_1.ApplicationTypeControllers.getAllApplicationTypes);
/**
 * ================= Admin Only Routes =================
 * Only SuperAdmin and Admin can Create, Update, or Delete types
 */
router.post('/create-application-type', (0, Auth_1.default)(user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.admin), (0, validateRequest_1.default)(applicationType_validation_1.ApplicationTypeValidations.createApplicationTypeValidationSchema), applicationType_controller_1.ApplicationTypeControllers.createApplicationType);
router.get('/:id', (0, Auth_1.default)(user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.admin), applicationType_controller_1.ApplicationTypeControllers.getSingleApplicationType);
router.patch('/:id', (0, Auth_1.default)(user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.admin), (0, validateRequest_1.default)(applicationType_validation_1.ApplicationTypeValidations.updateApplicationTypeValidationSchema), applicationType_controller_1.ApplicationTypeControllers.updateApplicationType);
router.delete('/:id', (0, Auth_1.default)(user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.admin), applicationType_controller_1.ApplicationTypeControllers.deleteApplicationType);
exports.ApplicationTypeRoutes = router;
