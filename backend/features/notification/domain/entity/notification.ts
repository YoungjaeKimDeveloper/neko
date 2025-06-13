/*

    Notification - entity

*/

// key(lowerCase): Value(upperCase)
enum NotificationType {
  comment = "COMMENT",
  like = "LIKE",
}

export default interface Notification {
  id: string;
  type: NotificationType;
  is_read: boolean;
  user_id: string;
  related_user_id: string;
  related_post_id: string;
  created_at?: Date;
}
