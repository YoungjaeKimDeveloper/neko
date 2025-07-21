"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLikePost = exports.likePost = void 0;
const neon_like_repo_1 = __importDefault(require("../../data/neon.like.repo"));
const error_log_1 = require("../../../../../shared/error/error.log");
const neon_post_repo_1 = __importDefault(require("../../../post/data/neon.post.repo"));
const neon_notification_repo_1 = __importDefault(require("../../../notification/data/neon.notification.repo"));
const response_helper_1 = require("../../../../lib/utils/response/helper/response.helper");
const http_status_1 = require("../../../../../shared/constants/http-status");
const messages_1 = require("../../../../lib/utils/constants/messages");
// Neon Instance
const neonLikeRepo = new neon_like_repo_1.default();
const neonPostRepo = new neon_post_repo_1.default();
const neonNotificationRepo = new neon_notification_repo_1.default();
// Like the Post
const likePost = async (req, res) => {
    console.log("Did you Call me?");
    try {
        const authenticatedUser = req.user;
        if (!authenticatedUser) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED} `,
            });
        }
        const userId = req.user.id;
        if (!userId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} - userid is required`,
            });
        }
        // Extract PostId
        const postId = req.params.postId;
        if (!postId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} - postId is required`,
            });
        }
        const result = await neonLikeRepo.likePost({
            user_id: userId,
            post_id: postId,
        });
        if (!result) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.INTERNAL,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.INTERNAL}`,
            });
        }
        // fetch Single post and check if the post writer and user are same
        const post = await neonPostRepo.fetchSinglePost({ postId });
        if (!post) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.NOT_FOUND} "cannot find the post`,
            });
        } // Create Notification
        try {
            if (post.user_id !== userId) {
                const result = await neonNotificationRepo.createNotification({
                    type: "LIKE" /* NotificationType.like */,
                    user_id: post.user_id,
                    related_user_id: userId,
                    related_post_id: postId,
                });
                if (!result) {
                    return (0, response_helper_1.sendResponse)({
                        res: res,
                        status: http_status_1.RESPONSE_HTTP.INTERNAL,
                        success: false,
                        message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} to update Like`,
                    });
                }
            }
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.CREATED,
                success: true,
                message: "Like post and notification has been created successfully",
            });
        }
        catch (error) {
            (0, error_log_1.errorLog)({ location: "Like Post", error: error });
        }
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.CREATED,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.CREATE}`,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "LikePost", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL}`,
        });
    }
};
exports.likePost = likePost;
// Like the Post
const unLikePost = async (req, res) => {
    try {
        const authenticatedUser = req.user;
        if (!authenticatedUser) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED} "unlike post"`,
            });
        }
        const userId = req.user.id;
        if (!userId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} userid is required - unlikepost `,
            });
        }
        const postId = req.params.postId;
        if (!postId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} - postId is required - unlikepost`,
            });
        }
        const result = await neonLikeRepo.unLikePost({
            user_id: userId,
            post_id: postId,
        });
        if (!result || result == null) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.NOT_FOUND} failed to unlike post`,
            });
        }
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.CREATED,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.SUCCESS} unliked post successfully`,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "LikePost", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} - unlike post`,
        });
    }
};
exports.unLikePost = unLikePost;
