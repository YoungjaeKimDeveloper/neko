"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

    CAPSULATION DB
    
 */
// db.ts
const serverless_1 = require("@neondatabase/serverless");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL;
if (!DB_URL)
    throw new Error("DB_URL IS NOT VALID");
// INITIATE NEON DB
const sql = (0, serverless_1.neon)(DB_URL);
exports.default = sql;
