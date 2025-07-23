/*
    Like Controller
        1.Like Post
        2.Unlike Post
        3. Notification Insert
*/
import type { Request, Response } from "express";
import { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import { VerifiedUserRequest } from "../../../post/application/controllers/post.controller";
import NeonLikeRepo from "../../data/neon.like.repo";
import { errorLog } from "../../../../../shared/error/error.log";
import NeonPostRepo from "../../../post/data/neon.post.repo";
import NeonNotificationRepo from "../../../notification/data/neon.notification.repo";
import {
  sendResponse,
  sendResponseV2,
} from "../../../../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../../../../shared/constants/http-status";
import { RESPONSE_MESSAGES } from "../../../../lib/utils/constants/messages";


enum NotificationType {
  comment = "COMMENT",
  like = "LIKE",
}
// Neon Instance
const neonLikeRepo = new NeonLikeRepo();
const neonPostRepo = new NeonPostRepo();
const neonNotificationRepo = new NeonNotificationRepo();
// Like the Post
export const likePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  console.log("Frontend called Like?👍🏻");
  console.log("CHECK TYPE", NotificationType);
  try {
    const authenticatedUser = (req as VerifiedUserRequest).user;
    // Validation - 0 Auth User
    if (!authenticatedUser) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED} `,
      });
    }
    // Validation - 1 User id
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} - userid is required`,
      });
    }
    // Validation - 2 Post id
    const postId = req.params.postId;
    if (!postId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} - postId is required`,
      });
    }

    const result = await neonLikeRepo.likePost({
      user_id: userId,
      post_id: postId,
    });

    if (!result) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.INTERNAL,
        success: false,
        message: `${RESPONSE_MESSAGES.INTERNAL}`,
      });
    }
    // fetch Single post and check if the post writer and user are same
    // Validation - 3 fetch single post to crea te notification
    const post = await neonPostRepo.fetchSinglePost({ postId });
    if (!post) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        message: `${RESPONSE_MESSAGES.NOT_FOUND} "cannot find the post`,
      });
    } // Create Notification
    try {
      if (post.user_id !== userId) {
        const result = await neonNotificationRepo.createNotification({
          type: NotificationType.like,
          user_id: post.user_id,
          related_user_id: userId,
          related_post_id: postId,
        });
        if (!result) {
          return sendResponse({
            res: res,
            status: RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${RESPONSE_MESSAGES.INTERNAL} to update Like`,
          });
        }
      }
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.CREATED,
        success: true,
        message: "Like post and notification has been created successfully",
      });
    } catch (error) {
      errorLog({ location: "Like Post", error: error });
    }
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.CREATED,
      success: true,
      message: `${RESPONSE_MESSAGES.CREATE}`,
    });
  } catch (error) {
    errorLog({ location: "LikePost", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL}`,
    });
  }
};

// Like the Post
export const unLikePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  console.log("Frontend called unLike?👎");
  try {
    const authenticatedUser = (req as VerifiedUserRequest).user;
    if (!authenticatedUser) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED} "unlike post"`,
      });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} userid is required - unlikepost `,
      });
    }
    const postId = req.params.postId;
    if (!postId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} - postId is required - unlikepost`,
      });
    }
    const result = await neonLikeRepo.unLikePost({
      user_id: userId,
      post_id: postId,
    });
    if (!result) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        message: `${RESPONSE_MESSAGES.NOT_FOUND} failed to unlike post`,
      });
    }
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.CREATED,
      success: true,
      message: `${RESPONSE_MESSAGES.SUCCESS} unliked post successfully`,
    });
  } catch (error) {
    errorLog({ location: "LikePost", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} - unlike post`,
    });
  }
};
