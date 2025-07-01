/*

    01/07/2025
    Edit Profile Page

*/

import { useQueryClient } from "@tanstack/react-query";
import UserProfilePicture from "../../../shared/components/UserProfilePicture";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import ProfileInput from "../components/ProfileInput";
import { useState } from "react";

import { format } from "date-fns";
import MainButton from "../../../shared/components/MainButton";

type ProfilePage = {
  user_profile: string;
  email: string;
  user_name: string;
  location: string;
  created_at: Date;
};
// Components
const ProfilePage = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<ProfilePage>(["authUser"]);
  // Profile Image Url
  const [uploadImageFile, setUploadImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updatedLocation, setUpdatedLocation] = useState<string>(
    currentUser!.location
  );
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
  // BUILD UI
  return (
    <div className="flex">
      {/* Left */}
      <AuthDesktopSidebar />
      {/* Right */}
      <div className="bg-gray-300 w-full h-screen">
        <div className="bg-red-50 size-[80%] mt-10 rounded-card shadow-xl mx-auto">
          {/* Component Container */}
          <div className="flex flex-col items-center h-full bg-gray-400 max-w-[800px] mx-auto">
            {/* Heading + Image */}
            <form className="mt-5 flex flex-col items-center justify-between w-full h-fit">
              {/* Profile */}

              {/* Profile image */}
              <div className="py-4">
                <h3 className="text-2xl font-bold tracking-wider">Profile</h3>

                <UserProfilePicture
                  imageSrc={previewUrl ?? userProfile}
                  imageSize="size-20"
                  isEditable={true}
                  onImageChange={handleImageChange}
                />
              </div>
              {/* Input Components*/}
              <div className="w-fit mx-auto flex flex-col  items-start justify-between gap-10 mt-10">
                {/* Input Component*/}
                <ProfileInput
                  htmlForLabel="email"
                  placeholder="Email"
                  inputValue={email}
                />
                <ProfileInput
                  htmlForLabel="name"
                  placeholder="name"
                  inputValue={userName}
                  isEditable={false}
                />
                <ProfileInput
                  htmlForLabel="location"
                  placeholder={location}
                  inputValue={location}
                  isEditable={true}
                  onChangeValue={(e) => setUpdatedLocation(e.target.value)}
                  updatedValue={updatedLocation}
                />
                <ProfileInput
                  htmlForLabel="since"
                  placeholder="Email"
                  inputValue={joinedDate}
                />
              </div>
              <div className="mt-10">
                <MainButton text="Save" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
