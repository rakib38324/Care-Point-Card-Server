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
    phoneNumber: encrypt(payload.phoneNumber),
    whatsappNumber: payload.whatsappNumber
      ? encrypt(payload.whatsappNumber)
      : undefined,
    fullAddress: encrypt(payload.fullAddress),

    // ================= Health Info =================
    existingConditions: payload.existingConditions
      ? encrypt(payload.existingConditions)
      : undefined,
    currentMedications: payload.currentMedications
      ? encrypt(payload.currentMedications)
      : undefined,

    // ================= Onboarding =================
    preferredConsultationTime: encrypt(payload.preferredConsultationTime),

    familyMembers: payload.familyMembers?.map((member) => ({
      fullName: encrypt(member.fullName),
      relationship: member.relationship, // not sensitive
      dateOfBirth: member.dateOfBirth
        ? encrypt(member.dateOfBirth.toString())
        : undefined,
    })),
  };
};
