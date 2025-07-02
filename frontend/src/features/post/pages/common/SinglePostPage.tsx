/*


    Single Post + Comments
    1.fetch Single page  
*/
import { useRef } from "react";
import {
  Cat,
  CircleChevronLeftIcon,
  CircleChevronRight,
  Clover,
  Gift,
  Loader,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { AuthDesktopSidebar } from "../../../auth/components/desktop/AuthDesktopSidebar";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../shared/api/axios";
import toast from "react-hot-toast";

import { errorLogV2 } from "../../../../../../shared/error/error.log";
import LoadingPage from "../../../../shared/pages/common/LoadingPage";
import type { DenormalisedPost } from "../../../../../../backend/features/post/domain/entities/post";
import { formatDistanceToNow } from "date-fns";
import Comment from "../../components/common/Comment";
import { useState } from "react";
import type { ResponseDTO } from "../../../../../../shared/dto/common/response.dto";
import type User from "../../../../../../backend/features/auth/domain/entities/user";

// Component
const SinglePostPage = () => {
  // Refetence Comment
  const commentRef = useRef<HTMLInputElement>(null);
  const [immageNumber, setImmageNumber] = useState<number>(0);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const [isShowComment, setIsShowComment] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // fetch single post

  // Todo - Refactoring to wrtie clean code - Divide the file
  const { data: res, isLoading } = useQuery({
    // (caching key
    queryKey: ["post", postId],
    queryFn: async () => {
      try {
        console.log(postId);
        const result = await axiosInstance.get<{ data: DenormalisedPost }>(
          `/posts/${postId}`
        );
        toast.success("Data fetched successfully");
        return result.data;
      } catch (error) {
        errorLogV2({
          file: "SinglePostPage.tsx",
          function: "fetch single post useQuery",
          error: error,
        });
      }
    },
  });
  // Verified User
  const currentUser = queryClient.getQueryData(["authUser"]);
  const currentUserId = (currentUser as User).id;
  // Create Comment
  const { mutate: createComment, isLoading: isCommenting } = useMutation({
    mutationFn: async () => {
      // Create Comment
      const content = commentRef.current?.value;
      if (content?.trim().length === 0 || content == null) {
        throw new Error("Please write the comment");
      }
      await axiosInstance.post(`/comments/posts/${postId}`, {
        content: content,
      });
    },

    onSuccess: () => {
      if (commentRef.current) {
        commentRef.current.value = "";
      }
      toast.success("Comment created");
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error?.message);
      }
    },
  });
  // Like Post
  const { mutate: LikePost } = useMutation({
    mutationFn: async () => {
      try {
        const result = await axiosInstance.post<ResponseDTO>(
          `/likes/post/${postId}`
        );
        if (result.data.success != true) {
          throw new Error("Failed to like the post");
        }
        toast.success("Like the post Successfully");
      } catch (error) {
        if (error instanceof Error) {
          errorLogV2({
            file: "SinglePost.tsx",
            function: "LikePost TanStack Query",
            error: error,
          });
          toast.error("Failed to like the post");
        }
      }
    },
  });
  // HandleComment
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
  };
  if (isLoading) {
    return <LoadingPage />;
  }

  const toggleShowComment = () => {
    setIsShowComment((prev) => !prev);
  };
  // previous - right
  const handleNextImage = () => {
    if (immageNumber == res!.data.post.image_urls.length - 1) {
      if (res?.data.post.image_urls.length) {
        setImmageNumber(0);
      }
    } else {
      setImmageNumber((prev) => prev + 1);
    }
  };
  // previous - left
  const handlePreviousImage = () => {
    if (immageNumber == 0) {
      if (res?.data.post.image_urls.length) {
        setImmageNumber(res?.data.post.image_urls.length - 1);
      }
    } else {
      setImmageNumber((prev) => prev - 1);
    }
  };
  // Copy current URL
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied🍀");
      setIsCopied(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to copy address");
        errorLogV2({
          file: "SinglePostPage.tsx",
          function: "HandleShare",
          error: error,
        });
      }
    }
  };
  const isIncludeUserId = res?.data.likes.some(
    (like) => like.user_id == currentUserId
  );
  console.log(res);

  // BUILD UI
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <AuthDesktopSidebar />
      {/* Right main */}
      {/* Container */}
      <div className="w-[40%] flex flex-col gap-y-10 mx-auto  h-fit gap-x-4">
        <div className="mx-auto mt-5  w-full">
          {/* Main Picture + Status bar */}
          <div className="w-full rounded-sm relative">
            {/* Main page */}
            <img
              src={res?.data?.post?.image_urls[immageNumber]}
              alt="hero_image"
              className="w-full h-[250px] rounded-t-lg"
            />
            {/* Left btn */}
            <CircleChevronLeftIcon
              className="absolute top-[40%] size-10"
              onClick={handlePreviousImage}
            />
            {/* Right btn */}
            <CircleChevronRight
              className="absolute right-0 top-[40%] size-10"
              onClick={handleNextImage}
            />
            {/* Status bar */}
            <div className="flex justify-between p-2 rounded-b-xl bg-gray-100">
              {/* Cat + like */}
              <div className="flex">
                <Cat
                  className={`${
                    isIncludeUserId && "fill-red-200 stroke-white"
                  }`}
                  onClick={() => LikePost()}
                />
                <span>({res?.data.likes.length})</span>
              </div>
              {/* Comments */}
              <div className="flex hover:cursor-pointer">
                <MessageCircle
                  className={`${
                    isShowComment && "fill-green-300 stroke-white"
                  }`}
                  onClick={() => toggleShowComment()}
                />
                <p>({res?.data?.comments.length ?? 0})</p>
              </div>
              {/* Share */}
              <div
                className="flex hover:cursor-pointer"
                onClick={() => handleShare()}
              >
                <Clover
                  className={`${
                    isCopied && "stroke-green-500 fill-green-500"
                  }}`}
                />
                <p>Share</p>
              </div>
            </div>
          </div>
          {/* Details */}
        </div>
        <div className="w-full rounded-card gap-x-10 flex flex-col p-4 shadow-md">
          {/* Top - userinfo + details */}
          <div className="flex justify-between items-center mb-4 ">
            {/* User-info */}
            <div className="flex items-center gap-x-2">
              <img
                src={
                  res?.data?.post?.user_profile_image ??
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                }
                alt="writer_user"
                className="size-10 rounded-full"
              />
              {/* Details */}
              <div>
                <p className="text-base">{res?.data?.post?.user_name}</p>
                <p className="text-sm text-gray-400">
                  {res?.data?.post?.created_at &&
                    formatDistanceToNow(new Date(res?.data?.post?.created_at), {
                      addSuffix: true,
                    })}
                </p>
              </div>
            </div>
            {/* Price + Location */}
            <div className="flex flex-col justify-between h-[50px]">
              {/* Price +Icon */}
              <div className="flex items-center gap-x-1">
                <Gift />
                <p>${res?.data?.post?.reward_amount}</p>
              </div>
              {/* Icon + Location */}
              <div className="flex items-center justify-center">
                <MapPin className="text-warning" />
                <p>{res?.data?.post?.location}</p>
              </div>
            </div>
          </div>
          {/* Bottom - Description */}
          <div>
            <p className="px-2">{res?.data?.post?.content}</p>
          </div>
        </div>
        {/* Comments bar */}
        <form
          className=" flex items-center rounded-tr-lg rounded-lg  bg-gray-50"
          onSubmit={(e) => handleComment(e)}
        >
          <input
            ref={commentRef}
            type="text"
            className="input w-full bg-gray-200"
          />
          <div className="font-content ">
            <button
              type="submit"
              className="rounded-lg px-4"
              disabled={isLoading}
            >
              {isCommenting ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Comment</span>
              )}
            </button>
          </div>
        </form>
        {/* Comments */}
        {isShowComment &&
          res?.data?.comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default SinglePostPage;
