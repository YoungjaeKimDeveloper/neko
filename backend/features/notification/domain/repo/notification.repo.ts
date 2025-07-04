import {
  DeleteNotificationDTO,
  FetchNotificationByUserIdDTO,
  fetchSingleNotificationByUserIdProps,
  NotificationAPIResponse,
  ReadNotificationDTO,
} from "./../dto/notification.dto";
import Notification from "../entity/notification";
/*

    CORE LOGIC for Notification - CONTRACT
    1. Create Notification
    2. Read Notification
    3. Delete Notification
    4. Fetch Notification
    //05/07/2025 ADDED
    5. fetchSingleNotificationByUserId
*/

import { CreateNotificationDTO } from "../dto/notification.dto";

export default interface NotificationRepo {
  createNotification(
    notification: CreateNotificationDTO
  ): Promise<Notification | null>;
  fetchNotificationByUserId(
    params: FetchNotificationByUserIdDTO
  ): Promise<NotificationAPIResponse[] | []>;
  readNotification(params: ReadNotificationDTO): Promise<Notification | null>;
  deleteNotification(
    params: DeleteNotificationDTO
  ): Promise<Notification | null>;
  fetchSingleNotificationByUserId(
    params: fetchSingleNotificationByUserIdProps
  ): Promise<Notification[] | []>;
}
