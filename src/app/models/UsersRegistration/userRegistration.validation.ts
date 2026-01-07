/* eslint-disable no-useless-escape */
import { z } from 'zod';

const passwordMinLength = 8;

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({ error: 'First Name is required.' }),
    lastName: z.string({ error: 'Last Name is required.' }),
    email: z.string({ error: 'Email is required.' }),
    address: z.string({ error: 'Address is required.' }),
    phone: z.string({ error: 'Phone number is required.' }),
    password: z
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

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    img: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    verified: z.boolean().optional(),
    role: z.enum(['admin', 'superAdmin', 'user', 'dealer']).optional(),
    password: z
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

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
