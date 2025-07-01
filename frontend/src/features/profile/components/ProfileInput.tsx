/*

    Profile Input Component

*/

import type React from "react";

// Component
interface ProfileInputProps {
  htmlForLabel: string;
  placeholder: string;
  inputValue: string;
  isEditable?: boolean;
  updatedValue?: string;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProfileInput = ({
  htmlForLabel,
  placeholder,
  inputValue,
  isEditable = false,
  updatedValue,
  onChangeValue,
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
        value={updatedValue ?? inputValue ?? "Earth"}
        id={htmlForLabel}
        type="text"
        className={`input w-[400px] h-[40px] font-content px-[10px] ${
          isEditable ? "" : "opacity-50"
        }`}
        placeholder={placeholder}
        disabled={!isEditable}
        readOnly={!isEditable}
        onChange={onChangeValue}
      />
    </div>
  );
};

export default ProfileInput;
