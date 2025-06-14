export interface CreatePostDTO {
  title: string;
  content: string;
  location: string;
  user_id: string;
  image_url?: string;
  reward_amount?: number;
}
// UPDATE POST DTO INTERFACE
export interface UpdatePostDTO {
  postId: string;
  updatedTitle?: string;
  updatedContent?: string;
  updatedImageUrl?: string;
  reward_amount?: number;
  location?: string;
  is_found?: boolean;
  updated_at?: Date;
}
