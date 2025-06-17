/*
    USER SCHEMA     
*/

import { errorLog } from "../../lib/utils/error/error.log";
import sql from "../config/db";

async function createUserTable() {
  try {
    await sql`
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
  } catch (error: any) {
    errorLog({ location: "create user table", error });
    throw new error("Failed to create user table");
  }
}

export default createUserTable;
