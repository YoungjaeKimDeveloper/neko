/*

    Authorized user - Homepage

*/
import { useQuery } from "@tanstack/react-query";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import { axiosInstance } from "../../../shared/api/axios";
import { errorLogV2 } from "../../../../../shared/error/error.log";
import { EllipsisVertical, Gift, MapPin } from "lucide-react";

const HomePage = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get("/posts/all");
        return result.data;
      } catch (error) {
        errorLogV2({
          error,
          file: "HomePage",
          function: "Fetch posts",
        });
        return null;
      }
    },
  });
  console.log(posts);
  // BUILD UI
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar - left */}
      <AuthDesktopSidebar />
      {/* MainPage - Right */}
      {/* Cards layout */}
      <div className=" grid grid-cols-1 lg:grid-cols-3 h-screen w-screen">
        <div className="mx-auto mt-20">
          {/* Card */}
          <div className="card w-[300px] h-[300px] shadow-xl bg-gray-200">
            {/* Top */}
            <div className="flex items-center justify-between py-2 ">
              <div className="flex items-center justify-between gap-x-1 py-2 px-1">
                <img
                  className="size-8 rounded-full"
                  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                  alt="user-profile"
                />
                {/* username */}
                <p>jeki.season4.998</p>
              </div>
              <EllipsisVertical />
            </div>
            {/* Middle -image */}
            <img
              src="https://cdn.pixabay.com/photo/2020/10/05/10/51/cat-5628953_1280.jpg"
              alt="cat_img"
              className="w-full h-[100px] object-center"
            />
            {/* Bottom Details */}
            <div className="px-2 py-2">
              {/* top */}
              <div className="flex justify-between items-center">
                <p className="text-2xl">Title</p>
                <div className="flex items-center text-sm">
                  <MapPin className="size-4 text-red-500" />
                  <p>Townhall</p>
                </div>
              </div>
              {/* Date */}
              <p className="text-sm ">
                Date: <span className=" text-[12px]">03/02/2025</span>
              </p>
              {/* Details */}
              <p className="w-[40%] h-[20px] overflow-hidden text-base">
                Lorem ipsum dolor
              </p>
              {/* Last Bottom */}
              <div className="flex justify-between items-center">
                {/* Icons + price */}
                <div className="flex py-4">
                  <Gift />
                  <p>${200}</p>
                </div>
                <button className="px-2 text-sm bg-white font-content h-[30px] rounded-md">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
