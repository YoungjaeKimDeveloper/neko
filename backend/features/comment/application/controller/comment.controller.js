"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = void 0;
const neon_comment_repo_1 = __importDefault(require("../../data/neon.comment.repo"));
const error_log_1 = require("../../../../../shared/error/error.log");
const neon_post_repo_1 = __importDefault(require("../../../post/data/neon.post.repo"));
const response_helper_1 = require("../../../../lib/utils/response/helper/response.helper");
const http_status_1 = require("../../../../../shared/constants/http-status");
const messages_1 = require("../../../../lib/utils/constants/messages");
const neon_notification_repo_1 = __importDefault(require("../../../notification/data/neon.notification.repo"));
// Neon - data layer
const neonPostRepo = new neon_post_repo_1.default();
const neonCommentRepo = new neon_comment_repo_1.default();
const neonNotificationRepo = new neon_notification_repo_1.default();
const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} nothing to update`,
            });
        }
        // Validation - 0
        const authenticatedUser = req.user;
        if (!authenticatedUser) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} Unauthorized user - create comment`,
            });
        }
        // Validation - 1
        const userId = req.user.id;
        if (!userId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} user id is required - create comment`,
            });
        }
        // Validation - 2
        const postId = req.params.postId;
        if (!postId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} Post id is required - create comment`,
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
                return (0, response_helper_1.sendResponse)({
                    res: res,
                    status: http_status_1.RESPONSE_HTTP.INTERNAL,
                    success: false,
                    message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} failed to create new comment - neon comment`,
                });
            }
            // Create a new Comment Successfully
        }
        catch (error) {
            (0, error_log_1.errorLog)({ location: "createComment - neon create Comment", error });
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.INTERNAL,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} failed to create new comment - neon comment`,
            });
        }
        console.debug("여기까지 왔습니다");
        // CREATE NEW NOTIFICATION - S
        try {
            // fetch single post to compare post.userId and currentUserId
            const result = await neonPostRepo.fetchSinglePost({ postId });
            // Validation - Cannot find the singlePost
            if (result == null) {
                throw new Error("Cannot find post with provided postId");
            }
            console.debug("여기까지 왔습니다 -1");
            if (result.user_id !== userId) {
                const newNotification = await neonNotificationRepo.createNotification({
                    type: "COMMENT" /* NotificationType.comment */,
                    user_id: result.user_id,
                    related_post_id: postId,
                    related_user_id: userId,
                });
                console.debug("새로운 notificaiton이 만들어 졌습니다");
                if (newNotification == null) {
                    (0, error_log_1.errorLogV2)({
                        file: "comment.controller.ts",
                        function: "createComment",
                        error: "Failed to create new notification. Due to : neonNotificationRepo",
                    });
                    throw new Error("Failed to create new notification ");
                }
                // Succeed in creating new notification
            }
        }
        catch (error) {
            (0, error_log_1.errorLogV2)({
                file: "comment.controller.ts",
                function: "createComment",
                error: `Failed to create new Notification ${error.message}`,
            });
        }
        // CREATE NEW NOTIFICATION - E
        // Final Response
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.CREATED,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.CREATE} comment created successfully`,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "createComment - controller", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} create new comment controller`,
        });
    }
};
exports.createComment = createComment;
// Delete Comment
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const authenticatedUser = req.user;
        // console.log("authenticatedUser", authenticatedUser);
        if (!authenticatedUser) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED} - delete comment`,
            });
        }
        // Validation - 1
        const userId = req.user.id;
        console.log("USERID", userId);
        if (!userId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} userId is required`,
            });
        }
        // Validation - 2
        const postId = req.params.postId;
        if (!postId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} postid is required`,
            });
        }
        // Validation - 3 check if the user is authorized
        const result = await neonPostRepo.fetchSinglePost({ postId: postId });
        if (!result) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.NOT_FOUND} cannot find the post`,
            });
        }
        if (result.user_id !== userId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED} `,
            });
        }
        await neonCommentRepo.deleteComment({
            comment_id: commentId,
        });
        return res.status(200).json({ success: true, message: "Comment Deleted" });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "deleteComment", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL}`,
        });
    }
};
exports.deleteComment = deleteComment;
