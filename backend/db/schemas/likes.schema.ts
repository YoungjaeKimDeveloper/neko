import sql from "../config/db";

async function createLikeTable() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS likes(
            id uuid PRIMARY KEY DEFAULT gen_random_uuid() ,
            user_id uuid UNIQUE REFERENCES users(id),
            post_id uuid UNIQUE REFERENCES posts(id)
        )        
    `;
    console.log("LIKES TABLE CREATED✅");
  } catch (error: any) {
    console.error("FAILED TO CREATE USER TABLE MESSAGE: ", error.message);
    console.error("FAILED TO CREATE USER TABLE Trace :", error.stack);
  }
}

export default createLikeTable;
