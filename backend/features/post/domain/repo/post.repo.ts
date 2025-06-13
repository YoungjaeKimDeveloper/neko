import { CreatePostDTO, UpdatePostDTO } from "../dto/post.dto";
import Post from "../entities/post";

/*
    PROMISE!
    POST CORE & PURE LOGIC - Contract
    - CREATE
    - READ
    - UPDATE
    - DELETE
*/

// CREATE POST DTO INTERFACE

export default interface PostRepo {
  // CREATE
  createPost(post: CreatePostDTO): Promise<Post | null>;
  // READ
  fetchPostsByUserId(params: { userId: string }): Promise<Post[] | []>;
  // UPDATE
  updatePost(params: UpdatePostDTO): Promise<Post | null>;
  // DELETE
  deletePost(params: { postId: string }): Promise<void>;
}
