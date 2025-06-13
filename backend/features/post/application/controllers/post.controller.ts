import { Request, Response } from "express";
import User from "../../../auth/domain/entities/user";
import cloudinary from "../../../../lib/cloudinary/cloudinary.config";
import { CreatePostDTO } from "../../domain/dto/post.dto";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
/*
    POST API(Hanlder)
    POST DB <----> POST API <----> Frontend
*/

// interface PostRequest extends Request {
//   user: User;
// }

export const createPost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    // const userId = req.user.id;

    // let finalResult = "";

    // const { title, content, image_url } = req.body;
    // // + image
    // if (image_url) {
    //   const url = (await cloudinary.uploader.upload(image_url)).secure_url;
    //   finalResult = url;
    // }
    // const postDTO: CreatePostDTO = {
    //   title: title,
    //   content: content,
    //   image_url: finalResult,
    //   user_id: userId,
    // };
    // // No image

    return res.status(200).json({ success: true, message: "Usccess" });
  } catch (error) {
    return res.status(200).json({ success: true, message: "Usccess" });
  }
};
