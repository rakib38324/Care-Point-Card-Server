"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationTypeValidations = void 0;
const zod_1 = require("zod");
const user_constent_1 = require("../UsersRegistration/user.constent");
const createApplicationTypeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        applicantTitle: zod_1.z.string({ error: 'Applicant title is required.' }).trim(),
        price: zod_1.z.number({ error: 'Price is required.' }).min(0),
        userRole: zod_1.z.enum([
            `${user_constent_1.USER_ROLE.admin}`,
            `${user_constent_1.USER_ROLE.superAdmin}`,
            `${user_constent_1.USER_ROLE.doctor}`,
            `${user_constent_1.USER_ROLE.employer}`,
            `${user_constent_1.USER_ROLE.member}`,
            `${user_constent_1.USER_ROLE.ngo}`,
            `${user_constent_1.USER_ROLE.provider}`,
            `${user_constent_1.USER_ROLE.sponsor}`
        ]),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateApplicationTypeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        applicantTitle: zod_1.z.string().trim().optional(),
        price: zod_1.z.number().min(0).optional(),
        userRole: zod_1.z.enum([
            `${user_constent_1.USER_ROLE.admin}`,
            `${user_constent_1.USER_ROLE.superAdmin}`,
            `${user_constent_1.USER_ROLE.doctor}`,
            `${user_constent_1.USER_ROLE.employer}`,
            `${user_constent_1.USER_ROLE.member}`,
            `${user_constent_1.USER_ROLE.ngo}`,
            `${user_constent_1.USER_ROLE.provider}`,
            `${user_constent_1.USER_ROLE.sponsor}`
        ]).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ApplicationTypeValidations = {
    createApplicationTypeValidationSchema,
    updateApplicationTypeValidationSchema,
};
