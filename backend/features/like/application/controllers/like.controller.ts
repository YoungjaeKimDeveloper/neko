/*
    Like Controller
        1.Like Post
        2.Unlike Post
        3. Notification Insert
*/
import { Request, Response } from "express";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import { VerifiedUserRequest } from "../../../post/application/controllers/post.controller";
import NeonLikeRepo from "../../data/neon.like.repo";
import { errorLog } from "../../../../lib/utils/error/error.log";
import NeonPostRepo from "../../../post/data/neon.post.repo";
import NeonNotificationRepo from "../../../notification/data/neon.notification.repo";
import { NotificationType } from "../../../notification/domain/entity/notification";

// Neon Instance
const neonLikeRepo = new NeonLikeRepo();
const neonPostRepo = new NeonPostRepo();
const neonNotificationRepo = new NeonNotificationRepo();
// Like the Post
export const likePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const authenticatedUser = (req as VerifiedUserRequest).user;
    if (!authenticatedUser) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user - LikePost" });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required - LikePost" });
    }
    const postId = req.params.postId;
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post id is required - LikePost" });
    }

    const result = await neonLikeRepo.likePost({
      user_id: userId,
      post_id: postId,
    });
    if (!result || result == null) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to like the post" });
    }

    const post = await neonPostRepo.fetchSinglePost({ postId });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find the post" });
    } // Create Notification
    try {
      if (post.user_id !== userId) {
        const result = await neonNotificationRepo.createNotification({
          type: NotificationType.like,
          user_id: post.user_id,
          related_user_id: userId,
          related_post_id: postId,
        });
        if (result != null || !result) {
          console.error("Failed to create notification - Like Post");
        }
      }
      console.log("Notification created - like post");
    } catch (error) {
      errorLog({ location: "Like Post", error: error });
    }
    return res
      .status(201)
      .json({ success: true, message: "Liked Successfully" });
  } catch (error) {
    errorLog({ location: "LikePost", error });
    return res
      .status(500)
      .json({ success: false, message: "Internal ERROR in Like Post" });
  }
};

// Like the Post
export const unLikePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const authenticatedUser = (req as VerifiedUserRequest).user;
    if (!authenticatedUser) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user - unLikePost" });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required - unLikePost" });
    }
    const postId = req.params.postId;
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post id is required - unLikePost" });
    }
    const result = await neonLikeRepo.unLikePost({
      user_id: userId,
      post_id: postId,
    });
    if (!result || result == null) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to unlike the post" });
    }
    return res
      .status(201)
      .json({ success: true, message: "unLiked Successfully" });
  } catch (error) {
    errorLog({ location: "LikePost", error });
    return res
      .status(500)
      .json({ success: false, message: "Internal ERROR in Like Post" });
  }
};
