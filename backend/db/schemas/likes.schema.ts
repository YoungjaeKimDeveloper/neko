import sql from "../config/db";

async function createLikeTable() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS likes(
            user_id uuid REFERENCES users(id),
            post_id uuid REFERENCES posts(id),
            PRIMARY KEY (user_id,post_id)
        )        
    `;
    console.log("LIKES TABLE CREATED✅");
  } catch (error: any) {
    console.error("FAILED TO CREATE USER TABLE MESSAGE: ", error.message);
    console.error("FAILED TO CREATE USER TABLE Trace :", error.stack);
  }
}

export default createLikeTable;
