import {
  CreatePostDTO,
  UpdatePostDTO,
} from "../../../../../shared/dto/post/post.dto";
import { Post, SinglePostWithComments } from "../entities/post";

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
  // FETCH ALL POSTS
  fetchAllPosts(): Promise<Post[] | null>;
  // FETCH SINGLE POST
  fetchSinglePost(params: { postId: string }): Promise<Post | null>;
  // FETCH SINGLE POST WITH COMMENTS
  fetchSinglePostWithComments(params: {
    postId: string;
  }): Promise<SinglePostWithComments | null>;
}
