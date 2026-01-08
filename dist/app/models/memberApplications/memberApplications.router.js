"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const memberApplications_validation_1 = require("./memberApplications.validation");
const user_constent_1 = require("../UsersRegistration/user.constent");
const memberApplication_controller_1 = require("./memberApplication.controller");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const router = express_1.default.Router();
router.post(`/application`, (0, Auth_1.default)(user_constent_1.USER_ROLE.admin, user_constent_1.USER_ROLE.superAdmin, user_constent_1.USER_ROLE.doctor, user_constent_1.USER_ROLE.employer, user_constent_1.USER_ROLE.member, user_constent_1.USER_ROLE.ngo, user_constent_1.USER_ROLE.provider, user_constent_1.USER_ROLE.sponsor), (0, validateRequest_1.default)(memberApplications_validation_1.MemberApplicationValidations.createMemberApplicationValidationSchema), memberApplication_controller_1.memberControllers.createMembers);
exports.memberRouters = router;
