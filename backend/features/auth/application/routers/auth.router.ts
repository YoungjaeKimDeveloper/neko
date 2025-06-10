/*

    Auth Functionality

*/
import express from "express";
import { signup } from "../controllers/auth.controller";

const authRouter = express.Router();

// singup
authRouter.post("/signup", signup);
// login

// logout

// getcurrenuUser

export default authRouter;
