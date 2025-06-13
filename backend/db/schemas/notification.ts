/*

    Notification Schema

*/

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
    console.error(
      "FAILED TO CREATE Notification TABLE MESSAGE: ",
      error.message
    );
    console.error("FAILED TO CREATE Notification TABLE Trace :", error.stack);
  }
};

export default createNotificationTable;
