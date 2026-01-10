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
exports.ApplicationTypeServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const appError_1 = __importDefault(require("../../errors/appError"));
const user_constent_1 = require("../UsersRegistration/user.constent");
const userRegistration_model_1 = require("../UsersRegistration/userRegistration.model");
const applicationType_model_1 = require("./applicationType.model");
const createApplicationTypeIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield userRegistration_model_1.User.findById(userData === null || userData === void 0 ? void 0 : userData._id);
    if (!userExists ||
        (userExists.role !== user_constent_1.USER_ROLE.admin &&
            userExists.role !== user_constent_1.USER_ROLE.superAdmin)) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, 'Unauthorized access.');
    }
    return yield applicationType_model_1.ApplicationType.create(payload);
});
const getAllApplicationTypesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield applicationType_model_1.ApplicationType.find({ isDeleted: false }).select([
        '-isDeleted',
        '-createdAt',
        '-updatedAt',
        '-__v',
    ]);
});
const getSingleApplicationTypeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationType_model_1.ApplicationType.findById(id);
    if (!result || result.isDeleted)
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Record not found.');
    return result;
});
const updateApplicationTypeInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield applicationType_model_1.ApplicationType.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
});
const deleteApplicationTypeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield applicationType_model_1.ApplicationType.deleteOne({ _id: id });
    return { message: 'Deleted successfully.' };
});
exports.ApplicationTypeServices = {
    createApplicationTypeIntoDB,
    getAllApplicationTypesFromDB,
    getSingleApplicationTypeFromDB,
    updateApplicationTypeInDB,
    deleteApplicationTypeFromDB,
};
