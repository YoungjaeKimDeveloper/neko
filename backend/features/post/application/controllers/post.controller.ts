import { Request, Response } from "express";
import User from "../../../auth/domain/entities/user";
import cloudinary from "../../../../lib/cloudinary/cloudinary.config";
import { CreatePostDTO } from "../../domain/dto/post.dto";
import { ResponseDTO } from "../../../../lib/dto/response.dto";
import NeonPostRepo from "../../data/neon.post.repo";
import { errorLog } from "../../../../lib/utils/error/error.log";
/*
    POST API(Hanlder)
    POST DB <----> POST API <----> Frontend
*/
// Neon Instance
const neonPostRepo = new NeonPostRepo();
interface PostRequest extends Request {
  user: User;
}

export const createPost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    if (!(req as PostRequest).user) {
      return res.status(401).json({ success: false, message: "INVALUD USER" });
    }
    const userId = (req as PostRequest).user.id;
    let finalResult = "";

    const { title, content, image_url } = req.body;
    // Validation - 0
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, content, or image_url",
      });
    }
    // + image
    if (image_url) {
      try {
        const url = (await cloudinary.uploader.upload(image_url)).secure_url;
        finalResult = url;
      } catch (error) {
        errorLog({ location: "Creat post cloudinary", error });
      }
    }
    const postDTO: CreatePostDTO = {
      title: title,
      content: content,
      image_url: finalResult,
      user_id: userId,
    };
    const result = await neonPostRepo.createPost(postDTO);
    if (result == null) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create new Post" });
    }
    return res
      .status(200)
      .json({ success: true, message: "New Post created✅", data: result });
  } catch (error) {
    errorLog({ location: "createPost", error: error });
    return res
      .status(500)
      .json({ success: false, message: "Failed to create new Post" });
  }
};
