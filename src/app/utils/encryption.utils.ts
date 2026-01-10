import crypto from 'crypto';
import config from '../config/config';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

// Convert the key to Uint8Array
const ENCRYPTION_KEY = new Uint8Array(
  crypto
    .createHash('sha256')
    .update(config.data_encription_key as string)
    .digest(),
);

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const ivArray = new Uint8Array(iv); // Convert iv to Uint8Array

  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, ivArray);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

export const decrypt = (encryptedText: string): string => {
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = new Uint8Array(Buffer.from(ivHex, 'hex')); // Convert iv to Uint8Array

  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
