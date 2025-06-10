import createCommentTable from "./schemas/comments.chema";
import createLikeTable from "./schemas/likes.schema";
import createPostTable from "./schemas/posts.schema";
import createUserTable from "./schemas/users.schema";

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
