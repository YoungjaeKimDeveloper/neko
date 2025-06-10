/*
    CREATE COMMENT
*/
import sql from "../config/db";

async function createCommentTable() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS comments(
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        content varchar(255),
        created_at TIMESTAMP WITH TIME ZONE,
        user_id uuid REFERENCES users(id),
        post_id uuid REFERENCES posts(id)
    )
    `;
    console.log("Comment TABLE CREATED✅");
  } catch (error: any) {
    console.error("FAILED TO CREATE Comment TABLE MESSAGE: ", error.message);
    console.error("FAILED TO CREATE Comment TABLE Trace :", error.stack);
  }
}

export default createCommentTable;
