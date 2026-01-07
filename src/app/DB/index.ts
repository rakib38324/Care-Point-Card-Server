import config from '../config/config';
import { USER_ROLE } from '../models/UsersRegistration/user.constent';
import { User } from '../models/UsersRegistration/userRegistration.model';

const superUser = {
  firstName: 'You are Supper',
  lastName: 'Admin',
  phone: '+880123456789',
  email: 'admin12@gmail.com',
  password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
  verified: true,
  userType: 'Member',
  status: 'Active',
  address: 'ABC DEF, City, Country.',
};

const seedSuperAdmin = async () => {
  // when database is connected, we will check is there any user who is super admin
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
