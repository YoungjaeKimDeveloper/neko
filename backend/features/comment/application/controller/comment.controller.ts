/*
    Comment Controller
    1. Create Comment
        1.1 Create Notification
    2. Delete Comment  
*/
import { Request, Response } from "express";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import { VerifiedUserRequest } from "../../../post/application/controllers/post.controller";
import NeonCommentRepo from "../../data/neon.comment.repo";
import { errorLog } from "../../../../lib/utils/error/error.log";
import NeonPostRepo from "../../../post/data/neon.post.repo";

// Neon - data layer
const neonPostRepo = new NeonPostRepo();
const neonCommentRepo = new NeonCommentRepo();

export const createComment = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const { content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Nothing to update" });
    }
    // Validation - 0
    const authenticatedUser = (req as VerifiedUserRequest).user;
    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user - Create Comment",
      });
    }
    // Validation - 1
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required - Create comment",
      });
    }
    // Validation - 2
    const postId = req.params.postId;
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post id is required - LikePost" });
    }
    try {
      // Create new Comment
      const result = await neonCommentRepo.createComment({
        content,
        user_id: userId,
        post_id: postId,
      });
      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Failed to create comment - neon Comment",
        });
      }
      // Create a new Comment Successfully
    } catch (error) {
      errorLog({ location: "createComment - neon create Comment", error });
      return res.status(500).json({
        success: false,
        message: "Internal Server Error - create new Comment(neon)",
      });
    }
    // Response
    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
    });
  } catch (error) {
    errorLog({ location: "createComment - controller", error });
    return res.status(500).json({
      success: false,
      message: "Internal Server Error - create new comment controller",
    });
  }
};
// Delete Comment
export const deleteComment = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const authenticatedUser = (req as VerifiedUserRequest).user;
    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user - Create Comment",
      });
    }
    // Validation - 1
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required - Create comment",
      });
    }
    // Validation - 2
    const postId = req.params.postId;
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post id is required - LikePost" });
    }
    // Validation - 3 check if the user is authorized

    const result = await neonPostRepo.fetchSinglePost({ postId: postId });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find the post" });
    }
    if (result.user_id !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - cannot delete the comment",
      });
    }
    const deletedComment = await neonCommentRepo.deleteComment({ id: postId });
    return res.status(200).json({ success: true, message: "Comment Deleted" });
  } catch (error) {
    errorLog({ location: "deleteComment", error });
  }
};
