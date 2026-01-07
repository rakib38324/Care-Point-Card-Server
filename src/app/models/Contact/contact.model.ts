import { model, Schema } from 'mongoose';
import { TContact } from './contact.interface';

// Define the Mongoose schema
const contactSchema = new Schema<TContact>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    reason: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
);

// Create and export the model
export const Contact = model<TContact>('Contact', contactSchema);
