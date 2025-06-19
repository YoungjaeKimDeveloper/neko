/*
    RESTful API = Representational(자원 표현) + State(상태) + Transfer(전달)
    RESTFful 하다 = REST한 규칙
    RESTful하게 할것
    1.URL은 자원을표시
    2.행위 직접효현 금지 행위는 Method로 (GET,POST,PUT,DELETE) 로 이루어져야함
    3./로 계층표현
    4.URL은 소문자로만 URL = Uniform Resource Locator - 인터넷 상 자원의 위치를 말함.
    5. _ X - > - O
    6. 자원은 항상 복수형 Collection을 의미하니까...
    Auth Functionality
    7. URL은 항상 자원으로 이야기해야함


*/
import express from "express";
import {
  createUser,
  issueAuthToken,
  deleteToken,
  getCurrentUser,
} from "../controller/auth.controller";
import { verifyToken } from "../../../../middleware/verifyAuth";

const authRouter = express.Router();

// singup
authRouter.post("/users", createUser);
// login
authRouter.post("/auth-tokens", issueAuthToken);
// logout
authRouter.delete("/auth-tokens", deleteToken);
// getcurrenuUser
authRouter.get("/me", verifyToken, getCurrentUser);
export default authRouter;
