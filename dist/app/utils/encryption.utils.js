"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../config/config"));
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;
// Convert the key to Uint8Array
const ENCRYPTION_KEY = new Uint8Array(crypto_1.default
    .createHash('sha256')
    .update(config_1.default.data_encription_key)
    .digest());
const encrypt = (text) => {
    console.log(text);
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const ivArray = new Uint8Array(iv); // Convert iv to Uint8Array
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, ENCRYPTION_KEY, ivArray);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};
exports.encrypt = encrypt;
const decrypt = (encryptedText) => {
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = new Uint8Array(Buffer.from(ivHex, 'hex')); // Convert iv to Uint8Array
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.decrypt = decrypt;
