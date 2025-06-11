import sql from "../../../../db/config/db";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import AuthNeonRepo from "../../data/auth.neon";
import { SignUpDTO } from "../dto/request/auth.request.dto";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authNeonRepo = new AuthNeonRepo();
// <params,res,request,query>
export const signup = async (
  req: Request<{}, ResponseDTO, SignUpDTO>,
  res: Response
) => {
  try {
    // email,password,user_name
    const { email, password, userName: user_name } = req.body;
    // Validation - 0
    if (!email || !password || !!user_name) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill up the all forms" });
    }
    // Validation - 1
    if (password.length < 6) {
      return res.status(500).json({
        success: false,
        message: "Password shoud be at least 6 letters ",
      });
    }
    // Validation - 2
    const existedEmail = await sql`
    SELECT * 
    FROM users
    WHERE email = ${email} 
    `;
    if (existedEmail) {
      return res
        .status(500)
        .json({ success: false, message: "Email is existed,try other email" });
    }
    // Validation - 3
    const existedUsername = await sql`
    SELECT * 
    FROM users
    WHERE user_name = ${user_name} 
    `;
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
    const jwtKey = process.env.JWT_SECRET;
    if (jwtKey == null) {
      throw new Error("JWT_SECRENT IS NOT EXISTED");
    }
    const token = jwt.sign({ email: email }, jwtKey);
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
