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
} from "../domain/dto/notification.dto";
import NotificationRepo from "../domain/repo/notification.repo";
import Notification from "../domain/entity/notification";
import { errorLog } from "../../../../shared/error/error.log";

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
  ): Promise<Notification[] | []> => {
    try {
      const result = await sql`
      SELECT * 
      FROM notifications
      WHERE user_id = ${params.user_id}
        `;
      return result.length > 0 ? (result as Notification[]) : [];
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
    update notifications
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
}
export default NeonNotificationRepo;
