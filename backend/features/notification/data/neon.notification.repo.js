"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

    Implement Core Logic Using Neon SQL
    -> Implement Contract

*/
const db_1 = __importDefault(require("../../../db/config/db"));
const error_log_1 = require("../../../../shared/error/error.log");
class NeonNotificationRepo {
    constructor() {
        this.createNotification = async (notification) => {
            try {
                const result = await (0, db_1.default) `
            INSERT INTO notifications(type,user_id,related_user_id,related_post_id)
            VALUES (${notification.type},${notification.user_id},${notification.related_user_id},${notification.related_post_id})
            RETURNING *
            `;
                return result.length > 0 ? result[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "Neon Notification Repo", error: error });
                return null;
            }
        };
        this.fetchNotificationByUserId = async (params) => {
            try {
                const result = await (0, db_1.default) `
      SELECT 
      -- NOTIFICATIONS INFO - ALL
      notifications.id as notifications_id,
      notifications.type as notifications_type,
      notifications.is_read as notifications_is_read,
      notifications.user_id as notifications_user_id,
      notifications.related_user_id as notifications_related_user_id,
      notifications.related_post_id as notifications_related_post_id,
      notifications.created_at as notifications_created_at,
      -- POST INFO - POST IMAGE
      posts.image_urls as post_image_urls,
    
      -- USER - NAME / PROFILE IMAGE
      users.user_name as user_user_name,
      users.user_profile_image as users_user_profile_image
  
      FROM notifications
      LEFT JOIN users on users.id = notifications.related_user_id
      LEFT JOIN posts on posts.id = notifications.related_post_id

      WHERE notifications.user_id = ${params.user_id}

      ORDER BY 
      notifications_created_at DESC

        `;
                return result.length > 0 ? result : [];
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "fetchNotification", error: error });
                return [];
            }
        };
        // 04/07/2025 - updated : filter notification with userId
        this.readNotification = async (params) => {
            try {
                const result = await (0, db_1.default) `
    UPDATE notifications
    SET is_read = true
    WHERE 
    id = ${params.notificationId}
    AND
    user_id =${params.userId}
    RETURNING *
    `;
                return result.length > 0 ? result[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "Read Notification", error: error });
                return null;
            }
        };
        this.deleteNotification = async (params) => {
            try {
                const result = await (0, db_1.default) `
        DELETE 
        FROM notifications
        WHERE 
        id =${params.notificationId}
        AND
        user_id = ${params.userId}
        RETURNING *
        `;
                return result.length > 0 ? result[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "Notification Repo - delete Notification ", error });
                return null;
            }
        };
        // 04/07/2025 - Implement this function to compare if the notificationId is identifcal with userId
        this.fetchSingleNotificationByUserId = async ({ user_id, }) => {
            try {
                const result = await (0, db_1.default) `
        SELECT comments.id as comments_id
        FROM comments
        WHERE comments.user_id = ${user_id}
      `;
                return result.length > 0 ? result : [];
            }
            catch (error) {
                (0, error_log_1.errorLogV2)({
                    error: error,
                    file: "neon.notification.repo.ts",
                    function: "fetchSingleNotificationByUserId",
                });
                return [];
            }
        };
    }
}
exports.default = NeonNotificationRepo;
