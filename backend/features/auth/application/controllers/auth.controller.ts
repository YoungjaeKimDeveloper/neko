import { ResponseDTO } from "../../../../lib/dto/response.dto";
import AuthNeonRepo from "../../data/auth.neon";
import { LoginDTO, SignUpDTO } from "../dto/request/auth.request.dto";
import { Response, Request } from "express";

import bcrypt from "bcrypt";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../validations/auth.validation";
import { generateToken } from "../../../../lib/utils/auth/generateToken";

const authNeonRepo = new AuthNeonRepo();
// <params,res,request,query>
export const signup = async (
  req: Request<{}, {}, SignUpDTO>,
  res: Response
): Promise<any> => {
  try {
    // email,password,user_name
    const { email, password, userName: user_name } = req.body;
    // Validation - 0
    if (!email || !password || !user_name) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill up the all forms" });
    }
    // Validation - 1
    const isValidPassword = passwordValidation(password);
    if (!isValidPassword) {
      return res.status(500).json({
        success: false,
        message: "Password shoud be at least 6 letters ",
      });
    }
    // Validation - 2
    const existedEmail = await emailValidation(email);
    if (existedEmail) {
      return res
        .status(500)
        .json({ success: false, message: "Email is existed,try other email" });
    }
    // Validation - 3
    const existedUsername = await usernameValidation(user_name);
    if (existedUsername) {
      return res.status(500).json({
        success: false,
        message: "Username is existed, try other username",
      });
    }
    // CREATE NEW USER

    // 1.Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authNeonRepo.signUp(email, hashedPassword, user_name);
    if (!newUser) {
      return res
        .status(500)
        .json({ success: false, message: "Internal error in signup" });
    }
    console.log(`New user created ✅: ${user_name}`);
    // 2.Create token
    const token = generateToken(newUser.email);
    res.cookie("authToken", token, {
      httpOnly: true,
      // Q -?
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, message: "New user Created" });
  } catch (error: any) {
    console.error("Failed to create new user: ", error.message);
    console.error("Failed to create new user: ", error.stack);
    return res.status(500).json({
      success: false,
      message: `Failed to create new user ${error.message}`,
    });
  }
};

// login
export const login = async (
  req: Request<{}, {}, LoginDTO>,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const { email, password } = req.body;
    // Validation - 0
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill email form and password ",
      });
    }
    const authUser = await authNeonRepo.login(email, password);
    if (authUser == null) {
      return res.status(404).json({
        success: false,
        message: "INVALID USER ",
      });
    }
    const token = generateToken(email);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, message: "user loggined✅", data: authUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal ERROR in login user",
    });
  }
};

// logout
export const logout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("authToken");
  return res.status(200).json({ success: true, message: "logged out✅" });
};
