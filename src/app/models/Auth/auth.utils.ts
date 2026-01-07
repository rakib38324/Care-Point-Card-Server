/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions, Secret } from 'jsonwebtoken';

// Define your payload type
export type TJwtPayload = {
  email: string;
  name: string;
  role: string;
  _id: string;
};

// Create a JWT token
export const createToken = (
  jwtPayload: TJwtPayload,
  secret: Secret,
  expiresIn: string
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(jwtPayload, secret, options);
};

// Verify a JWT token and return the payload safely
export const VerifyToken = (token: string, secret: Secret): TJwtPayload => {
  const decoded = jwt.verify(token, secret) as JwtPayload;

  // Make sure all fields exist
  if (
    !decoded.email ||
    !decoded.name ||
    !decoded.role ||
    !decoded._id
  ) {
    throw new Error('Invalid token payload');
  }

  return {
    email: decoded.email,
    name: decoded.name,
    role: decoded.role,
    _id: decoded._id,
  };
};
