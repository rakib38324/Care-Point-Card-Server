"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = require("../models/Auth/auth.router");
const userRegistration_router_1 = require("../models/UsersRegistration/userRegistration.router");
const contact_router_1 = require("../models/Contact/contact.router");
const router = (0, express_1.Router)();
const moduleRouters = [
    {
        path: '/user',
        route: userRegistration_router_1.userRouter,
    },
    {
        path: '/auth',
        route: auth_router_1.loginRouters,
    },
    {
        path: '/contact',
        route: contact_router_1.contactRouter,
    },
];
moduleRouters.forEach((route) => router.use(route.path, route.route));
exports.default = router;
