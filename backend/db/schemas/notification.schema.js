"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

    Notification Schema

*/
const error_log_1 = require("../../../shared/error/error.log");
const db_1 = __importDefault(require("../config/db"));
const createNotificationTable = async () => {
    try {
        await (0, db_1.default) `
            CREATE TABLE IF NOT EXISTS notifications(
            id UUID PRIMARY KEY,
            type VARCHAR(10),
            is_read BOOLEAN DEFAULT false,
            user_id UUID REFERENCES users(id),
            related_user_id UUID REFERENCES users(id),
            related_post_id UUID REFERENCES posts(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            )
            
        `;
        // 02/07/2025 Alter table to generate random UUID
        // await sql`
        //   ALTER TABLE notifications
        //   ALTER COLUMN id SET DEFAULT gen_random_uuid()
        // `;
        // -------------05/07/2025-------------------
        // 05/07/2025 - when user/related user/realted post delete - notifications are deleted
        // 1.Drop previous constraint
        // await sql`ALTER TABLE notifications DROP CONSTRAINT IF EXISTS fk_notifications_user;`;
        // await sql`ALTER TABLE notifications DROP CONSTRAINT IF EXISTS fk_notifications_related_user;`;
        // await sql`ALTER TABLE notifications DROP CONSTRAINT IF EXISTS fk_notifications_related_post;`;
        // // 2. Add new constraint
        // // user
        // await sql`
        // ALTER TABLE notifications
        // ADD CONSTRAINT fk_notifications_user
        // FOREIGN KEY (user_id)
        // REFERENCES users(id)
        // ON DELETE CASCADE;
        // `;
        // // user - related user
        // await sql`
        // ALTER TABLE notifications
        // ADD CONSTRAINT fk_notifications_related_user
        // FOREIGN KEY (related_user_id)
        // REFERENCES users(id)
        // ON DELETE CASCADE
        // `;
        // // post - related post
        // await sql`
        // ALTER TABLE notifications
        // ADD CONSTRAINT fk_notifications_related_post
        // FOREIGN KEY (related_post_id)
        // REFERENCES posts(id)
        // ON DELETE CASCADE
        // `;
        // -------------05/07/2025-------------------
        console.log("NOTIFICATION TABLE CREATED✅");
    }
    catch (error) {
        (0, error_log_1.errorLog)({ location: "create notification Table", error });
        throw new Error("Failed to notification table");
    }
};
exports.default = createNotificationTable;
