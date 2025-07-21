"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

    Implement core functionality with Neon
    
    27/06/2025
    Neon <---> API <---> Front-end
*/
const db_1 = __importDefault(require("../../../db/config/db"));
const error_log_1 = require("../../../../shared/error/error.log");
class NeonPostRepo {
    constructor() {
        // CREATE POST
        this.createPost = async (post) => {
            try {
                const newPost = await (0, db_1.default) `
          INSERT INTO posts(title,content,image_urls,reward_amount,location, user_id)
          VALUES (
            ${post.title},
            ${post.content},
            ${post.image_urls},
            ${post.reward_amount ?? 0},
            ${post.location}, 
            ${post.user_id})
          RETURNING *
          `;
                if (newPost == null) {
                    return null;
                }
                return newPost[0];
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "create post neon rpo", error });
                return null;
            }
        };
        this.fetchPostsByUserId = async (params) => {
            try {
                const posts = await (0, db_1.default) `
        SELECT * 
        FROM posts
        WHERE user_id= ${params.userId}
      `;
                if (posts == null) {
                    return [];
                }
                return posts;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "fetchPostByUserId Neon", error });
                return [];
            }
        };
        this.updatePost = async (params) => {
            try {
                // Dynamic Object
                const result = await (0, db_1.default) `
        UPDATE posts
        SET 
        title = ${params.updated_title},
        content = ${params.updated_content},
        image_urls = ${params.updated_image_urls},
        location = ${params.updated_location},
        reward_amount= ${params.updated_reward_amount},
        is_found = ${params.updated_is_found},
        updated_at = now()
        WHERE id = ${params.postId}
        RETURNING *
      `;
                return result[0] ?? null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "neon repo update Post", error });
                return null;
            }
        };
        this.deletePost = async (params) => {
            try {
                await (0, db_1.default) `
      DELETE FROM posts
      WHERE id = ${params.postId}
      RETURNING *
      `;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "neoPost repo - deletePost", error });
            }
        };
        // + fetch single item to match the writer and looged user
        this.fetchSinglePost = async (params) => {
            try {
                const posts = await (0, db_1.default) `
        SELECT * 
        FROM posts
        WHERE id= ${params.postId}
      `;
                if (posts.length === 0) {
                    return null;
                }
                return posts[0];
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "FetchSingle Post - neon repo", error });
                return null;
            }
        };
        // Use alias to prevent confliction
        this.fetchAllPosts = async () => {
            try {
                const result = await (0, db_1.default) `
        SELECT posts.*,users.id AS user_id, users.user_name,users.user_profile_image
        FROM posts 
        INNER JOIN users
        ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
      `;
                return result;
            }
            catch (error) {
                (0, error_log_1.errorLogV2)({
                    error,
                    function: "Fetch All Posts",
                    file: "Neon.post.repo.ts",
                });
                return [];
            }
        };
        this.fetchFoundPosts = async () => {
            try {
                const result = await (0, db_1.default) `
        SELECT 
        posts.*,
        users.id AS user_id, 
        users.user_name,
        users.user_profile_image

        FROM posts 
        INNER JOIN users
        ON posts.user_id = users.id
        WHERE posts.is_found = true
        ORDER BY posts.created_at DESC
      `;
                return result;
            }
            catch (error) {
                (0, error_log_1.errorLogV2)({
                    error,
                    function: "Fetch found Posts",
                    file: "Neon.post.repo.ts",
                });
                return [];
            }
        };
        this.fetchMissingPosts = async () => {
            try {
                const result = await (0, db_1.default) `
        SELECT 
        posts.*,
        users.id AS user_id, 
        users.user_name,
        users.user_profile_image

        FROM posts 
        INNER JOIN users
        ON posts.user_id = users.id
        WHERE posts.is_found = false
        ORDER BY posts.created_at DESC
      `;
                return result;
            }
            catch (error) {
                (0, error_log_1.errorLogV2)({
                    error,
                    function: "Fetch Missing Posts",
                    file: "Neon.post.repo.ts",
                });
                return [];
            }
        };
        // Alias Singular
        // Single - Row
        this.fetchSinglePostWithComments = async (params) => {
            try {
                const result = await (0, db_1.default) `
      SELECT
        posts.id as post_id,
        posts.user_id as post_user_id,
        
        posts.title as post_title,
        posts.content as post_content,
        posts.image_urls as post_image_urls,
        posts.created_at as post_created_at,
        posts.reward_amount as post_reward_amount,
        posts.location as post_location,

        users.id as user_id,
        users.user_name as user_name,
        users.user_profile_image as user_profile_image,

        comments.id as comment_id,
        comments.user_id as comment_user_id,
        comments.post_id as comment_post_id,
        comments.content as comment_content,
        comments.created_at as comment_created_at,

        likes.user_id as like_user_id,
        likes.post_id as like_post_id,
        -- Comment Writer - from users table
        comment_user.id as comment_user_id,
        comment_user.user_name as comment_user_user_name,
        comment_user.user_profile_image as comment_user_user_profile_image

        FROM posts
        LEFT JOIN users on users.id = posts.user_id
        LEFT JOIN comments on comments.post_id = posts.id
        LEFT JOIN likes on likes.post_id = posts.id
        LEFT JOIN users as comment_user on comment_user.id = comments.user_id

        WHERE posts.id = ${params.postId}
        ORDER BY comments.created_at DESC
        `;
                // Denormalisation - Validation - 0
                if (result.length === 0)
                    return null;
                // Denormalisation - Extract postInfo and user info
                const firstRow = result[0];
                // POST + USER is always same for one poster
                // 정적인 정보기준에서는 result[0] 하나만 뽑아서 가도됌
                const post = {
                    id: firstRow.post_id ?? null,
                    user_id: firstRow.user_id ?? null,
                    title: firstRow.post_title,
                    content: firstRow.post_content,
                    image_urls: firstRow.post_image_urls,
                    created_at: firstRow.post_created_at ?? null,
                    reward_amount: firstRow.post_reward_amount ?? null,
                    location: firstRow.post_location ?? null,
                    user_name: firstRow.user_name,
                    user_profile_image: firstRow.user_profile_image,
                };
                // Comments denormalisation - Follow alias
                const comments = result
                    .filter((row) => row.comment_id != null)
                    .map((row) => ({
                    id: row.comment_id ?? undefined,
                    content: row.comment_content,
                    created_at: row.comment_created_at ?? undefined,
                    user_id: row.comment_user_id,
                    post_id: row.comment_post_id,
                    user_name: row.comment_user_user_name,
                    user_profile_image: row.comment_user_user_profile_image,
                }));
                // Likes denormalisation - Follow alias
                const likes = result
                    .filter((row) => row?.like_user_id != null)
                    .map((row) => ({
                    user_id: row.like_user_id,
                    post_id: row.like_post_id,
                }));
                return { post, comments, likes };
            }
            catch (error) {
                (0, error_log_1.errorLogV2)({
                    file: "neon.post.repo.ts",
                    function: "fetchSinglePostWithComments",
                    error: error,
                });
                return null;
            }
        };
    }
}
exports.default = NeonPostRepo;
