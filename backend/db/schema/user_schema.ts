import dotenv from "dotenv";
import sql from "../config/db";

dotenv.config();

async function user_table() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        user_name VARCHAR(255) UNIQUE,
        user_profile_image VARCHAR(255),
        location VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `;
    console.log("DB CONNECTED✅");
  } catch (error: any) {
    console.error("Failed to connect user_table message: ", error.message);
    console.error("Failed to connect user_table : trace", error.stack);
  }
}

export default user_table;
