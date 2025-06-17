/*

  Generate Token

*/
import jwt from "jsonwebtoken";
export const generateToken = (email: string) => {
  const jwtKey = process.env.JWT_SECRET;
  if (jwtKey == null) {
    throw new Error("JWT_SECRENT IS NOT EXISTED");
  }
  const token = jwt.sign({ email: email }, jwtKey, {
    expiresIn: "3d",
  });
  return token;
};
