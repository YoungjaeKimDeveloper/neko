/*

    Auth Functionality

*/
import express from "express";
import {
  login,
  logout,
  signup,
  getCurrentUser,
} from "../controllers/auth.controller";
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
