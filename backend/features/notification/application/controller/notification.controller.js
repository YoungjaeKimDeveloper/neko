"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.readNotification = exports.fetchNotification = void 0;
const error_log_1 = require("../../../../../shared/error/error.log");
const neon_notification_repo_1 = __importDefault(require("../../data/neon.notification.repo"));
const messages_1 = require("../../../../lib/utils/constants/messages");
const http_status_1 = require("../../../../../shared/constants/http-status");
const response_helper_1 = require("../../../../lib/utils/response/helper/response.helper");
const neonNotificationRepo = new neon_notification_repo_1.default();
// fetch all notifications
const fetchNotification = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const user_id = user.id;
        const result = await neonNotificationRepo.fetchNotificationByUserId({
            user_id,
        });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.OK,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.SUCCESS}`,
            data: result,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "fetchNotification", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} - fetchNotification `,
        });
    }
};
exports.fetchNotification = fetchNotification;
// read notification
const readNotification = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;
        if (!user) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        const notificationId = req.params.notificationId;
        if (!notificationId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} NotificationID is required `,
            });
        }
        const result = await neonNotificationRepo.readNotification({
            notificationId: notificationId,
            userId: userId,
        });
        if (result == null) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.NOT_FOUND} failed to find notification `,
            });
        }
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.CREATED,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.SUCCESS} read notification successfully `,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "Read Notification", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} failed to read notification `,
        });
    }
};
exports.readNotification = readNotification;
// delete Notification
const deleteNotification = async (req, res) => {
    try {
        const user = req.user;
        // USER ID
        const userId = user.id;
        if (!user) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.UNAUTHORIZED,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.UNAUTHORIZED}`,
            });
        }
        // NOTIFICATION ID
        const notificationId = req.params.notificationId;
        if (!notificationId) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.BAD_REQUEST} NotificationID is required`,
            });
        }
        // SEND REQUEST TO DELETE POST -> NEON
        const result = await neonNotificationRepo.deleteNotification({
            notificationId: notificationId,
            userId: userId,
        });
        if (result == null) {
            return (0, response_helper_1.sendResponse)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
                message: `${messages_1.RESPONSE_MESSAGES.NOT_FOUND} failed to find the notification`,
            });
        }
        // DELETE NOTIFICATION SUCCESSFULLY
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.OK,
            success: true,
            message: `${messages_1.RESPONSE_MESSAGES.DELETE} `,
            data: result,
        });
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "Delete Notification", error });
        return (0, response_helper_1.sendResponse)({
            res: res,
            status: http_status_1.RESPONSE_HTTP.INTERNAL,
            success: false,
            message: `${messages_1.RESPONSE_MESSAGES.INTERNAL} delete notification `,
        });
    }
};
exports.deleteNotification = deleteNotification;
