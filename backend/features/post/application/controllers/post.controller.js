"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSinglePostWithComments = exports.fetchMissingPosts = exports.fetchFoundPosts = exports.fetchAllPosts = exports.fetchSinglePost = exports.deletePost = exports.updatePost = exports.fetchPostsByUserId = exports.createPost = void 0;
const cloudinary_config_1 = __importDefault(require("../../../../lib/cloudinary/cloudinary.config"));
const neon_post_repo_1 = __importDefault(require("../../data/neon.post.repo"));
const error_log_1 = require("../../../../../shared/error/error.log");
const response_helper_1 = require("../../../../lib/utils/response/helper/response.helper");
const http_status_1 = require("../../../../../shared/constants/http-status");
const messages_1 = require("../../../../lib/utils/constants/messages");
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
const neonPostRepo = new neon_post_repo_1.default();
const createPost = async (req, res) => {
    try {
        // 1. Verify User
        if (!req.user) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: "Unauthorized user",
            });
        }
        const userId = req.user.id;
        // 2. Extract the data from user
        const { title, content, image_urls, reward_amount, location } = req.body;
        // 3. Validation
        // Validation - 0
        if (!title ||
            !content ||
            !location ||
            !Array.isArray(image_urls) ||
            image_urls.length == 0) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: "title,content,location, and at least one image are required",
            });
        }
        // ✅ ---Add Image to Cloudinary
        // Variable for saving uploaded url
        let uploadedImageUrls = [];
        // Save image_urls to uploadedImageUrl array
        try {
            // Images are uploaded in parallel for better performance
            uploadedImageUrls = await Promise.all(image_urls.map(async (base64) => {
                const result = await cloudinary_config_1.default.uploader.upload(base64);
                return result.secure_url;
            }));
        }
        catch (error) {
            (0, error_log_1.errorLogV2)({
                file: "post.controller.ts",
                function: "createPost - upload pictures to cloudinary",
                error: error,
            });
            return (0, response_helper_1.sendResponseV2)({
                res,
                status: http_status_1.RESPONSE_HTTP.INTERNAL,
                success: false,
                details: "Failed to upload images to. cloudinary",
                message: "Failed to upload images to. cloudinary",
            });
        }
        // Formatted Data
        const postDTO = {
            title: title,
            content: content,
            image_urls: uploadedImageUrls,
            user_id: userId,
            reward_amount: reward_amount,
            location: location,
        };
        // Send the data to Neon(SQL)
        const result = await neonPostRepo.createPost(postDTO);
        if (result == null) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.INTERNAL,
                success: false,
                details: "Failed to creat new post",
                message: `${messages_1.RESPONSE_MESSAGES.INTERNAL}`,
            });
        }
        // Succeed in creating new post
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.CREATED,
            success: true,
            details: "Post created",
            message: messages_1.RESPONSE_MESSAGES.CREATE,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            file: "post controller",
            function: "createPost",
            error: error,
        });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            details: "Internal error in create post",
            message: messages_1.RESPONSE_MESSAGES.INTERNAL,
        });
    }
};
exports.createPost = createPost;
const fetchPostsByUserId = async (req, res) => {
    try {
        if (!req.user) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const userId = req.user.id;
        const result = await neonPostRepo.fetchPostsByUserId({ userId });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.OK,
            success: true,
            details: "Posts fetched",
            message: `${messages_1.RESPONSE_MESSAGES.SUCCESS}`,
            data: result,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            file: "post.controller.ts",
            function: "fetchPostByUserId",
            error: error,
        });
        return res
            .status(500)
            .json({ success: false, message: "Internal ERROR in fetch posts" });
    }
};
exports.fetchPostsByUserId = fetchPostsByUserId;
const updatePost = async (req, res) => {
    try {
        // 1. Validation - AuthUser
        if (!req.user) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        // 2. Validation - User
        const userId = req.user.id;
        if (!userId) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                details: "Userid is required to update post.",
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST}`,
            });
        }
        // 3. Validation - Post
        const postId = req.params.postId;
        if (!postId) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                details: "Postid is required to update post",
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST}`,
            });
        }
        // Extract the data from user Request
        const { updated_title, updated_content, updated_image_urls, updated_reward_amount, updated_location, updated_is_found, } = req.body;
        // ✅ ---Add Image to Cloudinary
        // Variable for saving uploaded url
        // const updatedImage: string[] = [];
        // Save image_urls to uploadedImageUrl array
        // if (updated_image_urls !== undefined) {
        //   for (const base64 of updated_image_urls) {
        //     try {
        //       const result = await cloudinary.uploader.upload(base64);
        //       updatedImage.push(result.secure_url);
        //     } catch (error) {
        //       errorLogV2({
        //         file: "post.controller.ts",
        //         function: "createPost",
        //         error: error,
        //       });
        //       return sendResponseV2({
        //         res,
        //         status: RESPONSE_HTTP.INTERNAL,
        //         success: false,
        //         details: "Failed to update image",
        //         message: RESPONSE_MESSAGES.INTERNAL,
        //       });
        //     }
        //   }
        // }
        // Fetch post using sent postId
        const result = await neonPostRepo.fetchSinglePost({ postId });
        // 5.Validation - return false when failed to find the post
        if (result == null) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                details: "Failed to find the post",
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST}`,
            });
        }
        // 6.Validation - User is not authorized to edit post
        if (result.user_id !== userId) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                details: "UNAUTHORIZED TO EDIT THE POST",
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        // previous values
        const { title, content, image_urls, reward_amount, location, is_found } = result;
        const newTitle = updated_title ?? title;
        const newContent = updated_content ?? content;
        const newImageUrl = updated_image_urls;
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
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.INTERNAL,
                success: false,
                details: "Failed to update post",
                message: `${messages_1.RESPONSE_MESSAGES.INTERNAL}`,
            });
        }
        // Succeed in updating post
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.OK,
            success: true,
            details: "Post Updated",
            message: `${messages_1.RESPONSE_MESSAGES.UPDATE}`,
            data: updatedResult,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            file: "post.controller.ts",
            function: "UpdatePost",
            error: error,
        });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            details: "Error in update post",
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL}`,
        });
    }
};
exports.updatePost = updatePost;
// Delete Post
const deletePost = async (req, res) => {
    try {
        // verify user
        if (!req.user) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                details: "Invalid user",
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const userId = req.user.id;
        const postId = req.params.postId;
        // Validation - Check if there is postId
        if (!postId) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                details: "Postid is required to delete it",
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST}`,
            });
        }
        const result = await neonPostRepo.fetchSinglePost({ postId });
        // Validation - Check if there is a single post
        if (result == null) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                details: "Failed to fetch the post from neonPostRepo",
                message: `${messages_1.RESPONSE_MESSAGES.NOT_FOUND}`,
            });
        }
        // Validation - 1
        if (result.user_id !== userId) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                details: "Unauthorized to edit the post",
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        //
        await neonPostRepo.deletePost({ postId });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.OK,
            success: true,
            details: "Post deleted successfully",
            message: `${messages_1.RESPONSE_MESSAGES.SUCCESS}`,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "delete", error: error });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            details: "Internal error to delete post",
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL}`,
        });
    }
};
exports.deletePost = deletePost;
// fetch single post
const fetchSinglePost = async (req, res) => {
    const postId = req.params.postId;
    console.debug("PostID", postId);
    try {
        // Validation - Authuser
        if (!req.user) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                details: "Invalid user",
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const result = await neonPostRepo.fetchSinglePost({ postId });
        // 5.Validation - find post
        if (result == null) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                details: "Failed to find the post",
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST}`,
            });
        }
        // 5.Validation - User is not authorized to edit post
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            success: true,
            status: http_status_1.RESPONSE_HTTP.OK,
            message: "Single post fetched successfully",
            data: result,
        });
    }
    catch (error) {
        return (0, error_log_1.errorLogV2)({
            file: "post.controller.ts",
            function: "fetch single post",
            error: error,
        });
    }
};
exports.fetchSinglePost = fetchSinglePost;
// fetch All posts
const fetchAllPosts = async (req, res) => {
    try {
        // verify user
        if (!req.user) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                details: "Invalid user",
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const result = await neonPostRepo.fetchAllPosts();
        return res.status(200).json({
            success: true,
            message: "fetch all posts successfully",
            data: result,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            error,
            function: "fetchAllPosts",
            file: "post.controller.ts",
        });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: 500,
            success: false,
            message: "Failed to fetch all posts",
            details: "Internal error to fetch all posts",
        });
    }
};
exports.fetchAllPosts = fetchAllPosts;
// fetch All posts
const fetchFoundPosts = async (req, res) => {
    console.log("You called me anyway");
    try {
        // verify user
        if (!req.user) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                details: "Invalid user",
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const result = await neonPostRepo.fetchFoundPosts();
        return res.status(200).json({
            success: true,
            message: "fetch all posts successfully",
            data: result,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            error,
            function: "fetchAllPosts",
            file: "post.controller.ts",
        });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: 500,
            success: false,
            message: "Failed to fetch all posts",
            details: "Internal error to fetch all posts",
        });
    }
};
exports.fetchFoundPosts = fetchFoundPosts;
const fetchMissingPosts = async (req, res) => {
    try {
        // verify user
        if (!req.user) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                details: "Invalid user",
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const result = await neonPostRepo.fetchMissingPosts();
        return res.status(200).json({
            success: true,
            message: "fetch all posts successfully",
            data: result,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            error,
            function: "fetchAllPosts",
            file: "post.controller.ts",
        });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: 500,
            success: false,
            message: "Failed to fetch all posts",
            details: "Internal error to fetch all posts",
        });
    }
};
exports.fetchMissingPosts = fetchMissingPosts;
// fetch SinglePostWithComments
const fetchSinglePostWithComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        // Validation - Verify User
        if (!req.user) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        if (!postId) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                message: "POST ID IS REQUIRED TO FETCH 'singlePostWithComments'",
                success: false,
                data: null,
            });
        }
        const result = await neonPostRepo.fetchSinglePostWithComments({ postId });
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.OK,
            message: "FetchSinglePostWithComments successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            error: error,
            function: "singlePostWithComments",
            file: "post.controller.ts",
        });
    }
};
exports.fetchSinglePostWithComments = fetchSinglePostWithComments;
