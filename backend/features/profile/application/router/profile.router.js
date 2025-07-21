"use strict";
/*
    Profile Router
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("../controllers/profile.controller");
const verifyAuth_1 = require("../../../../middleware/verifyAuth");
const router = express_1.default.Router();
// Update User Profile
router.use(verifyAuth_1.verifyToken);
router.put("/", profile_controller_1.updateUserProfile);
router.get("/:userName", profile_controller_1.fetchUserProfile);
exports.default = router;
