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

import { verifyToken } from "../../../../middleware/verifyAuth";

const postRouter = express.Router();
postRouter.use(verifyToken);
// create
postRouter.post("/create-new-post", createPost);
// fetchPostByUserId
postRouter.get("/fetch-posts-by-userId", createPost);
// updatePost
postRouter.put("/update/:postId")
// deletePost

export default postRouter;
