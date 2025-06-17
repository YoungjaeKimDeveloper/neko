import {
  CommentDeletetDTO,
  CommentRequestDTO,
} from "../dto/comment.request.dto";
import Comment from "../entity/comment";
/*
    DDD(Domain-Driven Development)
    CORE LOGIC FOR COMMENT
    1.create
    2.delete

*/

export interface CommentRepo {
  createComment(comment: CommentRequestDTO): Promise<Comment | null>;
  // fetchComments()
  deleteComment(params: CommentDeletetDTO): Promise<void>;
}
