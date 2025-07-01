/*

    01/07/2025
    Edit Profile Page

*/

import UserProfilePicture from "../../../shared/components/UserProfilePicture";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import ProfileInput from "../components/ProfileInput";

// Components
const ProfilePage = () => {
  // BUILD UI
  return (
    <div className="flex">
      {/* Left */}
      <AuthDesktopSidebar />
      {/* Right */}
      <div className="bg-gray-300 w-full h-screen">
        <div className="bg-red-50 size-[80%] mt-10 rounded-card shadow-xl mx-auto">
          {/* Component Container */}
          <div className="flex flex-col items-center h-full bg-gray-200">
            {/* Heading + Image */}
            <div className="bg-red-300 mt-5 flex flex-col items-center w-full">
              {/* Profile */}
              <h3 className="text-2xl font-bold tracking-wider">Profile</h3>
              {/* Profile image */}
              <UserProfilePicture
                imageSrc="https://cdn.pixabay.com/photo/2023/07/30/09/12/red-hair-girl-8158373_1280.jpg"
                imageSize="size-20"
              />
              {/* Input Components*/}
              <div className="w-full mx-auto bg-green-100 flex flex-col ">
                {/* Input Component*/}
                <ProfileInput htmlForLabel="Email" placeholder="Email" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
