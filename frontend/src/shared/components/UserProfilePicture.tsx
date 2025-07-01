/*

    User Profile Pic

*/

// COMPONENT
interface ProfilePicture {
  imageSrc: string;
  imageSize: string;
}
const UserProfilePicture = ({ imageSrc, imageSize }: ProfilePicture) => {
  // BUILD UI
  return (
    <img
      src={imageSrc ?? "/userProfile.png"}
      alt="user-profile-image"
      className={`${imageSize ?? "size-12"} rounded-full`}
    />
  );
};

export default UserProfilePicture;
