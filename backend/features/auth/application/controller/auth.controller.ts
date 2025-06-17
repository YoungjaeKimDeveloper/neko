// External
import bcrypt from "bcrypt";
import { Response, Request } from "express";
// Internal
import AuthNeonRepo from "../../data/auth.neon.repo";
import { generateToken } from "../token/generateToken";
// DTO
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../validations/auth.validation";
import { sendResponse } from "../../../../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../../../lib/utils/constants/http-status";
import { RESPONSE_MESSAGES } from "./../../../../lib/utils/constants/messages";
import { errorLog } from "../../../../lib/utils/error/error.log";

const authNeonRepo = new AuthNeonRepo();
// <params,res,request,query>
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // email,password,user_name
    const { email, password, userName: user_name } = req.body;
    // Validation - 0
    if (!email || !password || !user_name) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}: Please fill required form`,
      });
    }
    // Validation - 1
    const isValidPassword = passwordValidation(password);
    if (!isValidPassword) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}password Invalid`,
      });
    }
    // Validation - 2
    const existedEmail = await emailValidation(email);
    if (existedEmail) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}email Exists`,
      });
    }
    // Validation - 3
    const existedUsername = await usernameValidation(user_name);
    if (existedUsername) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST}email Exists`,
      });
    }
    // CREATE NEW USER

    // 1.Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authNeonRepo.signUp(email, hashedPassword, user_name);
    if (!newUser) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.INTERNAL} server error in creating new user`,
      });
    }
    console.log(`New user created ✅: ${user_name}`);
    // 2.Create token
    const token = generateToken(newUser!.email);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.CREATED,
      success: true,
      message: `${RESPONSE_MESSAGES.CREATE} `,
    });
  } catch (error: any) {
    errorLog({ location: "create new user controller", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} `,
    });
  }
};

// login
export const issueAuthToken = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const { email, password } = req.body;
    // Validation - 0
    if (!email || !password) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: `${RESPONSE_MESSAGES.BAD_REQUEST} please fill up the all forms  `,
      });
    }
    const authUser = await authNeonRepo.login(email, password);
    if (authUser == null) {
      return sendResponse({
        res: res,
        status: RESPONSE_HTTP.UNAUTHORIZED,
        success: false,
        message: `${RESPONSE_MESSAGES.UNAUTHORIZED}`,
      });
    }
    const token = generateToken(email);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.OK,
      success: true,
      message: `${RESPONSE_MESSAGES.SUCCESS} user Login`,
    });
  } catch (error) {
    errorLog({ location: "Login controller", error });
    return sendResponse({
      res: res,
      status: RESPONSE_HTTP.INTERNAL,
      success: false,
      message: `${RESPONSE_MESSAGES.INTERNAL} in issueToken`,
    });
  }
};

// logout
export const deleteToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  res.clearCookie("authToken");
  return sendResponse({
    res: res,
    status: RESPONSE_HTTP.OK,
    success: true,
    message: `${RESPONSE_MESSAGES.SUCCESS} token deleted`,
  });
};

//getCurrentUser

export const getCurrentUser = async (req: any, res: Response): Promise<any> => {
  return res.json(req.user);
};
