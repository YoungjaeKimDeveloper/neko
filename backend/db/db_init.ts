import createCommentTable from "./schemas/comment_schema";
import createLikeTable from "./schemas/like_schema";
import createPostTable from "./schemas/post_schema";
import createUserTable from "./schemas/user_schema";

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
