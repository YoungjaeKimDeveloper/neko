/*

    Core logic for like
    1.Like
    2.Unlike

*/

import { LikeDto } from "../dto/like.dto";
import { UnLikeDTO } from "../dto/like.dto";

export default interface LikeRepo {
  likePost(params: LikeDto): Promise<void>;
  unLikePost(params: UnLikeDTO): Promise<void>;
}
