/*

    post entity interface

 */
export default interface Post {
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  user_id: string;
  is_found?: boolean;
  reward_amount?: number;
  location?: string;
  created_at?: Date;
  updated_at?: Date;
}
