/*
    POST SCHEMA     
*/
import sql from "../config/db";

async function createPostTable() {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS posts(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                image_url TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE
            )
        `;
    console.log("POST TABLE CREATED✅");
  } catch (error: any) {
    console.error("FAILED TO CREATE POST TABLE MESSAGE: ", error.message);
    console.error("FAILED TO CREATE POST TABLE Trace :", error.stack);
  }
}

export default createPostTable;
