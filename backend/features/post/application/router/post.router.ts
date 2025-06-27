import express from "express";
import {
  createPost,
  deletePost,
  fetchPostsByUserId,
  updatePost,
} from "../controllers/post.controller";
/*
 - Express is singleton but rotuer is not single

 Post Router
 1.create
 2.fetchPostByUserId
 3.updatePost
 4.deletePost
*/

import { verifyToken } from "../../../../middleware/verifyAuth";

const postRouter = express.Router();
postRouter.use(verifyToken);
// create
postRouter.post("/", createPost);
// fetchPostByUserId
postRouter.get("/", fetchPostsByUserId);
// updatePost
postRouter.put("/:postId", updatePost);
// updatePost
postRouter.delete("/:postId", deletePost);
// deletePost

export default postRouter;
