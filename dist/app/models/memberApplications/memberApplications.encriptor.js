"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptMemberApplicationPayload = void 0;
const encryption_utils_1 = require("../../utils/encryption.utils");
const encryptMemberApplicationPayload = (payload) => {
    var _a, _b;
    return Object.assign(Object.assign({}, payload), { 
        // ================= Personal Info =================
        fullName: (0, encryption_utils_1.encrypt)(payload.fullName), dateOfBirth: (0, encryption_utils_1.encrypt)(payload.dateOfBirth), gender: (0, encryption_utils_1.encrypt)(payload.gender), phoneNumber: (0, encryption_utils_1.encrypt)(payload.phoneNumber), whatsappNumber: payload.whatsappNumber
            ? (0, encryption_utils_1.encrypt)(payload.whatsappNumber)
            : undefined, fullAddress: (0, encryption_utils_1.encrypt)(payload.fullAddress), countryOfResidence: (0, encryption_utils_1.encrypt)(payload === null || payload === void 0 ? void 0 : payload.countryOfResidence), cityOrRegion: (0, encryption_utils_1.encrypt)(payload === null || payload === void 0 ? void 0 : payload.cityOrRegion), membershipTier: (0, encryption_utils_1.encrypt)(payload.membershipTier), 
        // ================= Health Info =================
        existingConditions: payload.existingConditions
            ? (0, encryption_utils_1.encrypt)(payload.existingConditions)
            : undefined, currentMedications: payload.currentMedications
            ? (0, encryption_utils_1.encrypt)(payload.currentMedications)
            : undefined, currentHealthStatus: (0, encryption_utils_1.encrypt)(payload === null || payload === void 0 ? void 0 : payload.currentHealthStatus), bloodTestLocationPreference: (0, encryption_utils_1.encrypt)(payload === null || payload === void 0 ? void 0 : payload.bloodTestLocationPreference), preferredConsultationDate: (0, encryption_utils_1.encrypt)((_a = payload === null || payload === void 0 ? void 0 : payload.preferredConsultationDate) === null || _a === void 0 ? void 0 : _a.toString()), 
        // ================= Onboarding =================
        preferredConsultationTime: (0, encryption_utils_1.encrypt)(payload.preferredConsultationTime), familyMembers: (_b = payload.familyMembers) === null || _b === void 0 ? void 0 : _b.map((member) => ({
            fullName: (0, encryption_utils_1.encrypt)(member.fullName),
            relationship: (0, encryption_utils_1.encrypt)(member.relationship),
            dateOfBirth: member.dateOfBirth
                ? (0, encryption_utils_1.encrypt)(member.dateOfBirth.toString())
                : undefined,
        })) });
};
exports.encryptMemberApplicationPayload = encryptMemberApplicationPayload;
