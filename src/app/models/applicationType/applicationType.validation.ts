import { z } from 'zod';
import { USER_ROLE } from '../UsersRegistration/user.constent';

const createApplicationTypeValidationSchema = z.object({
  body: z.object({
    applicantTitle: z.string({ error: 'Applicant title is required.' }).trim(),
    price: z.number({ error: 'Price is required.' }).min(0),
    userRole: z.enum([
      `${USER_ROLE.admin}`,
      `${USER_ROLE.superAdmin}`,
      `${USER_ROLE.doctor}`,
      `${USER_ROLE.employer}`,
      `${USER_ROLE.member}`,
      `${USER_ROLE.ngo}`,
      `${USER_ROLE.provider}`,
      `${USER_ROLE.sponsor}`,
    ]),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateApplicationTypeValidationSchema = z.object({
  body: z.object({
    applicantTitle: z.string().trim().optional(),
    price: z.number().min(0).optional(),
    userRole: z
      .enum([
        `${USER_ROLE.admin}`,
        `${USER_ROLE.superAdmin}`,
        `${USER_ROLE.doctor}`,
        `${USER_ROLE.employer}`,
        `${USER_ROLE.member}`,
        `${USER_ROLE.ngo}`,
        `${USER_ROLE.provider}`,
        `${USER_ROLE.sponsor}`,
      ])
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ApplicationTypeValidations = {
  createApplicationTypeValidationSchema,
  updateApplicationTypeValidationSchema,
};
