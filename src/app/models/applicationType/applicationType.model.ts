/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { TApplicationType } from './applicationType.interface';

const applicationTypeSchema = new Schema<TApplicationType>(
  {
    applicantTitle: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    userRole: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ApplicationType = model<TApplicationType>(
  'ApplicationType',
  applicationTypeSchema,
);
