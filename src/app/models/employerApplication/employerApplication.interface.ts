export type TEmployerApplication = {
  _id: string;
  userId: string;
  paymentId?: string;

  // ================= Company Information =================
  companyName: string;
  industry: string;
  companySize: string;
  registrationNumber: string;
  countryOfRegistration: string;
  headquartersAddress: string;
  website?: string;

  // ================= Primary Contact (HR/Benefits Manager) =================
  primaryContact: {
    fullName: string;
    titleOrPosition: string;
    email: string;
    phoneNumber: string;
    whatsappNumber?: string;
  };

  // ================= Employee Coverage Details =================
  numberOfEmployeesToEnroll: number;
  employeeLocations: string;
  coverageType: string;
  eligibilityCriteria: string;
  eligibilityCriteriaOther?: string;

  // ================= Membership Configuration =================
  membershipTier: string;
  membershipTierDetails?: string; // For 'Tiered by role' specification
  onboardingApproach: string;

  // ================= Program Customization =================
  wellnessPriorities: string;
  additionalServicesRequested?: string;

  // ================= Reporting & Analytics =================
  dashboardAccess: string; // e.g., "HR Admin only" or "3 Users"
  dashboardAccessSpecificNumber?: number;
  reportingFrequency: string;
  keyMetrics: string; // Enrollment rates, utilization, etc.

  // ================= Budget & Payment =================
  estimatedAnnualCost: number; // Auto-calculated
  costSharingModel: string;
  paymentSchedule: string;
  paymentMethod: string;
  isPaid: boolean;

  // ================= Implementation Timeline =================
  desiredStartDate: string;
  openEnrollmentPeriod: {
    start: string;
    end: string;
  };
  communicationSupportNeeded: string;

  // ================= Legal & Compliance =================
  agreePartnershipTerms: boolean;
  agreeDataPrivacyCompliance: boolean; // HIPAA/GDPR
  agreeEmployeeConsentCollection: boolean;
  authorizeDirectCommunication: boolean;

  // ================= Supporting Documents (URLs) =================
  companyRegistrationCertificate?: string;
  benefitsPolicyOverview?: string;
  employeeDemographicsSummary?: string;

  isDeleted: boolean;

  // ================= System Fields =================
  createdAt: Date;
  updatedAt: Date;
};
