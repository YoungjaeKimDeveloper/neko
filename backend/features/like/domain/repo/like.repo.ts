/*

    Core logic for like
    1.Like
    2.Unlike

*/

import { LikeDto } from "../dto/like.dto";
import { UnLikeDTO } from "../dto/like.dto";
import type Like from "../entity/like";

export default interface LikeRepo {
  likePost(params: LikeDto): Promise<Like | null>;
  unLikePost(params: UnLikeDTO): Promise<Like | null>;
}
