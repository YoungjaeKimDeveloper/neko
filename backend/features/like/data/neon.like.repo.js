"use strict";
/*

    Implement Like Repo with Neon
    1. Like Post
    2. Unlike Post
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/config/db"));
const error_log_1 = require("../../../../shared/error/error.log");
class NeonLikeRepo {
    constructor() {
        this.likePost = async (params) => {
            try {
                const result = await (0, db_1.default) `
            INSERT INTO likes
            VALUES (${params.user_id},${params.post_id})
            ON CONFLICT DO NOTHING
            RETURNING *
            `;
                return result.length > 0 ? result[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "NeonLikeRepo - like", error });
                return null;
            }
        };
        this.unLikePost = async (params) => {
            try {
                const result = await (0, db_1.default) `
        DELETE FROM likes
        WHERE user_id = ${params.user_id} AND post_id = ${params.post_id}
        RETURNING * 
        `;
                return result.length > 0 ? result[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLog)({ location: "NeonLikeRepo - unlike", error });
                return null;
            }
        };
    }
}
exports.default = NeonLikeRepo;
