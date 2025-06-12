/*

    Comment Model

*/
export default interface Comment {
  id?: string;
  content: string;
  created_at?: Date;
  user_id: string;
  post_id: string;
}
