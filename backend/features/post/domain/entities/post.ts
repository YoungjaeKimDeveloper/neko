/*

    post entity interface

 */
export default interface Post {
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  user_id: string;
  created_at?: Date;
}
