"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
/* eslint-disable no-useless-escape */
const zod_1 = require("zod");
const passwordMinLength = 8;
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({ error: 'First Name is required.' }),
        lastName: zod_1.z.string({ error: 'Last Name is required.' }),
        email: zod_1.z.string({ error: 'Email is required.' }),
        address: zod_1.z.string({ error: 'Address is required.' }),
        phone: zod_1.z.string({ error: 'Phone number is required.' }),
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
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        img: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        verified: zod_1.z.boolean().optional(),
        role: zod_1.z.enum(['admin', 'superAdmin', 'user', 'dealer']).optional(),
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
