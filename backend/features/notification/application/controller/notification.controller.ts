import { Response, Request } from "express";
import { FetchNotificationByUserIdDTO } from "../../domain/dto/notification.dto";
import { VerifiedUserRequest } from "../../../post/application/controllers/post.controller";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import { errorLog } from "../../../../lib/utils/error/error.log";
import NeonNotificationRepo from "../../data/neon.notification.repo";

const neonNotificationRepo = new NeonNotificationRepo();

export const fetchNotification = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const user = (req as VerifiedUserRequest).user;
    const user_id = user.id;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "UnAuthorized Access" });
    }
    const result = await neonNotificationRepo.fetchNotificationByUserId({
      user_id,
    });
    return res
      .status(200)
      .json({ success: true, message: "Notifications fetched", data: result });
  } catch (error) {
    errorLog({ location: "fetchNotification", error });
    return res
      .status(500)
      .json({ success: false, message: "Internal Error in fetchNotification" });
  }
};

export const readNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const postId = req.params.notificationId;
    if (!postId) {
      return res
        .status(401)
        .json({ success: false, message: "NotificationID is required" });
    }
    const result = await neonNotificationRepo.readNotification({
      notificationId: postId,
    });
    if (result == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find the notification" });
    }
    return res.status(201).json({
      success: true,
      message: "Read the notification successfully",
      data: result,
    });
  } catch (error) {
    errorLog({ location: "Read Notification", error });
    return res
      .status(500)
      .json({ success: false, message: "Internal Error in read Notification" });
  }
};
