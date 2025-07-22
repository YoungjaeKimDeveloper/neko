/*

    Implement Like Repo with Neon
    1. Like Post
    2. Unlike Post
*/

import sql from "../../../db/config/db";
import { errorLog } from "../../../../shared/error/error.log";
import { LikeDto, UnLikeDTO } from "../domain/dto/like.dto";
import type Like from "../domain/entity/like";
import type LikeRepo from "../domain/repo/like.repo";

class NeonLikeRepo implements LikeRepo {
  likePost = async (params: LikeDto): Promise<Like | null> => {
    try {
      console.log("Like Post +Neon function called from like.controller.ts");
      const result = await sql`
            INSERT INTO likes
            VALUES (${params.user_id},${params.post_id})
            ON CONFLICT DO NOTHING
            RETURNING *
            `;
      return result.length > 0 ? (result[0] as Like) : null;
    } catch (error: any) {
      errorLog({ location: "NeonLikeRepo - like", error });
      console.log("Did you call me - LikePost - error?");
      return null;
    }
  };
  unLikePost = async (params: UnLikeDTO): Promise<Like | null> => {
    console.log("UnlikePost + Neon function called from like.controller.ts");
    try {
      console.log("Did you call me - unLike Post - success?");
      const result = await sql`
        DELETE FROM likes
        WHERE user_id = ${params.user_id} AND post_id = ${params.post_id}
        RETURNING * 
        `;
      return result.length > 0 ? (result[0] as Like) : null;
    } catch (error: any) {
      console.log("Did you call me - unLike Post - error?");
      errorLog({ location: "NeonLikeRepo - unlike", error });
      return null;
    }
  };
}

export default NeonLikeRepo;
