/*
    Contract
    Core Functionality - Auth
    Class
    - Methods
        - 1. Signup
            - (enail,password,username)
        - 2. Login
         - (email,password)
        - 3. Logout
            - logout
        - 4. getCurrentUser
            - getCurrentUser
 */

import type User from "../entities/user";

export interface AuthRepo {
  // Signup
  signUp(
    email: string,
    password: string,
    user_name: string
  ): Promise<User | null>;
  // Login
  login(email: string, password: string): Promise<User | null>;
}
