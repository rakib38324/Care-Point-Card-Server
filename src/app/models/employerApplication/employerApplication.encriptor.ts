/* eslint-disable @typescript-eslint/no-explicit-any */
import { encrypt } from '../../utils/encryption.utils';
import { TEmployerApplication } from './employerApplication.interface';

export const encryptEmployerApplicationPayload = (
  payload: TEmployerApplication,
): TEmployerApplication => {
  return {
    ...payload,

    // ================= Company Information =================
    companyName: encrypt(payload.companyName),
    industry: encrypt(payload.industry),
    companySize: encrypt(payload.companySize),
    registrationNumber: encrypt(payload.registrationNumber),
    countryOfRegistration: encrypt(payload.countryOfRegistration),
    headquartersAddress: encrypt(payload.headquartersAddress),
    website: payload.website ? encrypt(payload.website) : undefined,

    // ================= Primary Contact (HR/Benefits Manager) =================
    primaryContact: {
      fullName: encrypt(payload.primaryContact.fullName),
      titleOrPosition: encrypt(payload.primaryContact.titleOrPosition),
      email: encrypt(payload.primaryContact.email),
      phoneNumber: encrypt(payload.primaryContact.phoneNumber),
      whatsappNumber: payload.primaryContact.whatsappNumber
        ? encrypt(payload.primaryContact.whatsappNumber)
        : undefined,
    },

    // ================= Employee Coverage Details =================
    employeeLocations: encrypt(payload.employeeLocations),
    coverageType: encrypt(payload.coverageType),
    eligibilityCriteria: encrypt(payload.eligibilityCriteria),
    eligibilityCriteriaOther: payload.eligibilityCriteriaOther
      ? encrypt(payload.eligibilityCriteriaOther)
      : undefined,

    // ================= Membership Configuration =================
    membershipTier: encrypt(payload.membershipTier),
    membershipTierDetails: payload.membershipTierDetails
      ? encrypt(payload.membershipTierDetails)
      : undefined,
    onboardingApproach: encrypt(payload.onboardingApproach),

    // ================= Program Customization =================
    wellnessPriorities: encrypt(payload.wellnessPriorities),
    additionalServicesRequested: payload.additionalServicesRequested
      ? encrypt(payload.additionalServicesRequested)
      : undefined,

    // ================= Reporting & Analytics =================
    dashboardAccess: encrypt(payload.dashboardAccess),
    reportingFrequency: encrypt(payload.reportingFrequency),
    keyMetrics: encrypt(payload.keyMetrics),

    // ================= Budget & Payment =================
    costSharingModel: encrypt(payload.costSharingModel),
    paymentSchedule: encrypt(payload.paymentSchedule),

    // ================= Implementation Timeline =================
    desiredStartDate: encrypt(payload.desiredStartDate),
    openEnrollmentPeriod: {
      start: encrypt(payload.openEnrollmentPeriod.start),
      end: encrypt(payload.openEnrollmentPeriod.end),
    },
    communicationSupportNeeded: encrypt(payload.communicationSupportNeeded),

    // ================= Supporting Documents (URLs) =================
    companyRegistrationCertificate: payload.companyRegistrationCertificate
      ? encrypt(payload.companyRegistrationCertificate)
      : undefined,
    benefitsPolicyOverview: payload.benefitsPolicyOverview
      ? encrypt(payload.benefitsPolicyOverview)
      : undefined,
    employeeDemographicsSummary: payload.employeeDemographicsSummary
      ? encrypt(payload.employeeDemographicsSummary)
      : undefined,
  } as TEmployerApplication;
};
