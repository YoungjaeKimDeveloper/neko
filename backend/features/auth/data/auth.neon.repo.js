"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
/*
    Implement core logic based on authRepo
    1. Signup
    2. Login
*/
const db_1 = __importDefault(require("../../../db/config/db"));
const error_log_1 = require("../../../../shared/error/error.log");
class AuthNeonRepo {
    constructor() {
        // Signup
        this.signUp = async (email, password, user_name) => {
            try {
                const newUser = await (0, db_1.default) `
        INSERT INTO users(email,password,user_name)
        VALUES (${email},${password},${user_name})
        RETURNING *;
        `;
                return newUser.length > 0 ? newUser[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "neon Signup", error });
                return null;
            }
        };
        //   Login
        this.login = async (email, password) => {
            try {
                const users = await (0, db_1.default) `
        SELECT * 
        FROM users
        WHERE email = ${email} 
        `;
                const user = users.length > 0 ? users[0] : null;
                if (user == null) {
                    return null;
                }
                const isMatch = await bcrypt_1.default.compare(password, user.password);
                return isMatch ? user : null;
            }
            catch (error) {
                return null;
            }
        };
    }
}
exports.default = AuthNeonRepo;
