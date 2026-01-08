"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptObjectFields = void 0;
const encryption_utils_1 = require("./encryption.utils");
/**
 * Encrypt only provided fields from payload
 */
const encryptObjectFields = (payload, fields) => {
    const encrypted = {};
    for (const field of fields) {
        const value = payload[field];
        if (value === undefined || value === null)
            continue;
        encrypted[field] =
            typeof value === 'string' ? (0, encryption_utils_1.encrypt)(value) : value;
    }
    return encrypted;
};
exports.encryptObjectFields = encryptObjectFields;
