/*
    CREATE COMMENT
*/
import { errorLog } from "../../../shared/error/error.log";
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
    // Table Update 30/06/2025
    // await sql`
    // ALTER TABLE comments
    // ALTER COLUMN created_at SET DEFAULT now()
    // `;

    // 04/07/2025 - UPDATE CONSTRAINT
    // Table Update to implement deleting post
    // 1. DROP PREVIOUS CONSTRAINT
    // await sql`
    // ALTER TABLE comments
    // DROP CONSTRAINT comments_post_id_fkey;
    // `;

    // // 2. ADD NEW CONSTRAINT - ON DELETE CASCADE
    // await sql`
    // ALTER TABLE comments
    // ADD CONSTRAINT fk_comments_post_id
    // FOREIGN KEY (post_id)
    // REFERENCES posts(id)
    // ON DELETE CASCADE;
    // `;
    
    console.log("Comment TABLE CREATED✅");
  } catch (error: any) {
    errorLog({ location: "create Comment Table", error });
    throw new Error("Failed to create Comment Table");
  }
}

export default createCommentTable;
