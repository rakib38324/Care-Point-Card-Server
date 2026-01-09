import { z } from 'zod';

const createEmployerApplicationValidationSchema = z.object({
  body: z.object({
    // ================= Company Information =================
    companyName: z.string({ error: 'Company Name is required.' }),
    industry: z.string({ error: 'Industry is required.' }),
    companySize: z.enum(['10-50', '51-200', '201-500', '500+'], {
      error: 'Company Size is required.',
    }),
    registrationNumber: z.string({ error: 'Registration Number is required.' }),
    countryOfRegistration: z.string({
      error: 'Country of Registration is required.',
    }),
    headquartersAddress: z.string({
      error: 'Headquarters Address is required.',
    }),
    website: z.string().url().optional(),

    // ================= Primary Contact =================
    primaryContact: z.object({
      fullName: z.string({ error: 'Full Name is required.' }),
      titleOrPosition: z.string({ error: 'Title/Position is required.' }),
      email: z
        .string({ error: 'Email is required.' })
        .email('Invalid email address'),
      phoneNumber: z.string({ error: 'Phone Number is required.' }),
      whatsappNumber: z.string().optional(),
    }),

    // ================= Employee Coverage Details =================
    numberOfEmployeesToEnroll: z
      .number({ error: 'Number of employees is required.' })
      .min(1),
    employeeLocations: z.string({ error: 'Employee Location is required.' }),
    coverageType: z.enum(
      ['Employee Only', 'Employee + Spouse', 'Employee + Family'],
      {
        error: 'Coverage Type is required.',
      },
    ),
    eligibilityCriteria: z.string({
      error: 'Eligibility criteria is required.',
    }),
    eligibilityCriteriaOther: z.string().optional(),

    // ================= Membership Configuration =================
    // membershipTier: z.string({ error: 'Membership Tier is required.' }),
    membershipTier: z.enum(
      [
        'Preventative Wellness Care (all employees)',
        'Disease Monitoring & Management (all employees)',
        'Tiered by role/seniority (specify)',
      ],
      {
        error: 'Membership Tier is required.',
      },
    ),
    membershipTierDetails: z.string().optional(),
    onboardingApproach: z.enum(
      ['Phased rollout', 'All at once', 'Voluntary enrollment'],
      {
        error: 'Onboarding approach is required.',
      },
    ),

    // ================= Program Customization =================
    wellnessPriorities: z.enum(
      [
        'Preventative health screenings',
        'Chronic disease management',
        'Mental health support',
        'Nutrition counseling',
        'Fitness tracking',
      ],
      {
        error: 'Wellness Priorities is required.',
      },
    ),
    additionalServicesRequested: z.enum(
      [
        'On-site health fairs',
        'Group wellness workshops',
        'Executive health assessments',
        'Telemedicine for dependents',
      ],
      {
        error: 'Additional Services is required.',
      },
    ),

    // ================= Reporting & Analytics =================
    dashboardAccess: z.enum(
      ['HR Admin only', 'Multiple users (specify number)'],
      {
        error: 'Dashboard Access section is required.',
      },
    ),
    dashboardAccessSpecificNumber: z.number().optional(),
    reportingFrequency: z.enum(['Monthly', 'Quarterly', 'Annually'], {
      error: 'Reporting frequency is required.',
    }),
    keyMetrics: z.enum(
      [
        'Enrollment rates',
        'Utilization rates',
        'Health outcomes',
        'Cost per employee',
        'Absenteeism impact',
        'Employee satisfaction',
      ],
      {
        error: 'Key Metrics  is required.',
      },
    ),

    // ================= Budget & Payment =================
    estimatedAnnualCost: z.number().optional(),
    costSharingModel: z.enum(
      [
        'Employee pays 100%',
        'Employer pays 50%, employee pays 50%',
        'Employee pays 100% (employer-facilitated)',
      ],
      {
        error: 'Key Metrics  is required.',
      },
    ),
    paymentSchedule: z.enum(['Annual', 'Quarterly', 'Monthly'], {
      error: 'Payment schedule is required.',
    }),
    paymentMethod: z.enum(
      ['Wire Transfer', 'ACH/Bank Transfer', 'Corporate Credit Card'],
      {
        error: 'Payment method is required.',
      },
    ),

    // ================= Implementation Timeline =================
    desiredStartDate: z.string({ error: 'Desired start date is required.' }),
    openEnrollmentPeriod: z.object({
      start: z.string({ error: 'Enrollment start date is required.' }),
      end: z.string({ error: 'Enrollment end date is required.' }),
    }),
    communicationSupportNeeded: z
      .enum(
        [
          'Employee announcement templates',
          'Benefits presentation',
          'FAQ documents',
          'Onboarding webinar',
        ],
        {
          error: 'Communication Support Needed is required.',
        },
      )
      .optional(),

    // ================= Legal & Compliance =================
    agreePartnershipTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the partnership terms',
    }),
    agreeDataPrivacyCompliance: z.boolean().refine((val) => val === true, {
      message: 'You must agree to data privacy compliance',
    }),
    agreeEmployeeConsentCollection: z.boolean().refine((val) => val === true, {
      message: 'You must agree to facilitate consent collection',
    }),
    authorizeDirectCommunication: z.boolean().optional(),

    // ================= Supporting Documents =================
    companyRegistrationCertificate: z.string().optional(),
    benefitsPolicyOverview: z.string().optional(),
    employeeDemographicsSummary: z.string().optional(),
  }),
});

const updateEmployerApplicationValidationSchema = z.object({
  body: z
    .object({
      // ================= Company Information =================
      companyName: z.string({ error: 'Company Name is required.' }).optional(),
      industry: z.string({ error: 'Industry is required.' }).optional(),
      companySize: z
        .enum(['10-50', '51-200', '201-500', '500+'], {
          error: 'Company Size is required.',
        })
        .optional(),
      registrationNumber: z
        .string({ error: 'Registration Number is required.' })
        .optional(),
      countryOfRegistration: z
        .string({ error: 'Country of Registration is required.' })
        .optional(),
      headquartersAddress: z
        .string({ error: 'Headquarters Address is required.' })
        .optional(),
      website: z.string().url().optional(),

      // ================= Primary Contact =================
      primaryContact: z
        .object({
          fullName: z.string({ error: 'Full Name is required.' }).optional(),
          titleOrPosition: z
            .string({ error: 'Title/Position is required.' })
            .optional(),
          email: z
            .string({ error: 'Email is required.' })
            .email('Invalid email address')
            .optional(),
          phoneNumber: z
            .string({ error: 'Phone Number is required.' })
            .optional(),
          whatsappNumber: z.string().optional(),
        })
        .optional(),

      // ================= Employee Coverage Details =================
      numberOfEmployeesToEnroll: z
        .number({ error: 'Number of employees is required.' })
        .min(1)
        .optional(),
      employeeLocations: z
        .string({ error: 'Employee Location is required.' })
        .optional(),
      coverageType: z
        .enum(['Employee Only', 'Employee + Spouse', 'Employee + Family'], {
          error: 'Coverage Type is required.',
        })
        .optional(),
      eligibilityCriteria: z
        .string({ error: 'Eligibility criteria is required.' })
        .optional(),
      eligibilityCriteriaOther: z.string().optional(),

      // ================= Membership Configuration =================
      // membershipTier: z.string({ error: 'Membership Tier is required.' }) .optional(),
      membershipTier: z
        .enum(
          [
            'Preventative Wellness Care (all employees)',
            'Disease Monitoring & Management (all employees)',
            'Tiered by role/seniority (specify)',
          ],
          {
            error: 'Membership Tier is required.',
          },
        )
        .optional(),
      membershipTierDetails: z.string().optional(),
      onboardingApproach: z
        .enum(['Phased rollout', 'All at once', 'Voluntary enrollment'], {
          error: 'Onboarding approach is required.',
        })
        .optional(),

      // ================= Program Customization =================
      wellnessPriorities: z
        .enum(
          [
            'Preventative health screenings',
            'Chronic disease management',
            'Mental health support',
            'Nutrition counseling',
            'Fitness tracking',
          ],
          {
            error: 'Wellness Priorities is required.',
          },
        )
        .optional(),
      additionalServicesRequested: z
        .enum(
          [
            'On-site health fairs',
            'Group wellness workshops',
            'Executive health assessments',
            'Telemedicine for dependents',
          ],
          {
            error: 'Additional Services is required.',
          },
        )
        .optional(),

      // ================= Reporting & Analytics =================
      dashboardAccess: z
        .enum(['HR Admin only', 'Multiple users (specify number)'], {
          error: 'Dashboard Access section is required.',
        })
        .optional(),
      dashboardAccessSpecificNumber: z.number().optional(),
      reportingFrequency: z
        .enum(['Monthly', 'Quarterly', 'Annually'], {
          error: 'Reporting frequency is required.',
        })
        .optional(),
      keyMetrics: z
        .enum(
          [
            'Enrollment rates',
            'Utilization rates',
            'Health outcomes',
            'Cost per employee',
            'Absenteeism impact',
            'Employee satisfaction',
          ],
          {
            error: 'Key Metrics  is required.',
          },
        )
        .optional(),

      // ================= Budget & Payment =================
      estimatedAnnualCost: z.number().optional(),
      costSharingModel: z
        .enum(
          [
            'Employee pays 100%',
            'Employer pays 50%, employee pays 50%',
            'Employee pays 100% (employer-facilitated)',
          ],
          {
            error: 'Key Metrics  is required.',
          },
        )
        .optional(),
      paymentSchedule: z
        .enum(['Annual', 'Quarterly', 'Monthly'], {
          error: 'Payment schedule is required.',
        })
        .optional(),
      paymentMethod: z
        .enum(['Wire Transfer', 'ACH/Bank Transfer', 'Corporate Credit Card'], {
          error: 'Payment method is required.',
        })
        .optional(),

      // ================= Implementation Timeline =================
      desiredStartDate: z
        .string({ error: 'Desired start date is required.' })
        .optional(),
      openEnrollmentPeriod: z
        .object({
          start: z
            .string({ error: 'Enrollment start date is required.' })
            .optional(),
          end: z
            .string({ error: 'Enrollment end date is required.' })
            .optional(),
        })
        .optional(),
      communicationSupportNeeded: z
        .enum(
          [
            'Employee announcement templates',
            'Benefits presentation',
            'FAQ documents',
            'Onboarding webinar',
          ],
          {
            error: 'Communication Support Needed is required.',
          },
        )
        .optional(),

      // ================= Legal & Compliance =================
      agreePartnershipTerms: z
        .boolean()
        .refine((val) => val === true, {
          message: 'You must agree to the partnership terms',
        })
        .optional(),
      agreeDataPrivacyCompliance: z
        .boolean()
        .refine((val) => val === true, {
          message: 'You must agree to data privacy compliance',
        })
        .optional(),
      agreeEmployeeConsentCollection: z
        .boolean()
        .refine((val) => val === true, {
          message: 'You must agree to facilitate consent collection',
        })
        .optional(),
      authorizeDirectCommunication: z.boolean().optional(),

      // ================= Supporting Documents =================
      companyRegistrationCertificate: z.string().optional(),
      benefitsPolicyOverview: z.string().optional(),
      employeeDemographicsSummary: z.string().optional(),
    })
    .optional(),
});
export const EmployerApplicationValidations = {
  createEmployerApplicationValidationSchema,
  updateEmployerApplicationValidationSchema,
};
