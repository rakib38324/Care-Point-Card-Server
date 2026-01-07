/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  country: string;
  img?: string;
  verified: boolean;
  role: 'superAdmin' | 'admin' | 'user';
  status: 'Active' | 'Block';
  userType: 'Sponsor' | 'Member';
  passwordChangedAt?: Date;
  subscribetionId?: string;
  sponsorType?: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isUserExistsByUserName(username: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hasPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
