import { encrypt } from './encryption.utils';

/**
 * Encrypt only provided fields from payload
 */
export const encryptObjectFields = <T extends Record<string, any>>(
  payload: Partial<T>,
  fields: (keyof T)[],
): Partial<T> => {
  const encrypted: Partial<T> = {};

  for (const field of fields) {
    const value = payload[field];

    if (value === undefined || value === null) continue;

    encrypted[field] =
      typeof value === 'string' ? encrypt(value) : (value as any);
  }

  return encrypted;
};
