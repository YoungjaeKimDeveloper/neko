/*
    Post card component
*/
import { EllipsisVertical, Gift, MapPin, Pencil, Trash2 } from "lucide-react";
import type { PostWithWriter } from "../../../../../backend/features/post/domain/entities/post";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type User from "../../../../../backend/features/auth/domain/entities/user";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../../shared/api/axios";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";

import { errorLogV2 } from "../../../../../shared/error/error.log.ts";
import type { UserProfile } from "../../../../../shared/dto/profile/profile.dto";
// Interface
interface PostCardProps {
  post: PostWithWriter;
}

type CurrentUser = User;

// Component
const PostCard = ({ post }: PostCardProps) => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<UserProfile>(["authUser"]);
  const currentUserId = (currentUser as CurrentUser).id;
  const postId = post.id;

  // show menubar
  const [isShowMenubar, setIsShowMenubar] = useState<boolean>(false);
  const [isDeletingPost, setIsDeletingPost] = useState<boolean>(false);
  // DELETE POST
  const { mutateAsync: deletePost } = useMutation({
    mutationFn: async () => {
      setIsDeletingPost(true);
      const result = await axiosInstance.delete<ResponseDTO>(
        `/posts/${postId}`
      );
      if (result.data.success !== true) {
        throw new Error("Failed to delete post");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["posts-found"] });
      await queryClient.invalidateQueries({ queryKey: ["posts-missing"] });
      setIsDeletingPost(false);
    },
    onError: (error) => {
      setIsDeletingPost(false);
      if (error instanceof Error) {
        errorLogV2({
          error: error,
          function: "Delete Post",
          file: "PostCard.tsx",
        });
      }
    },
  });
  const isCurrentUserProfile = currentUser?.user_name == post.user_name;

  const handleDeletePost = async () => {
    setIsDeletingPost(true);
    try {
      await deletePost();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsDeletingPost(false);
    }
  };

  // BUILD UI
  return (
    <div className="card w-[275px] h-fit shadow-md bg-gray-50 border-1 border-gray-200">
      {post.is_found && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-60 flex items-center justify-center z-10 rounded-xl">
          <p className="text-sm font-bold bg-gray-100 w-full text-center p-">
            Back to family
          </p>
        </div>
      )}
      <fieldset disabled={isDeletingPost}>
        {/* Top */}
        <div className="flex items-center justify-between py-2 relative ">
          <Link to={isCurrentUserProfile ? "/profile" : `/${post.user_name}`}>
            <div className="flex items-center justify-between gap-x-2 py-2 px-3">
              <img
                className="size-8 rounded-full object-cover"
                src={post.user_profile_image ?? "/userProfile.png"}
                alt="user-profile"
              />
              {/* username */}
              <p>{post.user_name}</p>
            </div>
          </Link>
          {currentUserId == post.user_id && (
            <EllipsisVertical
              className="size-4 mr-2 cursor-pointer"
              onClick={() => setIsShowMenubar((prev) => !prev)}
            />
          )}
          {/* Menu bar...focus */}
          {isShowMenubar && (
            <fieldset
              disabled={isDeletingPost}
              className="menu menu-horizontal lg:menu-horizontal bg-base-200 rounded-box absolute  right-[30px] gap-x-4"
            >
              <button
                disabled={isDeletingPost}
                onClick={() => handleDeletePost()}
                className={`${isDeletingPost && "opacity-50"}`}
              >
                <Trash2 className="size-5" />
              </button>
              <Link
                className={isDeletingPost ? "pointer-events-none" : ""}
                to={`/posts/${postId}/edit `}
              >
                <Pencil className="size-5" />
              </Link>
            </fieldset>
          )}
        </div>
        {/* Middle -image */}
      </fieldset>
      <Link to={`/posts/${post.id}`}>
        <img
          src={
            post?.image_urls[0] ??
            "https://cdn.pixabay.com/photo/2020/10/05/10/51/cat-5628953_1280.jpg"
          }
          alt="cat_img"
          className="w-full aspect-square object-cover rounded-t-lg object-center"
        />
      </Link>

      {/* Bottom Details */}
      <div className="px-4 py-2">
        {/* top */}
        <div className="flex justify-between items-center py-1">
          <p className="text-xl truncate capitalize h-[30px] w-[50%] font-bold">
            {post.title}
          </p>
          <div className="flex items-center max-w-[40%]">
            <MapPin className="size-6 text-red-500 shrink-0" />
            <p className="truncate capitalize">{post.location}</p>
          </div>
        </div>
        {/* Date */}
        <p className="text-sm">
          <span className=" text-gray-500">
            {post.created_at
              ? formatDistanceToNow(new Date(post.created_at!), {
                  addSuffix: true,
                })
              : ""}
          </span>
        </p>
        {/* Details */}
        <p className="w-[40%] h-[20px] text-gray-500 line-clamp-1">
          {post.content}
        </p>
        {/* Last Bottom */}
        <div className="flex justify-between items-center bg-red">
          {/* Icons + price */}
          <div className="flex py-4 items-endr gap-x-1">
            <Gift className="size-6 text-gray-600 " />
            <p className="text-gray-400">
              $
              <span className="text-[15px]">
                {post.reward_amount == 0 ? "Volunteer" : post.reward_amount}
              </span>
            </p>
          </div>
          {post.is_found ? (
            ""
          ) : (
            <Link to={`/posts/${post.id}`}>
              <button className="bg-gray-200 px-4 py-2 text-sm text-gray-500 hover:text-black duration-300 rounded-lg">
                <p>View</p>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
