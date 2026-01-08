import { encrypt } from '../../utils/encryption.utils';
import { TMemberApplications } from './memberApplications.interface';

export const encryptMemberApplicationPayload = (
  payload: TMemberApplications,
): TMemberApplications => {
  return {
    ...payload,

    // ================= Personal Info =================
    fullName: encrypt(payload.fullName),
    dateOfBirth: encrypt(payload.dateOfBirth),
    gender: encrypt(payload.gender),
    phoneNumber: encrypt(payload.phoneNumber),
    whatsappNumber: payload.whatsappNumber
      ? encrypt(payload.whatsappNumber)
      : undefined,
    fullAddress: encrypt(payload.fullAddress),
    countryOfResidence: encrypt(payload?.countryOfResidence),
    cityOrRegion: encrypt(payload?.cityOrRegion),

    membershipTier: encrypt(
      payload.membershipTier,
    ) as typeof payload.membershipTier,

    // ================= Health Info =================
    existingConditions: payload.existingConditions
      ? encrypt(payload.existingConditions)
      : undefined,
    currentMedications: payload.currentMedications
      ? encrypt(payload.currentMedications)
      : undefined,
    currentHealthStatus: encrypt(
      payload?.currentHealthStatus,
    ) as typeof payload.currentHealthStatus,
    bloodTestLocationPreference: encrypt(payload?.bloodTestLocationPreference),
    preferredConsultationDate: encrypt(
      payload?.preferredConsultationDate?.toString(),
    ) as any,

    // ================= Onboarding =================
    preferredConsultationTime: encrypt(payload.preferredConsultationTime),

    familyMembers: payload.familyMembers?.map((member) => ({
      fullName: encrypt(member.fullName),
      relationship: encrypt(member.relationship),
      dateOfBirth: member.dateOfBirth
        ? encrypt(member.dateOfBirth.toString())
        : undefined,
    })),
  };
};
