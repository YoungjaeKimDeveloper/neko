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
  updated_title?: string;
  updated_content?: string;
  updated_imageUrl?: string;
  updated_reward_amount?: number;
  updated_location?: string;
  updated_is_found?: boolean;
  updated_at?: Date;
}
