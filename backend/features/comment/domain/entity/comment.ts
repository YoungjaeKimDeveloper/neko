/*

    Comment Model

*/

export type Comment = {
  id?: string;
  content: string;
  created_at?: Date;
  user_id: string;
  post_id: string;
  user_name?: string;
  user_profile_image?: string;
};
