/*
    Implement core logic based on authRepo
    1. Signup
    2. Login
*/

import sql from "../../../db/config/db";
import User from "../domain/entities/user";
import { AuthRepo } from "../domain/repo/auth.repo";

class AuthNeonRepo implements AuthRepo {
  // Signup
  signUp = async (
    email: string,
    password: string,
    user_name: string
  ): Promise<User | null> => {
    try {
      const newUser = await sql`
        INSERT INTO users(email,password,user_name)
        VALUES (${email},${password},${user_name})
        RETURNING *;
        `;
      return newUser.length > 0 ? (newUser[0] as User) : null;
    } catch (error: any) {
      console.error("FAILED TO CREATE NEW USER:", error.message);
      console.error("FAILED TO CREATE NEW USER:", error.stack);
      return null;
    }
  };
  //   Login
  login = async (email: string, password: string): Promise<User | null> => {
    try {
      const user = await sql`
        SELECT * 
        FROM users
        WHERE email = ${email} AND password = ${password}
        `;
      return user.length > 0 ? (user[0] as User) : null;
    } catch (error: any) {
      console.error("FAILED TO login in AUTHNEON:", error.message);
      console.error("FAILED TO login in AUTHNEON:", error.stack);
      return null;
    }
  };
}

export default AuthNeonRepo;
