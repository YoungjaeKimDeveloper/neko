/*
    Auth validation
*/
import sql from "../../../../db/config/db";

export const passwordValidation = (password: string) => {
  return password.trim().length >= 6 ? true : false;
};

export const emailValidation = async (email: string) => {
  const result = await sql`
    SELECT * 
    FROM users
    WHERE email = ${email} 
    `;
  return result.length > 0 ? true : false;
};

export const usernameValidation = async (user_name: string) => {
  const result = await sql`
    SELECT * 
    FROM users
    WHERE user_name = ${user_name} 
    `;
  return result.length > 0 ? true : false;
};
