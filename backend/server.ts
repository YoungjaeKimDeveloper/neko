/*

  RESTful API
  Representational + State + Transfer
  API : Application Programming Interface
  All resources should be plural 
  
 */
// External library
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
// Internal modules
import initDB from "./db/db_init";
// Internal Routers
import authRouter from "./features/auth/application/router/auth.router";
import postRouter from "./features/post/application/router/post.router";
import notificationRouter from "./features/notification/application/router/notification.router";
import likeRouter from "./features/like/application/routers/like.router";
import commentRouter from "./features/comment/application/router/comment.router";
import profileRouter from "./features/profile/application/router/profile.router";

dotenv.config();
const PORT = process.env.PORT || 8011;

// SERVER SINGLETON
const app = express();

// middleware

// JSON - BODY
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// Todo - fix it later
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

// ROUTER SRP
// auth
app.use("/api/auth", authRouter);
// post
app.use("/api/posts", postRouter);
// notification
app.use("/api/notifications", notificationRouter);
// like
app.use("/api/likes", likeRouter);
// comment
app.use("/api/comments", commentRouter);
// comment
app.use("/api/profile", profileRouter);
// Server
app.listen(PORT, async () => {
  try {
    await initDB();
    console.log(`SERVER IS RUNNING IN ${PORT}💨`);
  } catch (error: any) {
    console.error(`FAILED TO RUN SERVER ${error.message}❌`);
  }
});
