/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './userRegistration.interface';
import config from '../../config/config';
import bcrypt from 'bcrypt';
import { string } from 'zod';
// import { UpdateQuery } from 'mongoose';

const userSchema = new Schema<TUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: [
        'superAdmin',
        'admin',
        'member',
        'docotr',
        'sponsor',
        'ngo',
        'employer',
        'provider',
      ],
    },
    status: {
      type: String,
      enum: ['Active', 'Block', 'Deleted', 'Suspended'],
      default: 'Active',
    },

    passwordChangedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next: any) {
//   const userDoc = this;

//   //==========> Hash the current password if it exists
//   if (userDoc.password && typeof userDoc.password === 'string') {
//     userDoc.password = await bcrypt.hash(
//       userDoc.password,
//       Number(config.bcrypt_salt_round),
//     );
//   }

//   next();
// });

// Removed 'next' argument
userSchema.pre('save', async function () {
  const userDoc = this as any;

  // Only hash the password if it has been modified (or is new)
  // This prevents double-hashing when updating other user fields
  if (!userDoc.isModified('password')) {
    return;
  }

  if (userDoc.password && typeof userDoc.password === 'string') {
    userDoc.password = await bcrypt.hash(
      userDoc.password,
      Number(config.bcrypt_salt_round),
    );
  }

  // No next() needed here for async functions
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hasPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hasPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
