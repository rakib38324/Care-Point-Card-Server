"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptEmployerApplicationPayload = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const encryption_utils_1 = require("../../utils/encryption.utils");
const encryptEmployerApplicationPayload = (payload) => {
    return Object.assign(Object.assign({}, payload), { 
        // ================= Company Information =================
        companyName: (0, encryption_utils_1.encrypt)(payload.companyName), industry: (0, encryption_utils_1.encrypt)(payload.industry), companySize: (0, encryption_utils_1.encrypt)(payload.companySize), registrationNumber: (0, encryption_utils_1.encrypt)(payload.registrationNumber), countryOfRegistration: (0, encryption_utils_1.encrypt)(payload.countryOfRegistration), headquartersAddress: (0, encryption_utils_1.encrypt)(payload.headquartersAddress), website: payload.website ? (0, encryption_utils_1.encrypt)(payload.website) : undefined, 
        // ================= Primary Contact (HR/Benefits Manager) =================
        primaryContact: {
            fullName: (0, encryption_utils_1.encrypt)(payload.primaryContact.fullName),
            titleOrPosition: (0, encryption_utils_1.encrypt)(payload.primaryContact.titleOrPosition),
            email: (0, encryption_utils_1.encrypt)(payload.primaryContact.email),
            phoneNumber: (0, encryption_utils_1.encrypt)(payload.primaryContact.phoneNumber),
            whatsappNumber: payload.primaryContact.whatsappNumber
                ? (0, encryption_utils_1.encrypt)(payload.primaryContact.whatsappNumber)
                : undefined,
        }, 
        // ================= Employee Coverage Details =================
        employeeLocations: (0, encryption_utils_1.encrypt)(payload.employeeLocations), coverageType: (0, encryption_utils_1.encrypt)(payload.coverageType), eligibilityCriteria: (0, encryption_utils_1.encrypt)(payload.eligibilityCriteria), eligibilityCriteriaOther: payload.eligibilityCriteriaOther
            ? (0, encryption_utils_1.encrypt)(payload.eligibilityCriteriaOther)
            : undefined, 
        // ================= Membership Configuration =================
        membershipTier: (0, encryption_utils_1.encrypt)(payload.membershipTier), membershipTierDetails: payload.membershipTierDetails
            ? (0, encryption_utils_1.encrypt)(payload.membershipTierDetails)
            : undefined, onboardingApproach: (0, encryption_utils_1.encrypt)(payload.onboardingApproach), 
        // ================= Program Customization =================
        wellnessPriorities: (0, encryption_utils_1.encrypt)(payload.wellnessPriorities), additionalServicesRequested: payload.additionalServicesRequested
            ? (0, encryption_utils_1.encrypt)(payload.additionalServicesRequested)
            : undefined, 
        // ================= Reporting & Analytics =================
        dashboardAccess: (0, encryption_utils_1.encrypt)(payload.dashboardAccess), reportingFrequency: (0, encryption_utils_1.encrypt)(payload.reportingFrequency), keyMetrics: (0, encryption_utils_1.encrypt)(payload.keyMetrics), 
        // ================= Budget & Payment =================
        costSharingModel: (0, encryption_utils_1.encrypt)(payload.costSharingModel), paymentSchedule: (0, encryption_utils_1.encrypt)(payload.paymentSchedule), 
        // ================= Implementation Timeline =================
        desiredStartDate: (0, encryption_utils_1.encrypt)(payload.desiredStartDate), openEnrollmentPeriod: {
            start: (0, encryption_utils_1.encrypt)(payload.openEnrollmentPeriod.start),
            end: (0, encryption_utils_1.encrypt)(payload.openEnrollmentPeriod.end),
        }, communicationSupportNeeded: (0, encryption_utils_1.encrypt)(payload.communicationSupportNeeded), 
        // ================= Supporting Documents (URLs) =================
        companyRegistrationCertificate: payload.companyRegistrationCertificate
            ? (0, encryption_utils_1.encrypt)(payload.companyRegistrationCertificate)
            : undefined, benefitsPolicyOverview: payload.benefitsPolicyOverview
            ? (0, encryption_utils_1.encrypt)(payload.benefitsPolicyOverview)
            : undefined, employeeDemographicsSummary: payload.employeeDemographicsSummary
            ? (0, encryption_utils_1.encrypt)(payload.employeeDemographicsSummary)
            : undefined });
};
exports.encryptEmployerApplicationPayload = encryptEmployerApplicationPayload;
