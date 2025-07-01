/*

    Profile Input Component

*/
// Component
interface ProfileInputProps {
  htmlForLabel: string;
  placeholder: string;
}
const ProfileInput = ({ htmlForLabel, placeholder }: ProfileInputProps) => {
  // BUILD UI
  return (
    <div className="flex items-center justify-center gap-x-4 ">
      <label htmlFor={htmlForLabel} className="font-bold">
        {htmlForLabel}
      </label>
      <input
        id={htmlForLabel}
        type="text"
        className="input p-0 w-[300px] h-[40px]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default ProfileInput;
