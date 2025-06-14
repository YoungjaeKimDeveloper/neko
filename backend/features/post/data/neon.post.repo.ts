/*

    Implement core functionality with Neon

*/

import sql from "../../../db/config/db";
import { errorLog } from "../../../lib/utils/error/error.log";
import User from "../../auth/domain/entities/user";
import { CreatePostDTO, UpdatePostDTO } from "../domain/dto/post.dto";
import Post from "../domain/entities/post";
import PostRepo from "../domain/repo/post.repo";

class NeonPostRepo implements PostRepo {
  // CREATE POST
  createPost = async (post: CreatePostDTO): Promise<Post | null> => {
    try {
      const newPost = await sql`
          INSERT INTO posts(title,content,image_url,reward_amount,location, user_id)
          VALUES (
            ${post.title},
            ${post.content},
            ${post.image_url ?? null},
            ${post.reward_amount ?? 0},
            ${post.location}, 
            ${post.user_id})
          RETURNING *
          `;
      if (newPost == null) {
        return null;
      }
      return newPost[0] as Post;
    } catch (error: any) {
      console.error("ERROR IN createPost: ", error.message);
      console.error("ERROR IN createPost: ", error.stack);
      return null;
    }
  };

  fetchPostsByUserId = async (params: {
    userId: string;
  }): Promise<Post[] | []> => {
    try {
      const posts = await sql`
        SELECT * 
        FROM posts
        WHERE id= ${params.userId}
      `;
      if (posts == null) {
        return [];
      }
      return posts as Post[];
    } catch (error: any) {
      console.error("ERROR IN createPost: ", error.message);
      console.error("ERROR IN createPost: ", error.stack);
      return [];
    }
  };

  updatePost = async (params: UpdatePostDTO): Promise<Post | null> => {
    try {
      // Dynamic Object

      const result = await sql`
        UPDATE posts
        SET 
        title = ${params.updated_title},
        content = ${params.updated_content},
        image_url = ${params.updated_imageUrl},
        location = ${params.upDated_location},
        reward_amount= ${params.updated_reward_amount},
        is_found = ${params.updated_is_found},
        updated_at = now()
        WHERE id = ${params.postId}
        RETURNING *
      `;
      return (result[0] as Post) ?? null;
    } catch (error: any) {
      console.error("ERROR IN updateFields: ", error.message);
      console.error("ERROR IN updateFields: ", error.stack);
      return null;
    }
  };

  deletePost = async (params: { postId: string }): Promise<void> => {
    try {
      await sql`
      DELETE FROM posts
      WHERE id = ${params.postId}
      RETURNING *
      `;
      console.log("POST HAS BEEN DELETED");
    } catch (error: any) {
      console.error("ERROR IN deletePost: ", error.message);
      console.error("ERROR IN deletePost: ", error.stack);
    }
  };
  // + fetch single item to match the writer and looged user
  fetchSinglePost = async (params: {
    postId: string;
  }): Promise<Post | null> => {
    try {
      const posts = await sql`
        SELECT * 
        FROM posts
        WHERE post_id= ${params.postId}
      `;
      if (posts == null) {
        return null;
      }
      return posts[0] as Post;
    } catch (error: any) {
      errorLog({ location: "FetchSingle Post", error });
      return null;
    }
  };
}

export default NeonPostRepo;
