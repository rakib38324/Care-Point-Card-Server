"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
/* eslint-disable no-useless-escape */
const zod_1 = require("zod");
const passwordMinLength = 8;
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email(),
        password: zod_1.z
            .string({ error: 'Password is required.' })
            .refine((data) => data.length >= passwordMinLength, {
            message: `Password must be at least ${passwordMinLength} characters long.`,
        })
            .refine((data) => /[a-z]/.test(data), {
            message: 'Password must contain at least one lowercase letter.',
        })
            .refine((data) => /[A-Z]/.test(data), {
            message: 'Password must contain at least one uppercase letter.',
        })
            .refine((data) => /\d/.test(data), {
            message: 'Password must contain at least one number.',
        })
            .refine((data) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(data), {
            message: 'Password must contain at least one special character.',
        }),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        password: zod_1.z
            .string({ error: 'Password is required.' })
            .refine((data) => data.length >= passwordMinLength, {
            message: `Password must be at least ${passwordMinLength} characters long.`,
        })
            .refine((data) => /[a-z]/.test(data), {
            message: 'Password must contain at least one lowercase letter.',
        })
            .refine((data) => /[A-Z]/.test(data), {
            message: 'Password must contain at least one uppercase letter.',
        })
            .refine((data) => /\d/.test(data), {
            message: 'Password must contain at least one number.',
        })
            .refine((data) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(data), {
            message: 'Password must contain at least one special character.',
        })
            .optional(),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
