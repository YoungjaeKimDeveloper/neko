/*

    Notification Schema

*/

import { errorLog } from "../../../shared/error/error.log";
import sql from "../config/db";

const createNotificationTable = async () => {
  try {
    await sql`
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
    console.log("NOTIFICATION TABLE CREATED✅");
  } catch (error: any) {
    errorLog({ location: "create notification Table", error });
    throw new error("Failed to notification table");
  }
};

export default createNotificationTable;
