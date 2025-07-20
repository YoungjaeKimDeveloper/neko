/*
    01/07/2025
    Edit Profile Page
    
    users are allowed to change
      1. Profile Picture
      2. Location
*/

import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserProfilePicture from "../../../shared/components/UserProfilePicture";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import ProfileInput from "../components/ProfileInput";
import { useState } from "react";
import { format } from "date-fns";
import MainButton from "../../../shared/components/MainButton";
import { axiosInstance } from "../../../shared/api/axios";
import toast from "react-hot-toast";
import AuthMobileSidebar from "../../auth/components/mobile/AuthMobileSidebar";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProfileFormValues } from "../schema/profile.schema";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";

type ProfileProps = {
  user_profile: string;
  email: string;
  user_name: string;
  location: string;
  created_at: Date;
  user_profile_image: string;
};
interface ProfilePayload {
  updated_location?: string;
  updated_profile_image_url?: string;
}
// Component
const ProfilePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const currentUser = queryClient.getQueryData<ProfileProps>(["authUser"]);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      updated_location: currentUser?.location || "",
      updated_profile_image_url: currentUser?.user_profile_image || "",
    },
  });
  // track the data based on real time
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    watch("updated_profile_image_url") || null
  );
  // handle Preview + Image File
  const handleImageChange = (previewUrl: string, file: File) => {
    // Show Preview
    setPreviewUrl(previewUrl);
    // File reader instance
    const reader = new FileReader();
    // reader setting
    reader.onloadend = () => {
      // setValue - manage value manually to RHF
      setValue("updated_profile_image_url", reader.result as string, {
        shouldValidate: true,
      });
    };
    // call reader to upload file
    reader.readAsDataURL(file);
  };

  // Send data to backend  - Action
  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: async (data: ProfilePayload) => {
      const result = await axiosInstance.put<ResponseDTO>("/profile", data);
      if (result.data.success !== true) {
        throw new Error(result.data.message || "Server error - update profile");
      }
      return "User profile updated successfully";
    },
    onSuccess: async () => {
      // update invalid quries
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      await queryClient.invalidateQueries({
        queryKey: ["userProfile", currentUser?.user_name],
      });
      await navigate("/");
      toast.success("User profile has been updated successfully");
      // navigate to homepage
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (error as any).response?.message || "Pleae try later.",
        });
      }
    },
  });

  // Call API with registed data
  const onSubmit: SubmitHandler<ProfileFormValues> = (data: ProfilePayload) =>
    updateProfile(data);
  // formatted Date
  return (
    <div className="w-screen h-screen">
      {/* Left */}
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      {/* Right */}
      <div className=" w-[90%] md:w-[60%] mt-10 rounded-xl mx-auto lg:pl-[100px] bg-gray-50 shadow-xl pb-10">
        <div className="rounded-card  mx-auto flex-1 items-center justify-center flex-row">
          {/* Component Container */}
          <div className="w-[100%] mx-auto ">
            {/* Heading + Image */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Profile */}

              {/* Profile image */}
              <div className="py-4 w-[100%] mx-auto">
                <h3 className="text-2xl font-bold tracking-wider mx-auto text-center mb-4">
                  Profile
                </h3>
                <UserProfilePicture
                  imageSrc={
                    previewUrl ||
                    currentUser?.user_profile_image ||
                    "/userProfile.png"
                  }
                  imageSize="size-20"
                  isEditable={true}
                  isLoading={isSubmitting}
                  onImageChange={handleImageChange}
                />
              </div>
              {/* Input Components*/}
              <div className=" w-[90%] md:w-[60%] mx-auto flex flex-col  items-start justify-between gap-10 mt-10">
                {/* Input Component*/}
                <ProfileInput
                  htmlForLabel="Email"
                  placeholder="Email"
                  inputValue={currentUser?.email || ""}
                />
                <ProfileInput
                  htmlForLabel="Name"
                  placeholder="name"
                  inputValue={currentUser?.user_name || ""}
                  isEditable={false}
                />
                <ProfileInput
                  htmlForLabel="Location"
                  placeholder={currentUser?.location || ""}
                  inputValue={watch("updated_location") || ""}
                  isEditable={true}
                  isUploading={isSubmitting}
                  register={register("updated_location")}
                  maxNumberOfWord={15}
                />
                <ProfileInput
                  htmlForLabel="Since"
                  placeholder="Email"
                  inputValue={format(
                    new Date(currentUser?.created_at || ""),
                    "dd/MM/yyyy"
                  )}
                />
              </div>
              <p className="text-center text-red-500 py-5">
                {errors.root && errors.root.message}
              </p>
              <div className="mt-10">
                <MainButton
                  text="Save"
                  type="submit"
                  isLoading={isSubmitting}
                  style="p-4 w-[50%] mx-auto"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
