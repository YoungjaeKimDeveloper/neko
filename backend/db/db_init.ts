import createCommentTable from "./schema/comment_scheme";
import createPostTable from "./schema/post_schema";
import createUserTable from "./schema/user_schema";

async function initDB() {
  try {
    await createUserTable();
    await createPostTable();
    await createCommentTable();
    console.log("DB_INIT✅");
  } catch (error: any) {
    console.error("FAILED TO DB_INIT❌", error.message);
  }
}

export default initDB;
