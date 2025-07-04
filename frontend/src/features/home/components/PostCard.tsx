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
import toast from "react-hot-toast";
import { errorLogV2 } from "../../../../../shared/error/error.log";
// Interface
interface PostCardProps {
  post: PostWithWriter;
}

type CurrentUser = User;

// Component
const PostCard = ({ post }: PostCardProps) => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData(["authUser"]);
  const currentUserId = (currentUser as CurrentUser).id;
  const postId = post.id;

  // show menubar
  const [isShowMenubar, setIsShowMenubar] = useState<boolean>(false);
  const [isDeletingPost, setIsDeletingPost] = useState<boolean>(false);
  // DELETE POST
  const { mutate: deletePost } = useMutation({
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
      toast.success("Posts deleted success fully");
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsDeletingPost(false);
    },
    onError: (error) => {
      toast.error("Failed to delete Post");
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
  console.log("POST", post);
  // BUILD UI
  return (
    <div className="card w-[275px] h-fit shadow-md bg-gray-100 ">
      {/* Top */}
      <div className="flex items-center justify-between py-2 relative ">
        <div className="flex items-center justify-between gap-x-2 py-2 px-3 ">
          <img
            className="size-8 rounded-full object-cover"
            src={post.user_profile_image ?? "/userProfile.png"}
            alt="user-profile"
          />
          {/* username */}
          <p>{post.user_name}</p>
        </div>
        {currentUserId == post.user_id && (
          <EllipsisVertical
            className="size-4 mr-2 cursor-pointer"
            onClick={() => setIsShowMenubar((prev) => !prev)}
          />
        )}
        {/* Menu bar...focus */}
        {isShowMenubar && (
          <ul className="menu menu-horizontal  lg:menu-horizontal bg-base-200 rounded-box absolute  right-[30px] gap-x-4">
            <button
              disabled={isDeletingPost}
              onClick={() => deletePost()}
              className={`${isDeletingPost && "opacity-50"}`}
            >
              <Trash2 className="size-5" />
            </button>
            <button>
              <Pencil className="size-5" />
            </button>
          </ul>
        )}
      </div>
      {/* Middle -image */}

      <img
        src={
          post?.image_urls[0] ??
          "https://cdn.pixabay.com/photo/2020/10/05/10/51/cat-5628953_1280.jpg"
        }
        alt="cat_img"
        className="w-full aspect-square object-center rounded-t-lg"
      />

      {/* Bottom Details */}
      <div className="px-2 py-2">
        {/* top */}
        <div className="flex justify-between items-center">
          <p className="text-xl">{post.title}</p>
          <div className="flex items-center text-sm">
            <MapPin className="size-4 text-red-500 stroke-[3]" />
            <p>{post.location}</p>
          </div>
        </div>
        {/* Date */}
        <p className="text-sm ">
          <span className="text-[12px] text-gray-500">
            {post.created_at
              ? formatDistanceToNow(new Date(post.created_at!), {
                  addSuffix: true,
                })
              : ""}
          </span>
        </p>
        {/* Details */}
        <p className="w-[40%] h-[20px] overflow-hidden text-base text-gray-500">
          {post.content}
        </p>
        {/* Last Bottom */}
        <div className="flex justify-between items-center">
          {/* Icons + price */}
          <div className="flex py-4 items-center gap-x-1">
            <Gift className="size-5" />
            <p className="text-gray-400">
              $
              <span className="text-[15px]">
                {post.reward_amount == 0 ? "Volunteer" : post.reward_amount}
              </span>
            </p>
          </div>
          <Link to={`/posts/${post.id}`}>
            <button className="px-2 text-sm bg-white font-content h-[30px] rounded-md">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
