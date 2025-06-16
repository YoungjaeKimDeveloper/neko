/*

    Like Router

*/

import express from "express";
import { verifyToken } from "../../../../middleware/verifyAuth";
import { likePost } from "../controllers/like.controller";
const router = express.Router();

// Middleware
router.use(verifyToken);
// Like Post
router.post("/post/:postId", likePost);
// UnLike post
// router.delete("/post/:postId");
export default router;
