import { SignUpDTO } from "../dto/request/auth.request.dto";
import { Response, Request } from "express";
// params,res,request,query
export const signup = (req: Request<{}, {}, SignUpDTO>, res: Response) => {
  try {
    // email,password,user_name
    const { email, password, userName: user_name } = req.body;
    if (!email || !password || !!user_name) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill up the all forms" });
    }
  } catch {}
};
