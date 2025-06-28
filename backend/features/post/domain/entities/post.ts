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
