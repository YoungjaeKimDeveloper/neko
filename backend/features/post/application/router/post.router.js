"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
/*
 - Express is singleton but rotuer is not single

 Post Router
 1.create
 2.fetchPostByUserId
 3.updatePost
 4.deletePost
*/
const verifyAuth_1 = require("../../../../middleware/verifyAuth");
const postRouter = express_1.default.Router();
postRouter.use(verifyAuth_1.verifyToken);
// create
postRouter.post("/", post_controller_1.createPost);
// fetchPostByUserId
postRouter.get("/", post_controller_1.fetchPostsByUserId);
// updatePost
postRouter.put("/:postId", post_controller_1.updatePost);
// deletePost
postRouter.delete("/:postId", post_controller_1.deletePost);
// fetch Allposts
postRouter.get("/all", post_controller_1.fetchAllPosts);
// fetch found post
postRouter.get("/found", post_controller_1.fetchFoundPosts);
// fetch missing post
postRouter.get("/missing", post_controller_1.fetchMissingPosts);
// fetch single post with postID - (update post - fetch existed Info)
postRouter.get("/:postId", post_controller_1.fetchSinglePost);
// fetch single post with comments - (full information)
postRouter.get("/:postId/full", post_controller_1.fetchSinglePostWithComments);
exports.default = postRouter;
