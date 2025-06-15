// External library
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// Internal modules
import initDB from "./db/db_init";
// Internal Routers
import authRouter from "./features/auth/application/router/auth.router";
import postRouter from "./features/post/application/router/post.router";
import notificationRouter from "./features/notification/application/router/notification.router";
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
// auth
app.use("/api/auth", authRouter);
// post
app.use("/api/post", postRouter);
// notification
app.use("/api/notification", notificationRouter);
// Server
app.listen(PORT, async () => {
  try {
    await initDB();
    console.log(`SERVER IS RUNNING IN ${PORT}💨`);
  } catch (error: any) {
    console.error(`FAILED TO RUN SERVER ${error.message}❌`);
  }
});
