"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameValidation = exports.emailValidation = exports.passwordValidation = void 0;
/*
    Auth validation
*/
const db_1 = __importDefault(require("../../../../db/config/db"));
const passwordValidation = (password) => {
    return password.trim().length >= 6 ? true : false;
};
exports.passwordValidation = passwordValidation;
const emailValidation = async (email) => {
    const result = await (0, db_1.default) `
    SELECT * 
    FROM users
    WHERE email = ${email} 
    `;
    return result.length > 0 ? true : false;
};
exports.emailValidation = emailValidation;
const usernameValidation = async (user_name) => {
    const result = await (0, db_1.default) `
    SELECT * 
    FROM users
    WHERE user_name = ${user_name} 
    `;
    return result.length > 0 ? true : false;
};
exports.usernameValidation = usernameValidation;
