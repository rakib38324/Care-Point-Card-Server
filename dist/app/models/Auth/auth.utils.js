"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.createToken = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a JWT token
const createToken = (jwtPayload, secret, expiresIn) => {
    const options = {
        expiresIn: expiresIn,
    };
    return jsonwebtoken_1.default.sign(jwtPayload, secret, options);
};
exports.createToken = createToken;
// Verify a JWT token and return the payload safely
const VerifyToken = (token, secret) => {
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    // Make sure all fields exist
    if (!decoded.email || !decoded.role || !decoded._id) {
        throw new Error('Invalid token payload');
    }
    return {
        email: decoded.email,
        role: decoded.role,
        _id: decoded._id,
    };
};
exports.VerifyToken = VerifyToken;
