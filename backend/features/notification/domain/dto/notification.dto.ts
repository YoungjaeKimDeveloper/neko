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
// ADDED 04/07/2025 - To match the type with alias
export interface NotificationAPIResponse {
  notifications_id: string;
  notifications_type: NotificationType;
  notifications_is_read: boolean;
  notifications_user_id: string;
  notifications_related_user_id: string;
  notifications_related_post_id: string;
  notifications_created_at: Date;
  post_image_urls: string;
  user_user_name: string;
  users_user_profile_image: string;
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
// 05/07/2025 added
export interface fetchSingleNotificationByUserIdProps {
  user_id: string;
}
