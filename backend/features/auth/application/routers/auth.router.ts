/*

    Auth Functionality

*/
import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const authRouter = express.Router();

// singup
authRouter.post("/signup", signup);
// login
authRouter.post("/signup", login);
// logout
authRouter.post("/signup", logout);
// getcurrenuUser

export default authRouter;
