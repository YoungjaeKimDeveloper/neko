/*

    Notification DTO

*/

import { NotificationType } from "../entity/notification";

export interface CreateNotificationDTO {
  type: NotificationType;
  user_id: string;
  related_user_id: string;
  related_post_id: string;
}

export interface fetchNotificationBYUserIDDTO {
  user_id: string;
}

export interface readNotificationDTO {
  id: string;
}

export interface deleteNotificationDTO {
  id: string;
}
