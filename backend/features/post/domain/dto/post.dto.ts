export interface CreatePostDTO {
  title: string;
  content: string;
  image_url: string;
  user_id: string;
}
// UPDATE POST DTO INTERFACE
export interface UpdatePostDTO {
  postId: string;
  updatedTitle?: string;
  updatedContent?: string;
  updatedImageUrl?: string;
  user_id: string;
}
