/*

    01/07/2025
    Edit Profile Page

*/

import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";

// Components
const ProfilePage = () => {
  // BUILD UI
  return (
    <div className="flex">
      {/* Left */}
      <AuthDesktopSidebar />
      {/* Right */}
      <div>
        
        {/* Profile */}
        <h3>Profile</h3>
        {/* Profile image */}
        <img
          src="https://cdn.pixabay.com/photo/2023/07/30/09/12/red-hair-girl-8158373_1280.jpg"
          alt="prifle_img"
          className="size-20"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
