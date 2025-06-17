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
import { sendResponse } from "../../../../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../../../lib/utils/constants/http-status";
import { RESPONSE_MESSAGES } from "../../../../lib/utils/constants/messages";

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
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} nothing to update`,
      });
    }
    // Validation - 0
    const authenticatedUser = (req as VerifiedUserRequest).user;
    if (!authenticatedUser) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} Unauthorized user - create comment`,
      });
    }
    // Validation - 1
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} user id is required - create comment`,
      });
    }
    // Validation - 2
    const postId = req.params.postId;
    if (!postId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} Post id is required - create comment`,
      });
    }

    try {
      // Create new Comment
      const result = await neonCommentRepo.createComment({
        content,
        user_id: userId,
        post_id: postId,
      });
      if (!result) {
        return sendResponse({
          res: res,
          status: RESPONSE_HTTP.INTERNAL,
          success: false,
          message: `${RESPONSE_MESSAGES.INTERNAL} failed to create new comment - neon comment`,
        });
      }

      // Create a new Comment Successfully
    } catch (error) {
      errorLog({ location: "createComment - neon create Comment", error });
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.INTERNAL,
        success: false,
        message: `${RESPONSE_MESSAGES.INTERNAL} failed to create new comment - neon comment`,
      });
    }
    // Response
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.CREATED,
      success: true,
      message: `${RESPONSE_MESSAGES.CREATE} comment created successfully`,
    });
  } catch (error) {
    errorLog({ location: "createComment - controller", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} create new comment controller`,
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
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED} -create comment`,
      });
    }
    // Validation - 1
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} userId is required`,
      });
    }
    // Validation - 2
    const postId = req.params.postId;
    if (!postId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} postid is required`,
      });
    }
    // Validation - 3 check if the user is authorized

    const result = await neonPostRepo.fetchSinglePost({ postId: postId });
    if (!result) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        message: `${RESPONSE_MESSAGES.NOT_FOUND} cannot find the post`,
      });
    }
    if (result.user_id !== userId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED} `,
      });
    }
    const deletedComment = await neonCommentRepo.deleteComment({
      comment_id: postId,
    });
    return res.status(200).json({ success: true, message: "Comment Deleted" });
  } catch (error) {
    errorLog({ location: "deleteComment", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL}`,
    });
  }
};
