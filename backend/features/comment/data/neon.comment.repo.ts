/*

  IMPLEMENT Core logic with Repo

 */

import sql from "../../../db/config/db";
import { errorLog } from "../../../../shared/error/error.log";
import {
  CommentDeletetDTO,
  CommentRequestDTO,
} from "../domain/dto/comment.request.dto";

import { CommentRepo } from "../domain/repo/comment.repo";
import { Comment } from "./../domain/entity/comment";
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
      errorLog({ location: "Create Comment", error });
      return null;
    }
  };
  deleteComment = async (params: CommentDeletetDTO): Promise<void> => {
    try {
      await sql`
      DELETE 
      FROM comments
      WHERE id = ${params.comment_id}
      RETURNING * 
      `;
    } catch (error: any) {
      errorLog({ location: "Delete Comment", error });
      // 부른쪽에서 catch로 잡게됨
      throw new Error(`ERROR IN deleteComment:  ${error.message}`);
    }
  };
}

export default NeonCommentRepo;
