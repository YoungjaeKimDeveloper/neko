import { Request, Response } from "express";
import User from "../../../auth/domain/entities/user";
import cloudinary from "../../../../lib/cloudinary/cloudinary.config";
import { CreatePostDTO, UpdatePostDTO } from "../../domain/dto/post.dto";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import NeonPostRepo from "../../data/neon.post.repo";
import { errorLog, errorLogV2 } from "../../../../lib/utils/error/error.log";
import {
  sendResponse,
  sendResponseV2,
} from "../../../../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../../../lib/utils/constants/http-status";
import { RESPONSE_MESSAGES } from "../../../../lib/utils/constants/messages";
/*
    POST API(Hanlder)
    POST DB <----> POST API <----> Frontend
    1.CreatePost 
    2.fetchPostByUserId
    3.update 
    4. delete Post

  -- Needs to create Validation

*/
// Neon Instance
const neonPostRepo = new NeonPostRepo();
export interface VerifiedUserRequest extends Request {
  user: User;
}

export const createPost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    if (!(req as VerifiedUserRequest).user) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    let uploadedImageUrl = "";

    const { title, content, image_url, reward_amount, location } = req.body;
    // Validation - 0
    if (!title || !content || !location) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} `,
      });
    }
    // + image
    if (image_url) {
      try {
        const url = (await cloudinary.uploader.upload(image_url)).secure_url;
        uploadedImageUrl = url;
      } catch (error) {
        errorLogV2({
          file: "post.controller.ts",
          function: "createPost",
          error: error,
        });
        return sendResponseV2({
          res,
          status: RESPONSE_HTTP.INTERNAL,
          success: false,
          details: "Failed to update image",
          message: RESPONSE_MESSAGES.INTERNAL,
        });
      }
    }
    // Follow the interface
    const postDTO: CreatePostDTO = {
      title: title,
      content: content,
      image_url: uploadedImageUrl,
      user_id: userId,
      reward_amount: reward_amount,
      location: location,
    };

    const result = await neonPostRepo.createPost(postDTO);
    if (result == null) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.INTERNAL,
        success: false,
        details: "Failed to creat new post",
        message: `${RESPONSE_MESSAGES.INTERNAL}`,
      });
    }

    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      details: "Post created",
      message: RESPONSE_MESSAGES.CREATE,
    });
  } catch (error) {
    errorLogV2({
      file: "post controller",
      function: "createPost",
      error: error,
    });
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      details: "Internal error in create post",
      message: RESPONSE_MESSAGES.INTERNAL,
    });
  }
};

export const fetchPostsByUserId = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    if (!(req as VerifiedUserRequest).user) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    const result = await neonPostRepo.fetchPostsByUserId({ userId });
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      details: "Posts fetched",
      message: `${RESPONSE_MESSAGES.SUCCESS}`,
      data: result,
    });
  } catch (error) {
    errorLogV2({
      file: "post.controller.ts",
      function: "fetchPostByUserId",
      error: error,
    });
    return res
      .status(500)
      .json({ success: false, message: "Internal ERROR in fetch posts" });
  }
};

export const updatePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    if (!(req as VerifiedUserRequest).user) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        details: "Userid is required to update post.",
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}`,
      });
    }
    const postId = req.params.postId;
    if (!postId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        details: "Postid is required to update post",
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}`,
      });
    }
    const {
      updated_title,
      updated_content,
      updated_imageUrl,
      updated_reward_amount,
      updated_location,
      updated_is_found,
    }: UpdatePostDTO = req.body;
    // Validation - 0 nothing to update
    const atLeastOneUpdateField = Object.values(req.body).some(
      (val) => val != undefined && val !== null && val !== ""
    );
    if (!atLeastOneUpdateField) {
      return sendResponseV2({
        res: res,
        status: 400,
        success: false,
        details:
          "user requested to update the post,but nothing to update - no need to call DB",
        message: `${RESPONSE_HTTP.BAD_REQUEST}`,
      });
    }
    // post
    const result = await neonPostRepo.fetchSinglePost({ postId });
    // Validation - 1
    if (result == null) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        details: "Failed to find the post",
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}`,
      });
    }
    if (result.user_id !== userId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        details: "UNAUTHORIZED TO EDIT THE POST",
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    // New Values
    const { title, content, image_url, reward_amount, location, is_found } =
      result;
    const newTitle = updated_title ?? title;
    const newContent = updated_content ?? content;
    const newImageUrl = updated_imageUrl
      ? (await cloudinary.uploader.upload(updated_imageUrl)).secure_url
      : image_url;
    const newRewardAmount = updated_reward_amount ?? reward_amount;
    const newlLcation = updated_location ?? location;
    const newIsFound = updated_is_found ?? is_found;
    // update result
    const updatedResult = await neonPostRepo.updatePost({
      postId,
      updated_title: newTitle,
      updated_content: newContent,
      updated_imageUrl: newImageUrl,
      updated_reward_amount: newRewardAmount,
      updated_location: newlLcation,
      updated_is_found: newIsFound,
    });
    if (updatedResult == null) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.INTERNAL,
        success: false,
        details: "Failed to update post",
        message: `${RESPONSE_MESSAGES.INTERNAL}`,
      });
    }
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      details: "Post Updated",
      message: `${RESPONSE_MESSAGES.CREATE}`,
      data: updatedResult,
    });
  } catch (error) {
    errorLogV2({
      file: "post.controller.ts",
      function: "UpdatePost",
      error: error,
    });
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      details: "Error in update post",
      message: `${RESPONSE_MESSAGES.INTERNAL}`,
    });
  }
};
// Delete Post
export const deletePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    // verify user
    if (!(req as VerifiedUserRequest).user) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        details: "Invalid user",
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    const postId = req.params.postId;
    // console.log("postid", postId);
    // Validation - Check if there is postId

    if (!postId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        details: "Postid is required to delete it",
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}`,
      });
    }

    const result = await neonPostRepo.fetchSinglePost({ postId });
    // Validation - Check if there is a single post

    // console.log("Fetched result", result);
    if (result == null) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        details: "Failed to fetch the post from neonPostRepo",
        message: `${RESPONSE_MESSAGES.NOT_FOUND}`,
      });
    }
    // Validation - 1
    if (result.user_id !== userId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        details: "Unauthorized to edit the post",
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    //
    // console.log("PASSED TILL HERE");
    await neonPostRepo.deletePost({ postId });
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      details: "Post deleted successfully",
      message: `${RESPONSE_MESSAGES.SUCCESS}`,
    });
  } catch (error) {
    errorLog({ location: "delete", error: error });
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      details: "Internal error to delete post",
      message: `${RESPONSE_MESSAGES.INTERNAL}`,
    });
  }
};
