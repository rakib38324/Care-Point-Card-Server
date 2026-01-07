/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  _id: string;
  email: string;
  password: string;
  verified: boolean;
  role:
    | 'superAdmin'
    | 'admin'
    | 'member'
    | 'docotr'
    | 'sponsor'
    | 'ngo'
    | 'employer'
    | 'provider';
  status: 'Active' | 'Block' | 'Deleted' | 'Suspended';
  passwordChangedAt?: Date;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hasPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
