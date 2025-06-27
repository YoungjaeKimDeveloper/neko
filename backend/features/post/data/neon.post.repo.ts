/*

    Implement core functionality with Neon
    
    27/06/2025
    Neon <---> API <---> Front-end
*/

import sql from "../../../db/config/db";
import { errorLog } from "../../../../shared/error/error.log";
import {
  CreatePostDTO,
  UpdatePostDTO,
} from "../../../../shared/dto/post/post.dto";
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
            ${post.image_urls},
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
      errorLog({ location: "create post neon rpo", error });
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
      errorLog({ location: "fetchPostByUserId Neon", error });
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
        image_url = ${params.updated_image_urls},
        location = ${params.updated_location},
        reward_amount= ${params.updated_reward_amount},
        is_found = ${params.updated_is_found},
        updated_at = now()
        WHERE id = ${params.postId}
        RETURNING *
      `;
      return (result[0] as Post) ?? null;
    } catch (error: any) {
      errorLog({ location: "neon repo update Post", error });
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
      errorLog({ location: "neoPost repo - deletePost", error });
    }
  };
  // + fetch single item to match the writer and looged user
  fetchSinglePost = async (params: {
    postId: string;
  }): Promise<Post | null> => {
    // console.log(`HERE IS THE POSTID:,${params.postId}`);
    try {
      const posts = await sql`
        SELECT * 
        FROM posts
        WHERE id= ${params.postId}
      `;
      // console.log("HERE IS THE POSTS: ", posts);
      if (posts.length === 0) {
        return null;
      }
      return posts[0] as Post;
    } catch (error: any) {
      errorLog({ location: "FetchSingle Post - neon repo", error });
      return null;
    }
  };
}

export default NeonPostRepo;
