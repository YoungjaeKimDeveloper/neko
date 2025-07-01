/*

    Profile Input Component

*/
// Component
interface ProfileInputProps {
  htmlForLabel: string;
  placeholder: string;
  inputValue: string;
  isEditable?: boolean;
}
const ProfileInput = ({
  htmlForLabel,
  placeholder,
  inputValue,
  isEditable = false,
}: ProfileInputProps) => {
  // BUILD UI
  return (
    <div
      className={`flex items-center justify-between w-full gap-x-4 relative`}
    >
      <label htmlFor={htmlForLabel} className="font-bold">
        {htmlForLabel}
      </label>
      <input
        value={inputValue ?? "Earth"}
        id={htmlForLabel}
        type="text"
        className={`input w-[400px] h-[40px] font-content px-[10px] ${
          isEditable ? "" : "opacity-50"
        }`}
        placeholder={placeholder}
        disabled={!isEditable}
      />
    </div>
  );
};

export default ProfileInput;
