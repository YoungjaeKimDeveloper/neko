"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.deleteToken = exports.issueAuthToken = exports.createUser = void 0;
// External
const bcrypt_1 = __importDefault(require("bcrypt"));
// Internal
const auth_neon_repo_1 = __importDefault(require("../../data/auth.neon.repo"));
const generateToken_1 = require("../token/generateToken");
const auth_validation_1 = require("../validations/auth.validation");
const response_helper_1 = require("../../../../lib/utils/response/helper/response.helper");
const http_status_1 = require("../../../../../shared/constants/http-status");
const messages_1 = require("./../../../../lib/utils/constants/messages");
const error_log_1 = require("../../../../../shared/error/error.log");
const authNeonRepo = new auth_neon_repo_1.default();
// <params,res,request,query>
const createUser = async (req, res) => {
    try {
        // email,password,user_name
        const { email, password, userName: user_name } = req.body;
        // Validation - 0
        if (!email || !password || !user_name) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `Please fill all  required form`,
            });
        }
        // Validation - 1
        const isValidPassword = (0, auth_validation_1.passwordValidation)(password);
        if (!isValidPassword) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `Password should be at least 6 characters`,
            });
        }
        // Validation - 2
        const existedEmail = await (0, auth_validation_1.emailValidation)(email);
        if (existedEmail) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: "Email already exists. Please use a different one.",
            });
        }
        // Validation - 3
        const existedUsername = await (0, auth_validation_1.usernameValidation)(user_name);
        if (existedUsername) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: "Username already exists. Please use a different one.",
            });
        }
        // CREATE NEW USER
        // 1.Hash Password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await authNeonRepo.signUp(email, hashedPassword, user_name);
        if (!newUser) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `Server error to hash passwod`,
            });
        }
        // 2.Create token
        const token = (0, generateToken_1.generateToken)(newUser.email);
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.CREATED,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.CREATE} `,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "create new user controller", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} `,
        });
    }
};
exports.createUser = createUser;
// login
const issueAuthToken = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation - 0
        if (!email || !password) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: "Email and Password required",
            });
        }
        const authUser = await authNeonRepo.login(email, password);
        if (authUser == null) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: "Please double-check ID and PW",
            });
        }
        const token = (0, generateToken_1.generateToken)(email);
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.OK,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.SUCCESS} user Login`,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "Login controller", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: "Server error -500",
        });
    }
};
exports.issueAuthToken = issueAuthToken;
// logout
const deleteToken = async (req, res) => {
    res.clearCookie("authToken");
    return (0, response_helper_1.sendResponse)({
        res: res,
        status: http_status_1.RESPONSE_HTTP.OK,
        success: true,
        message: `${messages_1.RESPONSE_MESSAGES.SUCCESS} token deleted`,
    });
};
exports.deleteToken = deleteToken;
//getCurrentUser
const getCurrentUser = async (req, res) => {
    return res.json(req.user);
};
exports.getCurrentUser = getCurrentUser;
