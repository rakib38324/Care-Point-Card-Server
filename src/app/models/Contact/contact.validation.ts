import { z } from 'zod';

const createContactValidationSchema = z.object({
  body: z.object({
    firstName: z.string().nonempty({ message: 'First name is required' }),
    lastName: z.string().nonempty({ message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    country: z.string().nonempty({ message: 'Country is required' }),
    reason: z.string().nonempty({ message: 'Reason is required' }),
    message: z.string().nonempty({ message: 'Message is required' }),
    phone: z.string().nonempty({ message: 'Message is required' }),
  }),
});

export const ContactValidations = {
  createContactValidationSchema,
};
