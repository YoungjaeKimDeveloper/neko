/*

    Comment Router

*/

import express from "express";
import { createComment, deleteComment } from "../controller/comment.controller";
import { verifyToken } from "../../../../middleware/verifyAuth";
const router = express.Router();
router.use(verifyToken);
// creat
router.post("/posts/:postId", createComment);
// delete
router.delete("/posts/:postId/comments/:commentId", deleteComment);

export default router;
