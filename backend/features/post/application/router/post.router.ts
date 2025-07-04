import express from "express";
import {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPostsByUserId,
  fetchSinglePost,
  fetchSinglePostWithComments,
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
// deletePost
postRouter.delete("/:postId", deletePost);

// fetch Allposts
postRouter.get("/all", fetchAllPosts);
// fetch single post
postRouter.get("/:postId", fetchSinglePostWithComments);

export default postRouter;
