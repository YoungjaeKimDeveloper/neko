/*

  COMMENT DTO
  DATA TRANSACTION OBJECT

*/
export interface CommentRequestDTO {
  content: string;
  user_id: string;
  post_id: string;
}

export interface CommentDeletetDTO {
  comment_id: string;
}
