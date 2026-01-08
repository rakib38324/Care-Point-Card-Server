"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberApplications = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
/**
 * ================= Family Member Sub Schema =================
 */
const familyMemberSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    relationship: { type: String, required: true },
    dateOfBirth: { type: Date },
}, { _id: false });
/**
 * ================= Main Schema =================
 */
const memberApplicationsSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
/**
 * ================= Model Export =================
 */
exports.MemberApplications = (0, mongoose_1.model)('MemberApplication', memberApplicationsSchema);
