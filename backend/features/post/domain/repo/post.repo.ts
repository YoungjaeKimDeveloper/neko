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
interface CreatePostDTO {
  title: string;
  content: string;
  image_url: string;
  user_id: string;
}
// UPDATE POST DTO INTERFACE
interface UpdatePostDTO {
  postId: string;
  updatedTitle?: string;
  updatedContent?: string;
  updatedImageUrl?: string;
  user_id: string;
}

export default interface PostRepo {
  // CREATE
  createPost(post: CreatePostDTO): Promise<Post | null>;
  // READ
  fetchPostByUserId(params: { userId: string }): Promise<Post[] | []>;
  // UPDATE
  updatePost(params: UpdatePostDTO): Promise<Post | null>;
  // DELETE
  deletePost(params: { postId: string }): Promise<void>;
}
