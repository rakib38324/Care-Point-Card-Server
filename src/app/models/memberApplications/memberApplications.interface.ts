export type TMemberApplications = {
  _id: string;
  userId: string;

  // ================= Personal Information =================
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  whatsappNumber?: string;
  countryOfResidence: string;
  cityOrRegion: string;
  fullAddress: string;

  // ================= Membership Selection =================
  membershipTier:
    | 'Preventative Wellness Care'
    | 'Disease Monitoring & Management'
    | 'Family & Friends Plan';

  familyMembers?: {
    fullName: string;
    relationship: string;
    dateOfBirth?: Date;
  }[];

  // ================= Health Information =================
  currentHealthStatus:
    | 'Health/Preventative focus'
    | 'Managing chronic conditions'
    | 'Other';

  existingConditions?: string;

  currentMedications?: string;

  // ================= Onboarding =================
  bloodTestLocationPreference: string;
  preferredConsultationDate: Date;
  preferredConsultationTime: string; // e.g. "10:30 AM"

  // ================= Payment =================
  onboardingFee?: number;
  paymentMethod: string;

  // ================= System Fields =================
  createdAt: Date;
  updatedAt: Date;
};
