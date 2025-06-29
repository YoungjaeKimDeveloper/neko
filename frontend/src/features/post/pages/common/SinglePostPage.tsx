/*


    Single Post + Comments
    1.fetch Single page  
*/

import { Cat, Clover, Gift, MapPin, MessageCircle } from "lucide-react";
import { AuthDesktopSidebar } from "../../../auth/components/desktop/AuthDesktopSidebar";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../shared/api/axios";
import toast from "react-hot-toast";

import { errorLogV2 } from "../../../../../../shared/error/error.log";
import LoadingPage from "../../../../shared/pages/common/LoadingPage";
import type { SinglePostWithComments } from "../../../../../../backend/features/post/domain/entities/post";
// Component
const SinglePostPage = () => {
  const { postId } = useParams();
  // fetch single post
  const { data: post, isLoading } = useQuery({
    // (caching key
    queryKey: ["post", postId],
    queryFn: async () => {
      try {
        console.log(postId);
        const result = await axiosInstance.get<{
          data: SinglePostWithComments;
        }>(`/posts/${postId}`);
        toast.success("Single post fetched successfully ✅");
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
  if (isLoading) {
    return <LoadingPage />;
  }
  console.log(post);
  // BUILD UI
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <AuthDesktopSidebar />
      {/* Right main */}
      {/* Container */}
      <div className="w-[40%] flex flex-col gap-y-10 mx-auto shadow-lg h-fit gap-x-4 bg-gray-100">
        <div className="mx-auto mt-5  w-full">
          {/* Main Picture + Status bar */}
          <div className="w-full rounded-sm">
            {/* Main page */}
            <img
              src="https://cdn.pixabay.com/photo/2022/03/27/11/23/cat-7094808_1280.jpg"
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
              <div className="flex">
                <MessageCircle />
                <p>(0)</p>
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
                src="https://cdn.pixabay.com/photo/2018/10/29/21/46/human-3782189_1280.jpg"
                alt="writer_user"
                className="size-16 rounded-full"
              />
              {/* Details */}
              <div>
                <p>jeki.season4.9</p>
                <p>Date:03/05/2025</p>
              </div>
            </div>
            {/* Price + Location */}
            <div className="flex flex-col justify-between h-[50px]">
              {/* Price +Icon */}
              <div className="flex items-center gap-x-2">
                <Gift />
                <p>$200</p>
              </div>
              {/* Icon + Location */}
              <div className="flex items-center justify-center">
                <MapPin className="text-warning" />
                <p>Townhall</p>
              </div>
            </div>
          </div>
          {/* Bottom - Description */}
          <div>
            <p className="px-2">{}</p>
          </div>
        </div>
        {/* Comments bar */}
        <div className=" flex items-center rounded-tr-lg rounded-lg  bg-gray-50">
          <input type="text" className="input w-full shadow-sm" />
          <div className="font-content ">
            <button type="submit" className="rounded-lg px-4">
              Comment
            </button>
          </div>
        </div>
        {/* Comments */}
        <div className="flex flex-col rounded-xl bg-gray-50 shadow-sm">
          {/* Comment */}
          <div className="p-2 rounded-xl ">
            <div className="flex w-full gap-x-2">
              <img
                src="https://cdn.pixabay.com/photo/2018/10/29/21/46/human-3782189_1280.jpg"
                alt="writer_user"
                className="size-12 rounded-full"
              />
              <div className="w-full rounded-xl ">
                <p>
                  James <span>1 day ago</span>
                </p>
                <p>I saw this cat near Townhall station 4 days ago </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
