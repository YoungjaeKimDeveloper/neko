export interface CreatePostDTO {
  title: string;
  content: string;
  image_url?: string;
  reward_amount?: number;
  user_id: string;
}
// UPDATE POST DTO INTERFACE
export interface UpdatePostDTO {
  postId: string;
  updatedTitle?: string;
  updatedContent?: string;
  updatedImageUrl?: string;
  reward_amount?: number;
  is_found?: boolean;
  updated_at?: Date;
}
