import { errorLog } from "../../shared/error/error.log";
import createCommentTable from "./schemas/comments.schema";
import createLikeTable from "./schemas/likes.schema";
import createNotificationTable from "./schemas/notification.schema";
import createPostTable from "./schemas/posts.schema";
import createUserTable from "./schemas/users.schema";

async function initDB() {
  try {
    await createUserTable();
    await createPostTable();
    await createCommentTable();
    await createLikeTable();
    await createNotificationTable();
    console.log("DB_INIT✅");
  } catch (error: any) {
    errorLog({ location: "initDB", error });
    throw new error("Failed to initDB");
  }
}

export default initDB;
