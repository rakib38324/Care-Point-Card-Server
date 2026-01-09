/* eslint-disable @typescript-eslint/no-explicit-any */
import { decrypt } from '../../utils/encryption.utils';
import { TEmployerApplication } from './employerApplication.interface';

export const decryptEmployerApplicationPayload = (
  payload: TEmployerApplication,
) => {
  return {
    _id: payload?._id,
    userId: payload?.userId,
    paymentId: payload?.paymentId,

    // ================= Company Information =================
    companyName: decrypt(payload.companyName),
    industry: decrypt(payload.industry),
    companySize: decrypt(payload.companySize),
    registrationNumber: decrypt(payload.registrationNumber),
    countryOfRegistration: decrypt(payload.countryOfRegistration),
    headquartersAddress: decrypt(payload.headquartersAddress),
    website: payload.website ? decrypt(payload.website) : undefined,

    // ================= Primary Contact (HR/Benefits Manager) =================
    primaryContact: {
      fullName: decrypt(payload.primaryContact.fullName),
      titleOrPosition: decrypt(payload.primaryContact.titleOrPosition),
      email: decrypt(payload.primaryContact.email),
      phoneNumber: decrypt(payload.primaryContact.phoneNumber),
      whatsappNumber: payload.primaryContact.whatsappNumber
        ? decrypt(payload.primaryContact.whatsappNumber)
        : undefined,
    },

    // ================= Employee Coverage Details =================
    numberOfEmployeesToEnroll: payload.numberOfEmployeesToEnroll, // number field
    employeeLocations: decrypt(payload.employeeLocations),
    coverageType: decrypt(payload.coverageType),
    eligibilityCriteria: decrypt(payload.eligibilityCriteria),
    eligibilityCriteriaOther: payload.eligibilityCriteriaOther
      ? decrypt(payload.eligibilityCriteriaOther)
      : undefined,

    // ================= Membership Configuration =================
    membershipTier: decrypt(payload.membershipTier),
    membershipTierDetails: payload.membershipTierDetails
      ? decrypt(payload.membershipTierDetails)
      : undefined,
    onboardingApproach: decrypt(payload.onboardingApproach),

    // ================= Program Customization =================
    wellnessPriorities: decrypt(payload.wellnessPriorities),
    additionalServicesRequested: payload.additionalServicesRequested
      ? decrypt(payload.additionalServicesRequested)
      : undefined,

    // ================= Reporting & Analytics =================
    dashboardAccess: decrypt(payload.dashboardAccess),
    dashboardAccessSpecificNumber: payload.dashboardAccessSpecificNumber,
    reportingFrequency: decrypt(payload.reportingFrequency),
    keyMetrics: decrypt(payload.keyMetrics),

    // ================= Budget & Payment =================
    estimatedAnnualCost: payload.estimatedAnnualCost, // number field
    costSharingModel: decrypt(payload.costSharingModel),
    paymentSchedule: decrypt(payload.paymentSchedule),
    paymentMethod: payload.paymentMethod,
    isPaid: payload.isPaid,

    // ================= Implementation Timeline =================
    desiredStartDate: decrypt(payload.desiredStartDate),
    openEnrollmentPeriod: {
      start: decrypt(payload.openEnrollmentPeriod.start),
      end: decrypt(payload.openEnrollmentPeriod.end),
    },
    communicationSupportNeeded: decrypt(payload.communicationSupportNeeded),

    // ================= Legal & Compliance =================
    agreePartnershipTerms: payload.agreePartnershipTerms,
    agreeDataPrivacyCompliance: payload.agreeDataPrivacyCompliance,
    agreeEmployeeConsentCollection: payload.agreeEmployeeConsentCollection,
    authorizeDirectCommunication: payload.authorizeDirectCommunication,

    // ================= Supporting Documents (URLs) =================
    companyRegistrationCertificate: payload.companyRegistrationCertificate
      ? decrypt(payload.companyRegistrationCertificate)
      : undefined,
    benefitsPolicyOverview: payload.benefitsPolicyOverview
      ? decrypt(payload.benefitsPolicyOverview)
      : undefined,
    employeeDemographicsSummary: payload.employeeDemographicsSummary
      ? decrypt(payload.employeeDemographicsSummary)
      : undefined,

    // ================= System Fields =================
    isDeleted: payload.isDeleted,
  };
};
