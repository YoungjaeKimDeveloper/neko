"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

    Notification - Router
    0. fetchNotificationByUserId
    1. read notification
    2. delete notification

    REST - REpresentational State Transfer
    /entity/identifier/action

*/
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../../../../middleware/verifyAuth");
const notification_controller_1 = require("../controller/notification.controller");
const router = express_1.default.Router();
router.use(verifyAuth_1.verifyToken);
// 0. fetchNotificationByUserId
router.get("/", notification_controller_1.fetchNotification);
// 1. read notification
router.put("/:notificationId", notification_controller_1.readNotification);
// 2. delete notification-
router.delete("/:notificationId", notification_controller_1.deleteNotification);
exports.default = router;
