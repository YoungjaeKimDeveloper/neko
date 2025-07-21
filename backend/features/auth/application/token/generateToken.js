"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
/*

  Generate Token

*/
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (email) => {
    const jwtKey = process.env.JWT_SECRET;
    if (jwtKey == null) {
        throw new Error("JWT_SECRENT IS NOT EXISTED");
    }
    const token = jsonwebtoken_1.default.sign({ email: email }, jwtKey, {
        expiresIn: "3d",
    });
    return token;
};
exports.generateToken = generateToken;
