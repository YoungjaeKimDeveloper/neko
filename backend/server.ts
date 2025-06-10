import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { neon } from "@neondatabase/serverless";
import initDB from "./db/db_init";

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL IS NOT VALID");
}

const sql = neon(DB_URL);

console.log(DB_URL);
// SERVER SINGLETON
const app = express();

// middleware
// JSON - BODY
app.use(express.json());

app.use(morgan("dev"));

app.listen(PORT, async () => {
  await initDB();
  console.log(`SERVER IS RUNNING IN ${PORT}`);
});
