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
exports.ApplicationTypeControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const commonResponse_1 = __importDefault(require("../../utils/commonResponse"));
const applicationType_service_1 = require("./applicationType.service");
const createApplicationType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationType_service_1.ApplicationTypeServices.createApplicationTypeIntoDB(req.user, req.body);
    (0, commonResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Application Type Created Successfully.',
        data: result,
    });
    res.locals.createdResource = result;
}));
const getAllApplicationTypes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationType_service_1.ApplicationTypeServices.getAllApplicationTypesFromDB();
    (0, commonResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Application Types Retrieved Successfully.',
        data: result,
    });
}));
const getSingleApplicationType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationType_service_1.ApplicationTypeServices.getSingleApplicationTypeFromDB(req.params.id);
    (0, commonResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Application Type Retrieved Successfully.',
        data: result,
    });
}));
const updateApplicationType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationType_service_1.ApplicationTypeServices.updateApplicationTypeInDB(req.params.id, req.body);
    (0, commonResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Application Type Updated Successfully.',
        data: result,
    });
}));
const deleteApplicationType = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationType_service_1.ApplicationTypeServices.deleteApplicationTypeFromDB(req.params.id);
    (0, commonResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Application Type Deleted Successfully.',
        data: result,
    });
}));
exports.ApplicationTypeControllers = {
    createApplicationType,
    getAllApplicationTypes,
    getSingleApplicationType,
    updateApplicationType,
    deleteApplicationType,
};
