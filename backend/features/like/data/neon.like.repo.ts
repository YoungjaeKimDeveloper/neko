/*

    Implement Like Repo with Neon
    1. Like Post
    2. Unlike Post
*/

import sql from "../../../db/config/db";
import { errorLog } from "../../../lib/utils/error/error.log";
import { LikeDto, UnLikeDTO } from "../domain/dto/like.dto";
import Like from "../domain/entity/like";
import LikeRepo from "../domain/repo/like.repo";

class NeonLikeRepo implements LikeRepo {
  likePost = async (params: LikeDto): Promise<Like | null> => {
    try {
      const result = await sql`
            INSERT INTO likes
            VALUES (${params.user_id},${params.post_id})
            RETURNING *
            `;
      return result.length > 0 ? (result[0] as Like) : null;
    } catch (error: any) {
      errorLog({ location: "NeonLikeRepo - like", error });

      return null;
    }
  };
  unLikePost = async (params: UnLikeDTO): Promise<Like | null> => {
    try {
      const result = await sql`
        DELETE FROM likes
        WHERE user_id = ${params.user_id} AND post_id = ${params.post_id}
        RETURNING * 
        `;
      return result.length > 0 ? (result[0] as Like) : null;
    } catch (error: any) {
      errorLog({ location: "NeonLikeRepo - unlike", error });
      return null;
    }
  };
}

export default NeonLikeRepo;
