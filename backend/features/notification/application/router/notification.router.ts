import express from "express";
/*

    Notification - Router
    0. fetchNotificationByUserId
    1. read notification
    2. delete notification
    
*/

const router = express.Router();
// 0. fetchNotificationByUserId
router.get("/fetchNotifications", fetchNotifications);
// 1. read notification
router.put("/read/:id",readNotification)
// 1. delete notification
router.delete("/delete/:id",deleteNotification)