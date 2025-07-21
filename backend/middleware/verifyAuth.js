"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db/config/db"));
const response_helper_1 = require("../lib/utils/response/helper/response.helper");
const http_status_1 = require("../../shared/constants/http-status");
const messages_1 = require("../lib/utils/constants/messages");
const error_log_1 = require("../../shared/error/error.log");
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies["authToken"];
        // Validation -1
        if (!token) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED} can't find the token`,
            });
        }
        // Validation -1
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED} can't find the secret key`,
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const userEmail = decoded?.email;
        if (!userEmail) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED} can't find the email`,
            });
        }
        const user = await (0, db_1.default) `
    SELECT id,email,user_name,user_profile_image,location,created_at
    FROM users
    WHERE email = ${userEmail} 
    `;
        if (!user || user.length == 0) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.NOT_FOUND} can't find the user`,
            });
        }
        req.user = user[0];
        next();
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "verify Token", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} verify Token`,
        });
    }
};
exports.verifyToken = verifyToken;
