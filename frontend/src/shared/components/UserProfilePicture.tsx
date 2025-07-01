/*

    User Profile Pic

*/

import { Pencil } from "lucide-react";

// COMPONENT
interface ProfilePicture {
  imageSrc: string;
  imageSize: string;
  isEditable?: boolean;
}
const UserProfilePicture = ({
  imageSrc,
  imageSize,
  isEditable,
}: ProfilePicture) => {
  // BUILD UI
  return (
    <div className="relative">
      <img
        src={imageSrc ?? "/userProfile.png"}
        alt="user-profile-image"
        className={`${imageSize ?? "size-12"} rounded-full relative`}
      />
      {isEditable && (
        <div className="bg-gray-200 size-10 flex absolute items-center justify-center rounded-full bottom-[-10px] left-14 hover:bg-white duration-200 cursor-pointer">
          <Pencil className="size-5" />
        </div>
      )}
    </div>
  );
};

export default UserProfilePicture;
