import express from "express";
/*

    Notification - Router
    0. fetchNotificationByUserId
    1. read notification
    2. delete notification

    REST - REpresentational State Transfer 
    /entity(resource)/identifier/action

*/

const router = express.Router();
// 0. fetchNotificationByUserId
router.get("/notifications", fetchNotifications);
// 1. read notification
router.put("/notifications/:id/read", readNotification);
// 1. delete notification
router.delete("/notifications/:id", deleteNotification);
