import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import initDB from "./db/db_init";
import cookieParser from "cookie-parser";
import authRouter from "./features/auth/application/routers/auth.router";
import { Request, Response } from "express";
dotenv.config();
const PORT = process.env.PORT || 8000;

// SERVER SINGLETON
const app = express();

// middleware
// JSON - BODY
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// ROUTER SRP

app.use("/api/auth", authRouter);
app.listen(PORT, async () => {
  try {
    await initDB();
    console.log(`SERVER IS RUNNING IN ${PORT}💨`);
  } catch (error: any) {
    console.error(`FAILED TO RUN SERVER ${error.message}❌`);
  }
});
