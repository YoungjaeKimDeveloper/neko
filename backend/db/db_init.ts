import createCommentTable from "./schema/comment_schema";
import createLikeTable from "./schema/like_schema";
import createPostTable from "./schema/post_schema";
import createUserTable from "./schema/user_schema";

async function initDB() {
  try {
    await createUserTable();
    await createPostTable();
    await createCommentTable();
    await createLikeTable();
    console.log("DB_INIT✅");
  } catch (error: any) {
    console.error("FAILED TO DB_INIT❌", error.message);
  }
}

export default initDB;
