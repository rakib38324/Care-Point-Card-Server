"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptEmployerApplicationPayload = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const encryption_utils_1 = require("../../utils/encryption.utils");
const decryptEmployerApplicationPayload = (payload) => {
    return {
        _id: payload === null || payload === void 0 ? void 0 : payload._id,
        userId: payload === null || payload === void 0 ? void 0 : payload.userId,
        paymentId: payload === null || payload === void 0 ? void 0 : payload.paymentId,
        // ================= Company Information =================
        companyName: (0, encryption_utils_1.decrypt)(payload.companyName),
        industry: (0, encryption_utils_1.decrypt)(payload.industry),
        companySize: (0, encryption_utils_1.decrypt)(payload.companySize),
        registrationNumber: (0, encryption_utils_1.decrypt)(payload.registrationNumber),
        countryOfRegistration: (0, encryption_utils_1.decrypt)(payload.countryOfRegistration),
        headquartersAddress: (0, encryption_utils_1.decrypt)(payload.headquartersAddress),
        website: payload.website ? (0, encryption_utils_1.decrypt)(payload.website) : undefined,
        // ================= Primary Contact (HR/Benefits Manager) =================
        primaryContact: {
            fullName: (0, encryption_utils_1.decrypt)(payload.primaryContact.fullName),
            titleOrPosition: (0, encryption_utils_1.decrypt)(payload.primaryContact.titleOrPosition),
            email: (0, encryption_utils_1.decrypt)(payload.primaryContact.email),
            phoneNumber: (0, encryption_utils_1.decrypt)(payload.primaryContact.phoneNumber),
            whatsappNumber: payload.primaryContact.whatsappNumber
                ? (0, encryption_utils_1.decrypt)(payload.primaryContact.whatsappNumber)
                : undefined,
        },
        // ================= Employee Coverage Details =================
        numberOfEmployeesToEnroll: payload.numberOfEmployeesToEnroll, // number field
        employeeLocations: (0, encryption_utils_1.decrypt)(payload.employeeLocations),
        coverageType: (0, encryption_utils_1.decrypt)(payload.coverageType),
        eligibilityCriteria: (0, encryption_utils_1.decrypt)(payload.eligibilityCriteria),
        eligibilityCriteriaOther: payload.eligibilityCriteriaOther
            ? (0, encryption_utils_1.decrypt)(payload.eligibilityCriteriaOther)
            : undefined,
        // ================= Membership Configuration =================
        membershipTier: (0, encryption_utils_1.decrypt)(payload.membershipTier),
        membershipTierDetails: payload.membershipTierDetails
            ? (0, encryption_utils_1.decrypt)(payload.membershipTierDetails)
            : undefined,
        onboardingApproach: (0, encryption_utils_1.decrypt)(payload.onboardingApproach),
        // ================= Program Customization =================
        wellnessPriorities: (0, encryption_utils_1.decrypt)(payload.wellnessPriorities),
        additionalServicesRequested: payload.additionalServicesRequested
            ? (0, encryption_utils_1.decrypt)(payload.additionalServicesRequested)
            : undefined,
        // ================= Reporting & Analytics =================
        dashboardAccess: (0, encryption_utils_1.decrypt)(payload.dashboardAccess),
        dashboardAccessSpecificNumber: payload.dashboardAccessSpecificNumber,
        reportingFrequency: (0, encryption_utils_1.decrypt)(payload.reportingFrequency),
        keyMetrics: (0, encryption_utils_1.decrypt)(payload.keyMetrics),
        // ================= Budget & Payment =================
        estimatedAnnualCost: payload.estimatedAnnualCost, // number field
        costSharingModel: (0, encryption_utils_1.decrypt)(payload.costSharingModel),
        paymentSchedule: (0, encryption_utils_1.decrypt)(payload.paymentSchedule),
        paymentMethod: payload.paymentMethod,
        isPaid: payload.isPaid,
        // ================= Implementation Timeline =================
        desiredStartDate: (0, encryption_utils_1.decrypt)(payload.desiredStartDate),
        openEnrollmentPeriod: {
            start: (0, encryption_utils_1.decrypt)(payload.openEnrollmentPeriod.start),
            end: (0, encryption_utils_1.decrypt)(payload.openEnrollmentPeriod.end),
        },
        communicationSupportNeeded: (0, encryption_utils_1.decrypt)(payload.communicationSupportNeeded),
        // ================= Legal & Compliance =================
        agreePartnershipTerms: payload.agreePartnershipTerms,
        agreeDataPrivacyCompliance: payload.agreeDataPrivacyCompliance,
        agreeEmployeeConsentCollection: payload.agreeEmployeeConsentCollection,
        authorizeDirectCommunication: payload.authorizeDirectCommunication,
        // ================= Supporting Documents (URLs) =================
        companyRegistrationCertificate: payload.companyRegistrationCertificate
            ? (0, encryption_utils_1.decrypt)(payload.companyRegistrationCertificate)
            : undefined,
        benefitsPolicyOverview: payload.benefitsPolicyOverview
            ? (0, encryption_utils_1.decrypt)(payload.benefitsPolicyOverview)
            : undefined,
        employeeDemographicsSummary: payload.employeeDemographicsSummary
            ? (0, encryption_utils_1.decrypt)(payload.employeeDemographicsSummary)
            : undefined,
        // ================= System Fields =================
        isDeleted: payload.isDeleted,
    };
};
exports.decryptEmployerApplicationPayload = decryptEmployerApplicationPayload;
