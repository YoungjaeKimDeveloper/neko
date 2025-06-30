/*


    Single Post + Comments
    1.fetch Single page  
*/
import { useRef } from "react";
import { Cat, Clover, Gift, Loader, MapPin, MessageCircle } from "lucide-react";
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

// Component
const SinglePostPage = () => {
  // Refetence Comment
  const commentRef = useRef<HTMLInputElement>(null);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const [isShowComment, setIsShowComment] = useState<boolean>(true);
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
  console.log(res);
  console.log(res);
  // BUILD UI
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <AuthDesktopSidebar />
      {/* Right main */}
      {/* Container */}
      <div className="w-[40%] flex flex-col gap-y-10 mx-auto shadow-lg h-fit gap-x-4">
        <div className="mx-auto mt-5  w-full">
          {/* Main Picture + Status bar */}
          <div className="w-full rounded-sm">
            {/* Main page */}
            <img
              src={res?.data.post.image_urls[0]}
              alt="hero_image"
              className="w-full h-[250px] rounded-t-lg"
            />
            {/* Status bar */}
            <div className="flex justify-between p-2 rounded-b-xl bg-gray-100">
              {/* Cat + like */}
              <div className="flex">
                <Cat />
                <span>(0)</span>
              </div>
              {/* Comments */}
              <div className="flex hover:cursor-pointer">
                <MessageCircle onClick={() => toggleShowComment()} />
                <p>({res?.data.comments.length ?? 0})</p>
              </div>
              {/* Share */}
              <div className="flex">
                <Clover />
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
                  res?.data.post.user_profile_image ??
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                }
                alt="writer_user"
                className="size-10 rounded-full"
              />
              {/* Details */}
              <div>
                <p className="text-base">{res?.data.post.user_name}</p>
                <p className="text-sm text-gray-400">
                  {res?.data.post.created_at &&
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
                <p>${res?.data.post.reward_amount}</p>
              </div>
              {/* Icon + Location */}
              <div className="flex items-center justify-center">
                <MapPin className="text-warning" />
                <p>{res?.data.post.location}</p>
              </div>
            </div>
          </div>
          {/* Bottom - Description */}
          <div>
            <p className="px-2">{res?.data.post.content}</p>
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
            className="input w-full shadow-sm"
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
          res?.data.comments.map((comment) => <Comment comment={comment} />)}
      </div>
    </div>
  );
};

export default SinglePostPage;
