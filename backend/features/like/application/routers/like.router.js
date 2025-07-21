"use strict";
/*

    Like Router

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../../../../middleware/verifyAuth");
const like_controller_1 = require("../controllers/like.controller");
const router = express_1.default.Router();
// Middleware
router.use(verifyAuth_1.verifyToken);
// Like Post
router.post("/post/:postId", like_controller_1.likePost);
// UnLike post
router.delete("/post/:postId", like_controller_1.unLikePost);
exports.default = router;
