/*
    POST SCHEMA     
    UPDATE
    - 27/06/2025 - update image_url fields
    - PostgreSQL '{}' means [] default array in JS

*/
import { errorLog } from "../../../shared/error/error.log";
import sql from "../config/db";
import dotenv from "dotenv";
dotenv.config({});
async function createPostTable() {
  try {
    await sql`
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

    console.log("POST TABLE CREATED✅");
    // Alert Table
  } catch (error: any) {
    errorLog({ location: "create post table", error });
    throw new error("Failed to create post table");
  }
}

export default createPostTable;
