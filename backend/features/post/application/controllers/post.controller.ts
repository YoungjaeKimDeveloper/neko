import { Request, Response } from "express";
import User from "../../../auth/domain/entities/user";
import cloudinary from "../../../../lib/cloudinary/cloudinary.config";
import {
  CreatePostDTO,
  UpdatePostDTO,
} from "../../../../../shared/dto/post/post.dto";
import { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import NeonPostRepo from "../../data/neon.post.repo";
import { errorLog, errorLogV2 } from "../../../../../shared/error/error.log";
import {
  sendResponse,
  sendResponseV2,
} from "../../../../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../../../../shared/constants/http-status";
import { RESPONSE_MESSAGES } from "../../../../lib/utils/constants/messages";
/*
    POST API(Hanlder)
    Neon <----> POST API <----> Frontend
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
    // 1. Verify User
    if (!(req as VerifiedUserRequest).user) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    // 2. Extract the data from user
    const { title, content, image_urls, reward_amount, location } = req.body;
    // 3. Validation
    // Validation - 0
    if (
      !title ||
      !content ||
      !location ||
      !Array.isArray(image_urls) ||
      image_urls.length == 0
    ) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} `,
      });
    }
    // ✅ ---Add Image to Cloudinary
    // Variable for saving uploaded url
    let uploadedImageUrls: string[] = [];
    // Save image_urls to uploadedImageUrl array
    try {
      // Images are uploaded in parallel for better..
      uploadedImageUrls = await Promise.all(
        image_urls.map(async (base64: string) => {
          const result = await cloudinary.uploader.upload(base64);
          return result.secure_url;
        })
      );
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

    // Check DTO
    const postDTO: CreatePostDTO = {
      title: title,
      content: content,
      image_urls: uploadedImageUrls,
      user_id: userId,
      reward_amount: reward_amount,
      location: location,
    };
    // Send the data to Neon
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
      status: RESPONSE_HTTP.CREATED,
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
    // 1. Validation - AuthUser
    if (!(req as VerifiedUserRequest).user) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    // 2. Validation - User
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
    // 3. Validation - Post
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
    // Extract the data from user Request
    const {
      updated_title,
      updated_content,
      updated_image_urls,
      updated_reward_amount,
      updated_location,
      updated_is_found,
    }: UpdatePostDTO = req.body;

    // ✅ ---Add Image to Cloudinary
    // Variable for saving uploaded url
    const updatedImage: string[] = [];
    // Save image_urls to uploadedImageUrl array
    if (updated_image_urls !== undefined) {
      for (const base64 of updated_image_urls) {
        try {
          const result = await cloudinary.uploader.upload(base64);
          updatedImage.push(result.secure_url);
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
    }
    // Fetch post using sent postId
    const result = await neonPostRepo.fetchSinglePost({ postId });
    // 5.Validation - return false when failed to find the post
    if (result == null) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        details: "Failed to find the post",
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}`,
      });
    }
    // 6.Validation - User is not authorized to edit post
    if (result.user_id !== userId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        details: "UNAUTHORIZED TO EDIT THE POST",
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }

    // previous values
    const { title, content, image_urls, reward_amount, location, is_found } =
      result;
    const newTitle = updated_title ?? title;
    const newContent = updated_content ?? content;
    const newImageUrl = updated_image_urls ? updatedImage : image_urls;
    const newRewardAmount = updated_reward_amount ?? reward_amount;
    const newlLcation = updated_location ?? location;
    const newIsFound = updated_is_found ?? is_found;
    // Update the values to NEon
    const updatedResult = await neonPostRepo.updatePost({
      postId,
      updated_title: newTitle,
      updated_content: newContent,
      updated_image_urls: newImageUrl,
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
    // Succeed in updating post
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      details: "Post Updated",
      message: `${RESPONSE_MESSAGES.UPDATE}`,
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
// fetch single post
export const fetchSinglePost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  const postId = req.params.postId;
  console.debug("PostID", postId);
  try {
    // Validation - Authuser
    if (!(req as VerifiedUserRequest).user) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        details: "Invalid user",
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const result = await neonPostRepo.fetchSinglePost({ postId });
    // 5.Validation - find post
    if (result == null) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        details: "Failed to find the post",
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}`,
      });
    }
    // 5.Validation - User is not authorized to edit post
    return sendResponseV2({
      res: res,
      success: true,
      status: RESPONSE_HTTP.OK,
      message: "Single post fetched successfully",
      data: result,
    });
  } catch (error) {
    return errorLogV2({
      file: "post.controller.ts",
      function: "fetch single post",
      error: error,
    });
  }
};
// fetch All posts
export const fetchAllPosts = async (
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
    const result = await neonPostRepo.fetchAllPosts();
    return res.status(200).json({
      success: true,
      message: "fetch all posts successfully",
      data: result,
    });
  } catch (error) {
    errorLogV2({
      error,
      function: "fetchAllPosts",
      file: "post.controller.ts",
    });
    return sendResponseV2({
      res: res,
      status: 500,
      success: false,
      message: "Failed to fetch all posts",
      details: "Internal error to fetch all posts",
    });
  }
};
// fetch SinglePostWithComments
export const fetchSinglePostWithComments = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const postId = req.params.postId;
    // Validation - Verify User
    if (!(req as VerifiedUserRequest).user) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    if (!postId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        message: "POST ID IS REQUIRED TO FETCH 'singlePostWithComments'",
        success: false,
        data: null,
      });
    }
    const result = await neonPostRepo.fetchSinglePostWithComments({ postId });
    return sendResponseV2({
      res: res,
      status: RESPONSE_HTTP.OK,
      message: "FetchSinglePostWithComments successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    errorLogV2({
      error: error,
      function: "singlePostWithComments",
      file: "post.controller.ts",
    });
  }
};
