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

userSchema.pre('save', async function (next) {
  const user = this;

  //==========> Hash the current password if it exists
  if (user.password && typeof user.password === 'string') {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
  }
});

// userSchema.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate();

//   // Type guard to check if update is of type UpdateQuery
//   if (update && typeof update === 'object' && !Array.isArray(update)) {
//     const updateObj = update as UpdateQuery<any>;

//     // Check if the password field is being updated
//     if (updateObj.password && typeof updateObj.password === 'string') {
//       const hashedPassword = await bcrypt.hash(
//         updateObj.password,
//         Number(config.bcrypt_salt_round),
//       );

//       // Set the hashed password back to the update object
//       updateObj.password = hashedPassword;
//     }
//   }

//   next();
// });

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
