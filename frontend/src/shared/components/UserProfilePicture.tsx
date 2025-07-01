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
}
const UserProfilePicture = ({
  imageSrc,
  imageSize,
  isEditable,
  onImageChange,
}: ProfilePicture) => {
  // file -ref
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // 첫 번쨰 파일 뽑기
      const file = e.target.files[0];
      // 처음 받은 객체파일로 image Preview만들어주기
      const previewImageUrl = URL.createObjectURL(file);
      // FILE URL과  File 넣어주기
      onImageChange?.(previewImageUrl, file);
    }
  };
  // BUILD UI
  return (
    <div className="relative">
      <img
        src={imageSrc ?? "/userProfile.png"}
        alt="user-profile-image"
        className={`${imageSize ?? "size-12"} rounded-full relative`}
      />
      {isEditable && (
        <>
          <label htmlFor="image">
            <div className="bg-gray-200 size-10 flex absolute items-center justify-center rounded-full bottom-[-10px] left-14 hover:bg-white duration-200 cursor-pointer">
              <Pencil className="size-5" />
            </div>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default UserProfilePicture;
