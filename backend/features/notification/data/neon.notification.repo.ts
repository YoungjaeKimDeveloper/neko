import { CommentRequestDTO } from "./../../comment/domain/dto/comment.request.dto";
/*

    Implement Core Logic Using Neon SQL
    -> Implement Contract

*/

import sql from "../../../db/config/db";
import {
  CreateNotificationDTO,
  FetchNotificationByUserIdDTO,
  ReadNotificationDTO,
  DeleteNotificationDTO,
  NotificationAPIResponse,
  fetchSingleNotificationByUserIdProps,
} from "../domain/dto/notification.dto";
import NotificationRepo from "../domain/repo/notification.repo";
import Notification from "../domain/entity/notification";
import { errorLog, errorLogV2 } from "../../../../shared/error/error.log";

class NeonNotificationRepo implements NotificationRepo {
  createNotification = async (
    notification: CreateNotificationDTO
  ): Promise<Notification | null> => {
    try {
      const result = await sql`
            INSERT INTO notifications(type,user_id,related_user_id,related_post_id)
            VALUES (${notification.type},${notification.user_id},${notification.related_user_id},${notification.related_post_id})
            RETURNING *
            `;
      return result.length > 0 ? (result[0] as Notification) : null;
    } catch (error: any) {
      errorLog({ location: "Neon Notification Repo", error: error });
      return null;
    }
  };
  fetchNotificationByUserId = async (
    params: FetchNotificationByUserIdDTO
  ): Promise<NotificationAPIResponse[] | []> => {
    try {
      const result = await sql`
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
      return result.length > 0 ? (result as NotificationAPIResponse[]) : [];
    } catch (error) {
      errorLog({ location: "fetchNotification", error: error });
      return [];
    }
  };
  readNotification = async (
    params: ReadNotificationDTO
  ): Promise<Notification | null> => {
    try {
      const result = await sql`
    UPDATE notifications
    SET is_read = true
    WHERE id = ${params.notificationId}
    RETURNING *
    `;
      return result.length > 0 ? (result[0] as Notification) : null;
    } catch (error) {
      errorLog({ location: "Read Notification", error: error });
      return null;
    }
  };
  deleteNotification = async (
    params: DeleteNotificationDTO
  ): Promise<Notification | null> => {
    try {
      const result = await sql`
        DELETE 
        FROM notifications
        WHERE id =${params.notificationId}
        RETURNING *
        `;
      return result.length > 0 ? (result[0] as Notification) : null;
    } catch (error) {
      errorLog({ location: "Notification Repo - delete Notification ", error });
      return null;
    }
  };
  fetchSingleNotificationByUserId = async ({
    user_id,
  }: fetchSingleNotificationByUserIdProps): Promise<Notification[] | []> => {
    try {
      const result = await sql`
        SELECT comments.id as comments_id
        FROM comments
        WHERE comments.user_id = ${user_id}
      `;
      return result.length > 0 ? (result as Notification[]) : [];
    } catch (error) {
      errorLogV2({
        error: error,
        file: "neon.notification.repo.ts",
        function: "fetchSingleNotificationByUserId",
      });
      return [];
    }
  };
}
export default NeonNotificationRepo;
