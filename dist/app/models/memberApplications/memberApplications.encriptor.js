"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptMemberApplicationPayload = void 0;
const encryption_utils_1 = require("../../utils/encryption.utils");
const encryptMemberApplicationPayload = (payload) => {
    var _a;
    return Object.assign(Object.assign({}, payload), { 
        // ================= Personal Info =================
        fullName: (0, encryption_utils_1.encrypt)(payload.fullName), dateOfBirth: (0, encryption_utils_1.encrypt)(payload.dateOfBirth), phoneNumber: (0, encryption_utils_1.encrypt)(payload.phoneNumber), whatsappNumber: payload.whatsappNumber
            ? (0, encryption_utils_1.encrypt)(payload.whatsappNumber)
            : undefined, fullAddress: (0, encryption_utils_1.encrypt)(payload.fullAddress), 
        // ================= Health Info =================
        existingConditions: payload.existingConditions
            ? (0, encryption_utils_1.encrypt)(payload.existingConditions)
            : undefined, currentMedications: payload.currentMedications
            ? (0, encryption_utils_1.encrypt)(payload.currentMedications)
            : undefined, 
        // ================= Onboarding =================
        preferredConsultationTime: (0, encryption_utils_1.encrypt)(payload.preferredConsultationTime), familyMembers: (_a = payload.familyMembers) === null || _a === void 0 ? void 0 : _a.map(member => ({
            fullName: (0, encryption_utils_1.encrypt)(member.fullName),
            relationship: member.relationship, // not sensitive
            dateOfBirth: member.dateOfBirth
                ? ((0, encryption_utils_1.encrypt)(member.dateOfBirth.toString()))
                : undefined,
        })) });
};
exports.encryptMemberApplicationPayload = encryptMemberApplicationPayload;
