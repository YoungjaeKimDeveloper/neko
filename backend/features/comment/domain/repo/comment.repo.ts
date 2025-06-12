import { CommentRequestDTO } from "../dto/comment.request.dto";
import Comment from "../entity/comment";
/*
    DDD(Domain-Driven Development)
    CORE LOGIC FOR COMMENT
    1.create
    2.delete

*/

export default interface CommentRepo {
  createComment(comment: CommentRequestDTO): Promise<Comment | null>;
  deleteComment(params: { id: string }): Promise<void>;
}
