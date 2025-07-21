"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_log_1 = require("../../../shared/error/error.log");
const db_1 = __importDefault(require("../config/db"));
async function createLikeTable() {
    try {
        await (0, db_1.default) `
        CREATE TABLE IF NOT EXISTS likes(
            user_id uuid REFERENCES users(id) ON DELETE CASCADE,
            post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
            PRIMARY KEY (user_id,post_id)
        )        
    `;
        console.log("LIKES TABLE CREATED✅");
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "create like table", error });
        throw new Error("Failed to create comment like table");
    }
}
exports.default = createLikeTable;
