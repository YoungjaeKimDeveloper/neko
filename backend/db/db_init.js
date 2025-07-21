"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_log_1 = require("../../shared/error/error.log");
const comments_schema_1 = __importDefault(require("./schemas/comments.schema"));
const likes_schema_1 = __importDefault(require("./schemas/likes.schema"));
const notification_schema_1 = __importDefault(require("./schemas/notification.schema"));
const posts_schema_1 = __importDefault(require("./schemas/posts.schema"));
const users_schema_1 = __importDefault(require("./schemas/users.schema"));
async function initDB() {
    try {
        await (0, users_schema_1.default)();
        await (0, posts_schema_1.default)();
        await (0, comments_schema_1.default)();
        await (0, likes_schema_1.default)();
        await (0, notification_schema_1.default)();
        console.log("DB_INIT✅");
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "initDB", error });
        throw new error("Failed to initDB");
    }
}
exports.default = initDB;
