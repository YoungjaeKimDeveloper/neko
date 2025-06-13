import {
  DeleteNotificationDTO,
  FetchNotificationByUserIdDTO,
  ReadNotificationDTO,
} from "./../dto/notification.dto";
/*

    CORE LOGIC for Notification - CONTRACT
    1. Create Notification
    2. Read Notification
    3. Delete Notification
*/

import { CreateNotificationDTO } from "../dto/notification.dto";

export default interface NotificationRepo {
  createNotification(
    notification: CreateNotificationDTO
  ): Promise<Notification | null>;
  fetchNotificationByUserId(
    params: FetchNotificationByUserIdDTO
  ): Promise<Notification[] | []>;
  readNotification(params: ReadNotificationDTO): Promise<Notification | null>;
  deleteNotification(
    params: DeleteNotificationDTO
  ): Promise<Notification | null>;
}
