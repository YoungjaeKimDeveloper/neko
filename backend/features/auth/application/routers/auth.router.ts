/*

    Auth Functionality

*/
import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const authRouter = express.Router();

// singup
authRouter.post("/signup", signup);
// login
authRouter.post("/login", login);
// logout
authRouter.post("/logout", logout);
// getcurrenuUser

export default authRouter;
