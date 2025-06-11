/*

    Implement core functionality with Neon

*/

import { CreatePostDTO, UpdatePostDTO } from "../domain/dto/post.dto";
import Post from "../domain/entities/post";
import PostRepo from "../domain/repo/post.repo";

class PostNeon implements PostRepo {
  createPost(post: CreatePostDTO): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }
  fetchPostByUserId(params: { userId: string }): Promise<Post[] | []> {
    throw new Error("Method not implemented.");
  }
  updatePost(params: UpdatePostDTO): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }
  deletePost(params: { postId: string }): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
