/*

    Comment Router

*/

import express from "express";
import { createComment, deleteComment } from "../controller/comment.controller";
const router = express.Router();

// creat
router.post("/posts/:postId", createComment);
// delete
router.delete("/posts/:postId/comments/:commentId", deleteComment);

export default router;
