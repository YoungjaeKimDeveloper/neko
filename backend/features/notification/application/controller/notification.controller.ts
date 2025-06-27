import { Response, Request } from "express";
import { VerifiedUserRequest } from "../../../post/application/controllers/post.controller";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import { errorLog } from "../../../../../shared/error/error.log";
import NeonNotificationRepo from "../../data/neon.notification.repo";
import { RESPONSE_MESSAGES } from "../../../../lib/utils/constants/messages";
import { RESPONSE_HTTP } from "../../../../../shared/constants/http-status";
import { sendResponse } from "../../../../lib/utils/response/helper/response.helper";

const neonNotificationRepo = new NeonNotificationRepo();
// fetch all notifications
export const fetchNotification = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const user = (req as VerifiedUserRequest).user;
    if (!user) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const user_id = user.id;

    const result = await neonNotificationRepo.fetchNotificationByUserId({
      user_id,
    });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      message: `${RESPONSE_MESSAGES.SUCCESS}`,
      data: result,
    });
  } catch (error) {
    errorLog({ location: "fetchNotification", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} - fetchNotification `,
    });
  }
};
// read notification
export const readNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const notificationId = req.params.notificationId;
    if (!notificationId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} NotificationID is required `,
      });
    }
    const result = await neonNotificationRepo.readNotification({
      notificationId: notificationId,
    });
    if (result == null) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        message: `${RESPONSE_MESSAGES.NOT_FOUND} failed to find notification `,
      });
    }

    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.CREATED,
      success: true,
      message: `${RESPONSE_MESSAGES.SUCCESS} read notification successfully `,
    });
  } catch (error) {
    errorLog({ location: "Read Notification", error });

    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} failed to read notification `,
    });
  }
};
// delete Notification
export const deleteNotification = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const notificationId = req.params.notificationId;
    if (!notificationId) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} NotificationID is required`,
      });
    }
    const result = await neonNotificationRepo.deleteNotification({
      notificationId: notificationId,
    });
    if (result == null) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        message: `${RESPONSE_MESSAGES.NOT_FOUND} failed to find the notification`,
      });
    }

    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      message: `${RESPONSE_MESSAGES.DELETE} `,
      data: result,
    });
  } catch (error) {
    errorLog({ location: "Delete Notification", error });

    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} delete notification `,
    });
  }
};
