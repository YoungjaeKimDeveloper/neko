"use strict";
/*

  IMPLEMENT Core logic with Repo

 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/config/db"));
const error_log_1 = require("../../../../shared/error/error.log");
class NeonCommentRepo {
    constructor() {
        this.createComment = async (comment) => {
            try {
                const newComment = await (0, db_1.default) `
      INSERT INTO comments(content,user_id,post_id)
      VALUES (${comment.content}, ${comment.user_id}, ${comment.post_id})
      RETURNING * 
      `;
                return newComment?.length > 0 ? newComment[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "Create Comment", error });
                return null;
            }
        };
        this.deleteComment = async (params) => {
            try {
                await (0, db_1.default) `
      DELETE 
      FROM comments
      WHERE id = ${params.comment_id}
      RETURNING * 
      `;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "Delete Comment", error });
                // 부른쪽에서 catch로 잡게됨
                throw new Error(`ERROR IN deleteComment:  ${error.message}`);
            }
        };
    }
}
exports.default = NeonCommentRepo;
