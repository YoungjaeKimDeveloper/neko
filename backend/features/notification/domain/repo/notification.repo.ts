/*

    CORE LOGIC for Notification - CONTRACT
    1. Create Notification
    2. Read Notification
    3. Delete Notification
*/

export default interface NotificationRepo {
  createNotification(): Promise<Notification | null>;
  readNotification(): Promise<Notification | null>;
  deleteNotification(): Promise<Notification | null>;
}
