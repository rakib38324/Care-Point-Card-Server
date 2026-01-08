import { Router } from 'express';
import { loginRouters } from '../models/Auth/auth.router';
import { userRouter } from '../models/UsersRegistration/userRegistration.router';
import { contactRouter } from '../models/Contact/contact.router';
import { memberRouters } from '../models/memberApplications/memberApplications.router';
import { USER_ROLE } from '../models/UsersRegistration/user.constent';

const router = Router();

const moduleRouters = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/auth',
    route: loginRouters,
  },
  {
    path: '/contact',
    route: contactRouter,
  },
  {
    path: `/${USER_ROLE.member}`,
    route: memberRouters,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));
export default router;
