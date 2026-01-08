/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { TMemberApplications } from './memberApplications.interface';

/**
 * ================= Family Member Sub Schema =================
 */
const familyMemberSchema = new Schema(
  {
    fullName: { type: String, required: true },
    relationship: { type: String, required: true },
    dateOfBirth: { type: Date },
  },
  { _id: false },
);

/**
 * ================= Main Schema =================
 */
const memberApplicationsSchema = new Schema<TMemberApplications>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    // ================= Personal Information =================
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    phoneNumber: { type: String, required: true },
    whatsappNumber: { type: String },
    countryOfResidence: { type: String, required: true },
    cityOrRegion: { type: String, required: true },
    fullAddress: { type: String, required: true },

    // ================= Membership Selection =================
    membershipTier: {
      type: String,
      enum: [
        'Preventative Wellness Care',
        'Disease Monitoring & Management',
        'Family & Friends Plan',
      ],
      required: true,
    },

    familyMembers: {
      type: [familyMemberSchema],
      default: [],
    },

    // ================= Health Information =================
    currentHealthStatus: {
      type: String,
      enum: [
        'Health/Preventative focus',
        'Managing chronic conditions',
        'Other',
      ],
      required: true,
    },

    existingConditions: { type: String },
    currentMedications: { type: String },

    // ================= Onboarding =================
    bloodTestLocationPreference: {
      type: String,
      required: true,
    },
    preferredConsultationDate: {
      type: Date,
      required: true,
    },
    preferredConsultationTime: {
      type: String,
      required: true,
    },

    // ================= Payment =================
    onboardingFee: {
      type: Number,
      default: 123,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * ================= Model Export =================
 */
export const MemberApplications = model<TMemberApplications>(
  'MemberApplication',
  memberApplicationsSchema,
);
