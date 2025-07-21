"use strict";
/*
    USER SCHEMA
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_log_1 = require("../../../shared/error/error.log");
const db_1 = __importDefault(require("../config/db"));
async function createUserTable() {
    try {
        await (0, db_1.default) `
      CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        password  VARCHAR(255) NOT NULL,
        user_name  VARCHAR(255) UNIQUE NOT NULL,
        user_profile_image VARCHAR(255),
        location VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
        console.log("USERS TABLE CREATED✅");
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "create user table", error });
        throw new error("Failed to create user table");
    }
}
exports.default = createUserTable;
