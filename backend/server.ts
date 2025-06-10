import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import initDB from "./db/db_init";

dotenv.config();
const PORT = process.env.PORT;

// SERVER SINGLETON
const app = express();

// middleware
// JSON - BODY
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, async () => {
  try {
    await initDB();
    console.log(`SERVER IS RUNNING IN ${PORT}`);
  } catch (error: any) {
    console.error(`FAILED TO RUN SERVER ${error.message}`);
  }
});
