import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  console.error("DB_URL IS NOT VALID❗️");
  throw new Error("DB_URL IS NOT VALID");
}

const sql = neon(DB_URL);

async function user_table() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user(
        id UUID PRIMARY KEY gen_random_uuid(),
        email VARCHAR(255),
        password VARCHAR(255),
        user_name VARCHAR(255),
        user_profile_image VARCHAR(255),
        location VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
    console.log("DB CONNECTED✅");
  } catch (error: any) {
    console.error("Failed to connect user_table", error.message);
  }
}

export default user_table;
