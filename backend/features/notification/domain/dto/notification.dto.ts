/*

    Notification DTO
    - Data Transfer Object

*/

import { NotificationType } from "../entity/notification";

export interface CreateNotificationDTO {
  type: NotificationType;
  user_id: string;
  related_user_id: string;
  related_post_id: string;
}

export interface FetchNotificationByUserIdDTO {
  user_id: string;
}

export interface ReadNotificationDTO {
  notificationId: string;
}

export interface DeleteNotificationDTO {
  notificationId: string;
}
