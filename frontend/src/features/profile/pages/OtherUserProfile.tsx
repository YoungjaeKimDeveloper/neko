/*
    01/07/2025
    Edit Profile Page
    
    users are allowed to change
      1. Profile Picture
      2. Location
*/
import UserProfilePicture from "../../../shared/components/UserProfilePicture";
import { AuthDesktopSidebar } from "../../auth/components/Desktop/AuthDesktopSidebar.tsx";
import ProfileInput from "../components/ProfileInput";
import { format } from "date-fns";
import AuthMobileSidebar from "../../auth/components/mobile/AuthMobileSidebar";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../shared/api/axios";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import toast from "react-hot-toast";
import type { UserProfile } from "../../../../../shared/dto/profile/profile.dto";
import { errorLogV2 } from "../../../../../shared/error/error.log.ts";
import LoadingPage from "../../../shared/pages/common/LoadingPage";

// Component
const OtherUserProfile = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const { data: fetchedUser, isLoading } = useQuery({
    queryKey: ["userProfile", userName],
    queryFn: async () => {
      const result = await axiosInstance.get<ResponseDTO>(
        `/profile/${userName}`
      );
      if (!result) {
        throw new Error("Failed to fetch user profile");
      }
      return result.data.data as UserProfile;
    },
    onError: (error: unknown) => {
      errorLogV2({
        error: error,
        function: "fetchUser",
        file: "OtherUserProfile.ts",
      });
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      }
    },
  });
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex flex-col w-screen h-screen ">
      {/* Left */}
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      {/* Right */}
      <div className="lg:pl-[150px] mt-5">
        <div className=" w-[90%] md:w-[60%] rounded-xl mx-auto  shadow-md border border-gray-200 pb-10 md:mt-10 ">
          <div className="rounded-card  mx-auto flex-1 items-center justify-center flex-row pb-10">
            {/* Component Container */}
            <div className="w-[100%] mx-aut">
              {/* Heading + Image */}

              {/* Profile */}

              {/* Profile image */}
              <div className="py-4 w-[100%] mx-auto">
                <h3 className="text-2xl font-bold tracking-wider mx-auto text-center mb-4">
                  Profile
                </h3>
                <UserProfilePicture
                  imageSrc={
                    fetchedUser?.user_profile_image || "/userProfile.png"
                  }
                  imageSize="size-20"
                  isEditable={false}
                />
              </div>
              {/* Input Components*/}
              <div className=" w-[90%] md:w-[60%] mx-auto flex flex-col  items-start justify-between gap-10 mt-10">
                {/* Input Component*/}
                <ProfileInput
                  htmlForLabel="Email"
                  placeholder="Email"
                  inputValue={fetchedUser?.email || ""}
                />
                <ProfileInput
                  htmlForLabel="Name"
                  placeholder="name"
                  inputValue={fetchedUser?.user_name || ""}
                  isEditable={false}
                />
                <ProfileInput
                  htmlForLabel="Location"
                  placeholder="location"
                  inputValue={fetchedUser?.location || ""}
                  maxNumberOfWord={15}
                />
                <ProfileInput
                  htmlForLabel="Since"
                  placeholder="Email"
                  inputValue={
                    fetchedUser?.created_at
                      ? format(new Date(fetchedUser.created_at), "dd/MM/yyyy")
                      : ""
                  }
                />
                <button
                  className=" font-content p-4 w-[50%] text-sm flex justify-center items-center px-20 rounded-xl shadow-sm hover:bg-gray-100 duration-200 cursor-pointer font-conten mx-auto"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
