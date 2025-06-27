import jwt from "jsonwebtoken";
import sql from "../db/config/db";
/*

    Verify Token
    Signned with user email

*/
import { Request, Response, NextFunction } from "express";
import { ResponseDTO } from "../lib/dto/response.dto";
import User from "../features/auth/domain/entities/user";
import { sendResponse } from "../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../shared/constants/http-status";
import { RESPONSE_MESSAGES } from "../lib/utils/constants/messages";
import { errorLog } from "../../shared/error/error.log";

interface VerifiedRequest extends Request {
  user?: any;
}
export const verifyToken = async (
  req: VerifiedRequest,
  res: Response<ResponseDTO>,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies["authToken"];
    // Validation -1
    if (!token) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED} can't find the token`,
      });
    }
    // Validation -1
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED} can't find the secret key`,
      });
    }
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userEmail = decoded?.email;
    if (!userEmail) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED} can't find the email`,
      });
    }
    // console.log(`user email ${userEmail}`);

    const user = await sql`
    SELECT id,email,user_name,user_profile_image,location,created_at
    FROM users
    WHERE email = ${userEmail} 
    `;
    if (!user || user.length == 0) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
        message: `${RESPONSE_MESSAGES.NOT_FOUND} can't find the user`,
      });
    }
    console.log("");
    req.user = user[0] as User;
    next();
  } catch (error) {
    errorLog({ location: "verify Token", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} verify Token`,
    });
  }
};
