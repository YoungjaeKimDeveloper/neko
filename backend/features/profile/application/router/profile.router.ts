/*
    Profile Router
*/

import express from "express";
import { fetchUserProfile, updateUserProfile } from "../controllers/profile.controller";
import { verifyToken } from "../../../../middleware/verifyAuth";

const router = express.Router();
// Update User Profile
router.use(verifyToken);
router.put("/", updateUserProfile);
router.get("/:userName", fetchUserProfile);

export default router;
