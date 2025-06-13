import express from "express";
import { createPost } from "../controllers/post.controller";
/*
 - Express is singleton but rotuer is not single

 Post Router
 1.create
 2.fetchPostByUserId
 3.updatePost
 4.deletePost
*/

import { Express } from "express";
import { verifyToken } from "../../../../middleware/verifyAuth";

const postRouter = express.Router();

// create
postRouter.post("/post", verifyToken, createPost);

// fetchPostByUserId

// updatePost

// deletePost

export default postRouter;
