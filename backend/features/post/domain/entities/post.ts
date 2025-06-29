import { Comment } from "../../../comment/domain/entity/comment";
import Like from "../../../like/domain/entity/like";

/*

    post entity interface
    27/06/2025 
    - Update field
      - image_url:string -> images_urls:string[]

 */
export type Post = {
  id?: string;
  title: string;
  content: string;
  image_urls: string[];
  user_id: string;
  is_found?: boolean;
  reward_amount?: number;
  location?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type PostWithWriter = Post & {
  user_name: string;
  user_profile_image: string;
};

export type PostWithWriterWithComment = Post & {
  user_name: string;
  user_profile_image: string;
};

// Name matching with alias
export type SinglePostWithComments = {
  post_id: string;
  post_user_id: string;

  post_title: string;
  post_content: string;
  post_image_urls: string[];
  post_created_at: Date;
  post_reward_amount: number;
  post_location: string;

  user_id: string;
  user_name: string;
  user_profile_image: string;

  comment_id: string;
  comment_user_id: string;
  comment_post_id: string;
  comment_content: string;
  comment_created_at: Date;

  like_user_id: string;
  like_post_id: string;

  message?: any;
};

// Denormalised Post
export type DenormalisedPost = {
  message?: string;
  post: PostWithWriter;
  comments: Comment[];
  likes: Like[];
};
