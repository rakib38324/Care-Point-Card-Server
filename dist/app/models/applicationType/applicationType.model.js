"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationType = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const applicationTypeSchema = new mongoose_1.Schema({
    applicantTitle: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    userRole: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});
exports.ApplicationType = (0, mongoose_1.model)('ApplicationType', applicationTypeSchema);
