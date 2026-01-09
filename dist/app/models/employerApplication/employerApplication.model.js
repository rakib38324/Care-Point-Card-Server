"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerApplication = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
/**
 * ================= Primary Contact Sub Schema =================
 */
const primaryContactSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    titleOrPosition: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    whatsappNumber: { type: String },
}, { _id: false });
/**
 * ================= Open Enrollment Period Sub Schema =================
 */
const openEnrollmentPeriodSchema = new mongoose_1.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
}, { _id: false });
/**
 * ================= Main Employer Application Schema =================
 */
const employerApplicationSchema = new mongoose_1.Schema({
    userId: mongoose_1.Schema.Types.ObjectId,
    paymentId: mongoose_1.Schema.Types.ObjectId,
    // ================= Company Information =================
    companyName: { type: String, required: true },
    industry: { type: String, required: true },
    companySize: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    countryOfRegistration: { type: String, required: true },
    headquartersAddress: { type: String, required: true },
    website: { type: String },
    // ================= Primary Contact (HR/Benefits Manager) =================
    primaryContact: {
        type: primaryContactSchema,
        required: true,
    },
    // ================= Employee Coverage Details =================
    numberOfEmployeesToEnroll: { type: Number, required: true },
    employeeLocations: { type: String, required: true },
    coverageType: { type: String, required: true },
    eligibilityCriteria: { type: String, required: true },
    eligibilityCriteriaOther: { type: String },
    // ================= Membership Configuration =================
    membershipTier: { type: String, required: true },
    membershipTierDetails: { type: String },
    onboardingApproach: { type: String, required: true },
    // ================= Program Customization =================
    wellnessPriorities: { type: String, required: true },
    additionalServicesRequested: { type: String },
    // ================= Reporting & Analytics =================
    dashboardAccess: { type: String, required: true },
    dashboardAccessSpecificNumber: { type: Number },
    reportingFrequency: { type: String, required: true },
    keyMetrics: { type: String, required: true },
    // ================= Budget & Payment =================
    estimatedAnnualCost: { type: Number, required: true },
    costSharingModel: { type: String, required: true },
    paymentSchedule: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    isPaid: {
        type: Boolean,
        default: false,
    },
    // ================= Implementation Timeline =================
    desiredStartDate: { type: String, required: true },
    openEnrollmentPeriod: {
        type: openEnrollmentPeriodSchema,
        required: true,
    },
    communicationSupportNeeded: { type: String, required: true },
    // ================= Legal & Compliance =================
    agreePartnershipTerms: { type: Boolean, required: true },
    agreeDataPrivacyCompliance: { type: Boolean, required: true },
    agreeEmployeeConsentCollection: { type: Boolean, required: true },
    authorizeDirectCommunication: {
        type: Boolean,
        default: false,
    },
    // ================= Supporting Documents (URLs) =================
    companyRegistrationCertificate: { type: String },
    benefitsPolicyOverview: { type: String },
    employeeDemographicsSummary: { type: String },
    // ================= System Status =================
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
/**
 * ================= Model Export =================
 */
exports.EmployerApplication = (0, mongoose_1.model)('EmployerApplication', employerApplicationSchema);
