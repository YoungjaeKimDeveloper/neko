"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    POST SCHEMA
    UPDATE
    - 27/06/2025 - update image_url fields
    - PostgreSQL '{}' means [] default array in JS

*/
const error_log_1 = require("../../../shared/error/error.log");
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
async function createPostTable() {
    try {
        await (0, db_1.default) `
            CREATE TABLE IF NOT EXISTS posts(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                image_url TEXT[] DEFAULT '{}',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        // ✅ ADD NEW FIELDS IN THE MIDDLE OF PROCESS
        // await sql`
        //  ALTER TABLE posts
        //  ADD reward_amount INTEGER DEFAULT 0,
        //  ADD location VARCHAR(255) DEFAULT 'Australia',
        //  ADD is_found BOOLEAN DEFAULT false
        //  `;
        // 28/06/2025. change posts column name image_url -> image_urls
        // await sql`
        // ALTER TABLE posts
        // RENAME COLUMN image_url TO image_urls
        // `;
        console.log("POST TABLE CREATED✅");
        // Alert Table
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "create post table", error });
        throw new error("Failed to create post table");
    }
}
exports.default = createPostTable;
