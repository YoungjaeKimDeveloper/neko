import { Response, Request } from "express";

export const signup = (req: Request, res: Response) => {
  try {
    // email,password,user_name
    const { email, password, user_name } = req.body;
    
  } catch {}
};
