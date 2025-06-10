import user_table from "./schema/user_schema";

async function initDB() {
  try {
    await user_table();
    console.log("DB_INIT✅");
  } catch (error: any) {
    console.error("FAILED TO DB_INIT❌", error.message);
  }
}

export default initDB;
