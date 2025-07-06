/*


    Single Post + Comments
    1.fetch Single page  
*/
import { useEffect, useRef } from "react";
import {
  Cat,
  CircleChevronLeftIcon,
  CircleChevronRight,
  Clover,
  Gift,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { v4 as uuidV4 } from "uuid";
import { AuthDesktopSidebar } from "../../../auth/components/desktop/AuthDesktopSidebar";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../shared/api/axios";
import toast from "react-hot-toast";

import { errorLogV2 } from "../../../../../../shared/error/error.log";
import LoadingPage from "../../../../shared/pages/common/LoadingPage";
import type { DenormalisedPost } from "../../../../../../backend/features/post/domain/entities/post";
import { formatDistanceToNow } from "date-fns";
import CommentUI from "../../components/common/Comment";
import { useState } from "react";
import type { ResponseDTO } from "../../../../../../shared/dto/common/response.dto";
import type User from "../../../../../../backend/features/auth/domain/entities/user";
import type Like from "../../../../../../backend/features/like/domain/entity/like";
import type { Comment } from "../../../../../../backend/features/comment/domain/entity/comment";

// Component -
const SinglePostPage = () => {
  // Refetence Comment
  const commentRef = useRef<HTMLInputElement>(null);
  const [immageNumber, setImmageNumber] = useState<number>(0);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const [isShowComment, setIsShowComment] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // Fetch Post
  const {
    data: res,
    isLoading,
    isSuccess,
  } = useQuery({
    // (caching key
    queryKey: ["post", postId],
    queryFn: async () => {
      console.log(postId);
      const result = await axiosInstance.get<{ data: DenormalisedPost }>(
        `/posts/${postId}/full`
      );
      toast.success("Data fetched successfully");
      return result.data;
    },
    onError: (error) => {
      errorLogV2({
        file: "SinglePostPage.tsx",
        function: "fetch single post useQuery",
        error: error,
      });
    },
  });
  // 05/07/2025 - In case of deleting post

  // Focus - OPTIMISTIC UI - Likes
  const [likes, setLikes] = useState<Like[]>([]);
  // Focus - OPTIMISTIC UI - Comments
  const [optimisticComment, setOptimisticComment] = useState<Comment[]>([]);
  // Fetch the data only one time when page reload
  useEffect(() => {
    if (isSuccess) {
      setLikes(res.data.likes);
      setOptimisticComment(res.data.comments);
    }
  }, [isSuccess, res]);
  // Step1. Store Likes - Source of Truth
  // const [likes, setLikes] = useState<Like[]>(res?.data.likes ?? []);

  // Optimistic UI
  // Only for fake UI

  // Todo - Refactoring to wrtie clean code - Divide the file
  // Verified User
  const currentUser = queryClient.getQueryData(["authUser"]);
  const currentUserId = (currentUser as User).id;
  // Create Comment
  const { mutate: createComment, isLoading: isCommenting } = useMutation({
    mutationFn: async () => {
      // Create Comment
      if (commentRef.current?.value == null) {
        toast.error("Please write something");
        return;
      }
      const newComment: Comment = {
        id: uuidV4(),
        content: commentRef!.current!.value,
        user_id: currentUserId,
        post_id: postId!,
        user_name: (currentUser as Comment).user_name,
        user_profile_image: (currentUser as Comment).user_profile_image,
      };

      if (
        newComment.content?.trim().length === 0 ||
        newComment.content == null
      ) {
        throw new Error("Please write the comment");
      }
      await axiosInstance.post(`/comments/posts/${postId}`, {
        content: newComment.content,
      });
      return newComment;
    },

    onSuccess: () => {
      if (commentRef.current) {
        commentRef.current.value = "";
      }
      toast.success("Comment created");
    },
    onError: (error, newComment: Comment) => {
      // Roallback
      setOptimisticComment((prev) =>
        prev.filter((comment) => comment.id !== newComment.id)
      );
      if (error instanceof Error) {
        toast.error(error?.message);
      }
    },
  });
  // Like Post
  const { mutate: likePost, isPending: isLikePending } = useMutation({
    mutationFn: async (newLike: Like) => {
      // SEND ACTUCAL REQUEST TO BACKEND - 실제 백엔드로 보여주게됨
      const res = await axiosInstance.post<ResponseDTO>(
        `/likes/post/${postId}`
      );
      // 실페시 ERROR 던져서 - 강제로 ROLLBACK 시키도록함
      if (!res.data.success) throw new Error("Failed to like");
      // 여기에서 반환되는 값이 onSuccess/onERROR의 첫번쨰 인자로 들어가게됨
      return newLike;
    },
    onSuccess: () => {
      toast.success("Liked the post successfully");
    },
    onError: (error, variables: Like) => {
      // ROLLBACK - Cancel Like
      setLikes((prev) =>
        prev.filter((like) => like.user_id !== variables.user_id)
      );
      toast.error("ROLLBACK : failed to like");
      errorLogV2({
        file: "SinglePostPage.tsx",
        function: "LikePost - usemutation",
        error,
      });
    },
  });
  // unLike Post
  const { mutate: unLikePost, isPending: isUnLikePending } = useMutation({
    mutationFn: async (newLike: Like) => {
      // 실제로 백엔드로 DATA 전송하기
      const result = await axiosInstance.delete<ResponseDTO>(
        `/likes/post/${postId}`
      );
      // 서버에서 요청이 제대로 이루어지지않음
      if (!result.data.success) throw new Error("Failed to unlike post");
      // 여기에서 던진 newLike는 onSuccess / onError의 첫번쨰 인자로 받게됨
      return newLike;
    },
    // 실제로 백엔드에서 결과가 제대로진행됨 setLikes 업데이트해주기 -> useOptimistic이 의존하고있음으로 setLikes가 변경되면 자동으로 같이 변경됨
    onSuccess: () => {
      toast.success("UnLiked the post successfully");
    },
    // 백엔드에서 실패함 롤백해줘야함
    onError: (error, variables: Like) => {
      // setLikes((prev) => [...prev, newLike]);
      setLikes((prev) => [...prev, variables]);
      toast.error("Failed to unlike posts");
    },
  });
  // HandleComment
  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // new comment
    if (commentRef.current?.value != null) {
      const newComment: Comment = {
        content: commentRef.current?.value,
        post_id: postId!,
        user_id: currentUserId,
        user_name: (currentUser as User).user_name,
        user_profile_image: (currentUser as User).user_profile_image,
        created_at: new Date(),
      };
      await setOptimisticComment((prev) => [newComment, ...prev]);
      // UPDATE OPTIMISTIC UI

      // RESET VALUE
      createComment(newComment);
    }
    // Optimistic UI first

    // Rollback
  };
  const handleLikePost = () => {
    const isLiked = likes.some((like) => like.user_id === currentUserId);
    const newLike: Like = {
      post_id: postId!,
      user_id: currentUserId,
    };
    if (isLikePending || isUnLikePending) {
      return;
    }
    if (isLiked) {
      // UNLIKE POST
      setLikes((prev) =>
        prev.filter((like) => like.user_id !== newLike.user_id)
      );
      unLikePost(newLike);
    } else {
      // LIKE POST
      if (!likes.some((like) => like.user_id === currentUserId)) {
        setLikes((prev) => [...prev, newLike]);
        likePost(newLike);
      }
    }
  };
  if (isLoading) {
    return <LoadingPage />;
  }
  // -------------------------------------
  // helper functions - Non crucial tasks
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
  // -------------------------------------
  const isLiked = likes.some((like) => like.user_id == currentUserId);
  console.log("RES", res);
  console.log("optimisticLikes", likes);
  console.log("optimistic UI Comments", optimisticComment);

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
              className="w-full aspect-video rounded-t-lg "
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
                <button
                  disabled={isLikePending || isUnLikePending}
                  onClick={() => handleLikePost()}
                >
                  {/* Issue */}
                  <Cat
                    className={`${isLiked && "fill-red-200 stroke-white"}`}

                    // onClick={() => LikePost()}
                  />
                </button>
                {/* Likes */}
                <span>({likes.length})</span>
              </div>
              {/* Comments */}
              <div className="flex hover:cursor-pointer">
                <MessageCircle
                  className={`${
                    isShowComment && "fill-green-300 stroke-white"
                  }`}
                  onClick={() => toggleShowComment()}
                />
                <p>({optimisticComment.length ?? 0})</p>
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
              className={`rounded-lg px-4 ${isCommenting && "opacity-50"}`}
              disabled={isCommenting}
            >
              <span>Comment</span>
            </button>
          </div>
        </form>
        {/* Comments */}
        {isShowComment &&
          optimisticComment.map((comment) => (
            <CommentUI key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default SinglePostPage;
