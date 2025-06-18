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
    let finalResult = "";

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
        finalResult = url;
      } catch (error) {
        return errorLogV2({
          file: "post.controller.ts",
          function: "createPost",
          error: error,
        });
      }
    }
    // Follow the interface
    const postDTO: CreatePostDTO = {
      title: title,
      content: content,
      image_url: finalResult,
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
      return res.status(401).json({ success: false, message: "INVALUD USER" });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    const result = await neonPostRepo.fetchPostsByUserId({ userId });
    return res
      .status(200)
      .json({ success: true, message: "Posts fetched", data: result });
  } catch (error) {
    errorLog({ location: "FetchPosts", error: error });
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
      return res.status(401).json({ success: false, message: "INVALUD USER" });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    const postId = req.params.postId;
    const {
      updated_title,
      updated_content,
      updated_imageUrl,
      updated_reward_amount,
      upDated_location,
      updated_is_found,
    }: UpdatePostDTO = req.body;
    // Validation - 0
    if (!postId || postId == null) {
      return res
        .status(401)
        .json({ success: false, message: "Post Id is required" });
    }

    // post
    const result = await neonPostRepo.fetchSinglePost({ postId });
    // Validation - 1
    if (result == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannof find the post" });
    }
    if (result.user_id !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "UNAUTHORIZED TO EDIT THE POST" });
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
    const newlLcation = upDated_location ?? location;
    const newIsFound = updated_is_found ?? is_found;

    const updatedResult = await neonPostRepo.updatePost({
      postId,
      updated_title: newTitle,
      updated_content: newContent,
      updated_imageUrl: newImageUrl,
      updated_reward_amount: newRewardAmount,
      upDated_location: newlLcation,
      updated_is_found: newIsFound,
    });
    if (updatedResult == null) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update Post" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Post Updated", data: result });
  } catch (error) {
    errorLog({ location: "updatePost", error: error });
    return res
      .status(500)
      .json({ success: false, message: "Error in update Post" });
  }
};
// Delete Post
export const deletePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    if (!(req as VerifiedUserRequest).user) {
      return res.status(401).json({ success: false, message: "INVALUD USER" });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    const postId = req.params.postId;
    // Validation - 0
    if (!postId || postId == null) {
      return res
        .status(401)
        .json({ success: false, message: "Post Id is required" });
    }
    const result = await neonPostRepo.fetchSinglePost({ postId });
    // Validation - 1
    if (result == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find the post" });
    }
    // Validation - 1
    if (result.user_id !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "UNAUTHORIZED TO EDIT THE POST" });
    }
    //
    const deletedResult = await neonPostRepo.deletePost({ postId });
    if (deletedResult == null) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to delete the post" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Post has been deleted" });
  } catch (error) {
    errorLog({ location: "delete", error: error });
    return res
      .status(500)
      .json({ success: false, message: "Error in delet Post" });
  }
};
