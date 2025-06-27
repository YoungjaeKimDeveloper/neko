import bcrypt from "bcrypt";
/*
    Implement core logic based on authRepo
    1. Signup
    2. Login
*/

import sql from "../../../db/config/db";
import User from "../domain/entities/user";
import { AuthRepo } from "../domain/repo/auth.repo";
import { errorLog } from "../../../../shared/error/error.log";

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
      errorLog({ location: "neon Signup", error });
      return null;
    }
  };
  //   Login
  login = async (email: string, password: string): Promise<User | null> => {
    try {
      const users = await sql`
        SELECT * 
        FROM users
        WHERE email = ${email} 
        `;
      const user = users.length > 0 ? (users[0] as User) : null;
      const isMatch = await bcrypt.compare(password, user!.password);
      return isMatch ? user : null;
    } catch (error: any) {
      errorLog({ location: "neon login", error });
      return null;
    }
  };
}

export default AuthNeonRepo;
