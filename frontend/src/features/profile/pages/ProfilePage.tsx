/*

    01/07/2025
    Edit Profile Page

*/

import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserProfilePicture from "../../../shared/components/UserProfilePicture";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import ProfileInput from "../components/ProfileInput";
import React, { useState } from "react";

import { format } from "date-fns";
import MainButton from "../../../shared/components/MainButton";
import { axiosInstance } from "../../../shared/api/axios";
import toast from "react-hot-toast";

type ProfilePage = {
  user_profile: string;
  email: string;
  user_name: string;
  location: string;
  created_at: Date;
  user_profile_image: string;
};
// Components
const ProfilePage = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<ProfilePage>(["authUser"]);
  // Profile Image Url
  const [uploadImageFile, setUploadImageFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updatedLocation, setUpdatedLocation] = useState<string>(
    currentUser!.location
  );

  // Helper Function convert the file to Base 64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  // convert the data to base 64
  let base64 = currentUser?.user_profile_image;
  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: async () => {
      // if there is something to update
      if (uploadImageFile) {
        base64 = await fileToBase64(uploadImageFile);
        // throw new Error("Image file is required");
      }
      const result = await axiosInstance.put("/profile/", {
        updated_profile_image_url: base64,
        updated_location: updatedLocation,
      });
      return result;
    },
    onSuccess: () => {
      toast.success("User Profile updated successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(`Failed to update Profile ${error.message}`);
      }
    },
  });
  if (!currentUser) {
    return null;
  }
  // Extract the values
  const {
    email,
    created_at,
    location,
    user_name: userName,
    user_profile: userProfile,
    user_profile_image,
  } = currentUser;

  // Side Effect

  console.log(email, created_at, location, userName, userProfile);

  // formatted Date
  const joinedDate = format(new Date(created_at), "dd/MM/yyyy");
  // preview
  // image file for uploading to cloudinary

  const handleImageChange = (previewUrl: string, file: File) => {
    setPreviewUrl(previewUrl);
    setUploadImageFile(file);
  };
  console.log("UploadedFile", uploadImageFile);
  console.log("New Location", updatedLocation);
  console.log("New Preview Image Url", previewUrl);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile();
  };
  console.log(currentUser);
  // BUILD UI
  return (
    <div className="flex pl-[150px]">
      {/* Left */}
      <AuthDesktopSidebar />
      {/* Right */}
      <div className=" w-full h-screen shadow-xl bg-gray-50 pt-10 rounded-sm">
        <div className="size-[80%]  rounded-card shadow-xl mx-auto">
          {/* Component Container */}
          <div className="flex flex-col items-center h-fullmax-w-[800px] mx-auto bg-gray-200 h-full rounded-xl">
            {/* Heading + Image */}
            <form
              className="mt-5 flex flex-col items-center justify-between w-full h-fit"
              onSubmit={(e) => handleSubmit(e)}
            >
              {/* Profile */}

              {/* Profile image */}
              <div className="py-4">
                <h3 className="text-2xl font-bold tracking-wider">Profile</h3>

                <UserProfilePicture
                  imageSrc={previewUrl ?? user_profile_image}
                  imageSize="size-20"
                  isEditable={true}
                  onImageChange={handleImageChange}
                />
              </div>
              {/* Input Components*/}
              <div className="w-fit mx-auto flex flex-col  items-start justify-between gap-10 mt-10">
                {/* Input Component*/}
                <ProfileInput
                  htmlForLabel="Email"
                  placeholder="Email"
                  inputValue={email}
                />
                <ProfileInput
                  htmlForLabel="Name"
                  placeholder="name"
                  inputValue={userName}
                  isEditable={false}
                />
                <ProfileInput
                  htmlForLabel="Location"
                  placeholder={location}
                  inputValue={location}
                  isEditable={true}
                  onChangeValue={(e) => setUpdatedLocation(e.target.value)}
                  updatedValue={updatedLocation}
                  maxNumberOfWord={15}
                />
                <ProfileInput
                  htmlForLabel="Since"
                  placeholder="Email"
                  inputValue={joinedDate}
                />
              </div>
              <div className="mt-10">
                <MainButton text="Save" type="submit" isLoading={isUpdating} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
