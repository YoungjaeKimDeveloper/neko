/*

  IMPLEMENT Core logic with Rrep

 */

import sql from "../../../db/config/db";
import { CommentRequestDTO } from "../domain/dto/comment.request.dto";
import Comment from "../domain/entity/comment";
import { CommentRepo } from "../domain/repo/comment.repo";

class NeonCommentRepo implements CommentRepo {
  createComment = async (
    comment: CommentRequestDTO
  ): Promise<Comment | null> => {
    try {
      const newComment = await sql`
      INSERT INTO comments(content,user_id,post_id)
      VALUES (${comment.content}, ${comment.user_id}, ${comment.post_id})
      RETURNING * 
      `;

      return newComment?.length > 0 ? (newComment[0] as Comment) : null;
    } catch (error: any) {
      console.error("ERROR IN NeonCommentRepo: ", error.stack);
      console.error("ERROR IN NeonCommentRepo: ", error.message);
      return null;
    }
  };
  deleteComment = async (params: { id: string }): Promise<void> => {
    try {
      await sql`
      DELETE 
      FROM comments
      WHERE id = ${params.id}
      RETURNING * 
      `;
      console.log("Comment deleted✅");
    } catch (error: any) {
      console.error("ERROR IN deleteComment: ", error.stack);
      console.error("ERROR IN deleteComment: ", error.message);
      // 부른쪽에서 catch로 잡게됨
      throw new Error(`ERROR IN deleteComment:  ${error.message}`);
    }
  };
}

export default NeonCommentRepo;
