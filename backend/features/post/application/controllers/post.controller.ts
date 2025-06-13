import { Request, Response } from "express";
import User from "../../../auth/domain/entities/user";
/*
    POST API(Hanlder)
    POST DB <----> POST API <----> Frontend
*/

interface PostRequest extends Request {
  user: User;
}

export const createPost = (req: PostRequest, res: Response) => {
  try {
    const userId = req.user.id;
    let newPost;
    const { title, content, image_url } = req.body;
    if(image_url)
  } catch (error) {}
};
