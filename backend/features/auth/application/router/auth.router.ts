/*
    RESTFUL API = Representational(자원 표현) + State(상태) + Transfer(전달)
    RESTFUL 하다 = REST한 규칙
    1.URL은 자원을표시
    2.행위 직접효현 금지 행위는 Method로 (GET,POST,PUT,DELETE) 로 이루어져야함
    3./로 계층표현
    4.URL은 소문자로만 URL = Uniform Resource Locator - 인터넷 상 자원의 위치를 말함.
    5. _ X - > - O
    Auth Functionality

*/
import express from "express";
import {
  login,
  logout,
  signup,
  getCurrentUser,
} from "../controller/auth.controller";
import { verifyToken } from "../../../../middleware/verifyAuth";

const authRouter = express.Router();

// singup
authRouter.post("/signup", signup);
// login
authRouter.post("/login", login);
// logout
authRouter.post("/logout", logout);
// getcurrenuUser
authRouter.get("/me", verifyToken, getCurrentUser);
export default authRouter;
