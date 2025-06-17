/*
    CREATE COMMENT
*/
import { errorLog } from "../../lib/utils/error/error.log";
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
    errorLog({ location: "create Comment Table", error });
    throw new error("Failed to create Comment Table");
  }
}

export default createCommentTable;
