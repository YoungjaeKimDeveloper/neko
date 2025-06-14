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
    1.CreatePost 
    2.fetchPostByUserId
    3.update 
    4. delete Post

*/
// Neon Instance
const neonPostRepo = new NeonPostRepo();
interface VerifiedUserRequest extends Request {
  user: User;
}

export const createPost = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    if (!(req as VerifiedUserRequest).user) {
      return res.status(401).json({ success: false, message: "INVALUD USER" });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    let finalResult = "";

    const { title, content, image_url, reward_amount, location } = req.body;
    // Validation - 0
    if (!title || !content || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, content, or location",
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
    // Follow the interface
    const postDTO: CreatePostDTO = {
      title: title,
      content: content,
      image_url: finalResult,
      user_id: userId,
      reward_amount: reward_amount,
      location: location,
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

export const fetchPosts = async (req: Request, res: Response<ResponseDTO>) => {
  try {
    if (!(req as VerifiedUserRequest).user) {
      return res.status(401).json({ success: false, message: "INVALUD USER" });
    }
    const userId = (req as VerifiedUserRequest).user.id;
    const result = await neonPostRepo.fetchPostsByUserId({ userId });
    return res
      .status(200)
      .json({ success: true, message: "Posts fetched", data: result });
  } catch (error) {
    errorLog({ location: "FetchPosts", error: error });
    return res
      .status(500)
      .json({ success: false, message: "Internal ERROR in fetch posts" });
  }
};
