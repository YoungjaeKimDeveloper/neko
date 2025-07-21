"use strict";
/*

    Comment Router

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controller/comment.controller");
const verifyAuth_1 = require("../../../../middleware/verifyAuth");
const router = express_1.default.Router();
router.use(verifyAuth_1.verifyToken);
// creat
router.post("/posts/:postId", comment_controller_1.createComment);
// delete
router.delete("/posts/:postId/comments/:commentId", comment_controller_1.deleteComment);
exports.default = router;
