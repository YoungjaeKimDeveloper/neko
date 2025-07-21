"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const verifyAuth_1 = require("../../../../middleware/verifyAuth");
const authRouter = express_1.default.Router();
// singup
authRouter.post("/users", auth_controller_1.createUser);
// login
authRouter.post("/auth-tokens", auth_controller_1.issueAuthToken);
// logout
authRouter.delete("/auth-tokens", auth_controller_1.deleteToken);
// getcurrenuUser
authRouter.get("/me", verifyAuth_1.verifyToken, auth_controller_1.getCurrentUser);
exports.default = authRouter;
