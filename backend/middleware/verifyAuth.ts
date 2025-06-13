import jwt from "jsonwebtoken";
import sql from "../db/config/db";
/*

    Verify Token
    Signned with user email

*/
import { Request, Response, NextFunction } from "express";
import { ResponseDTO } from "../lib/dto/response.dto";

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
    if (!token || token == null) {
      return res
        .status(404)
        .json({ success: false, message: "Token is not existed" });
    }
    // Validation -1
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res
        .status(404)
        .json({ success: false, message: "Secret key is not existed" });
    }
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userEmail = decoded?.email;
    if (!userEmail) {
      return res
        .status(404)
        .json({ success: false, message: "User email key is not existed" });
    }
    console.log(`user email ${userEmail}`);

    const user = await sql`
    SELECT * 
    FROM users
    WHERE email = ${userEmail} 
    `;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User is not existed" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Failed to verify Token");
    return res
      .status(500)
      .json({ success: false, message: "Error in Verify Token" });
  }
};
