/*

    Notification - Router
    0. fetchNotificationByUserId
    1. read notification
    2. delete notification

    REST - REpresentational State Transfer 
    /entity/identifier/action

*/
import express from "express";
import { verifyToken } from "../../../../middleware/verifyAuth";

import {
  fetchNotification,
  readNotification,
  deleteNotification,
} from "../controller/notification.controller";

const router = express.Router();
router.use(verifyToken);
// 0. fetchNotificationByUserId
router.get("/", fetchNotification);
// 1. read notification
router.put("/:notificationId", readNotification);
// 2. delete notification-
router.delete("/:notificationId", deleteNotification);

export default router;
