/*

    User Profile Pic

*/

import { Pencil } from "lucide-react";
// Track the the image value
// COMPONENT Inteface
interface ProfilePicture {
  imageSrc: string;
  imageSize: string;
  isEditable?: boolean;
  onImageChange?: (previewUrl: string, file: File) => void; // transfer the data to the parent
  isLoading?: boolean;
}
// Component
const UserProfilePicture = ({
  imageSrc,
  imageSize,
  isEditable,
  isLoading,
  onImageChange,
}: ProfilePicture) => {
  // file -ref
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // Check file Size ( 5NB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      // create previewUrl
      const previewImageUrl = URL.createObjectURL(file);
      onImageChange?.(previewImageUrl, file);
    }
  };

  // BUILD UI
  return (
    <div className="mx-auto flex flex-col items-center justify-center relative">
      <div>
        <img
          src={imageSrc ?? "/userProfile.png"}
          alt="user-profile-image"
          className={`${imageSize ?? "size-12"} rounded-full`}
        />
        {isEditable && (
          <>
            <label htmlFor="image">
              <div className="bg-gray-200 size-10 rounded-full flex items-center justify-center translate-x-14 -translate-y-8">
                <Pencil className="size-5" />
              </div>
              <input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleChange}
                disabled={isLoading}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePicture;
