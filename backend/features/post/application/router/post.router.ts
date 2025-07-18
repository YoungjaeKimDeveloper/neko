import express from "express";
import {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPostsByUserId,
  fetchSinglePost,
  fetchSinglePostWithComments,
  updatePost,
  fetchFoundPosts,
  fetchMissingPosts,
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
// fetch found post
postRouter.get("/found", fetchFoundPosts);
// fetch missing post
postRouter.get("/missing", fetchMissingPosts);
// fetch single post with postID - (update post - fetch existed Info)
postRouter.get("/:postId", fetchSinglePost);
// fetch single post with comments - (full information)
postRouter.get("/:postId/full", fetchSinglePostWithComments);

export default postRouter;
