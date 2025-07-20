/*
    Profile Input Component
*/

import type { UseFormRegisterReturn } from "react-hook-form";

// Component
interface ProfileInputProps {
  htmlForLabel: string;
  placeholder: string;
  inputValue: string;
  isEditable?: boolean;
  updatedValue?: string;
  maxNumberOfWord?: number;
  register?: UseFormRegisterReturn;
  isUploading?: boolean;
}
const ProfileInput = ({
  htmlForLabel,
  placeholder,
  inputValue,
  isEditable = false,
  updatedValue,
  maxNumberOfWord,
  register,
  isUploading,
}: ProfileInputProps) => {
  // BUILD UI
  return (
    <div className="flex items-center justify-between w-full gap-x-4 relative  ">
      <label htmlFor={htmlForLabel} className="font-bold">
        {htmlForLabel}
      </label>
      <input
        {...register}
        maxLength={maxNumberOfWord}
        value={updatedValue ?? inputValue ?? "Earth"}
        id={htmlForLabel}
        type="text"
        className={`border-2  border-gray-200 input min-w-[100px] w-full h-[40px] font-content px-[10px] ${
          isEditable ? "" : "opacity-50"
        }`}
        placeholder={placeholder}
        disabled={!isEditable || isUploading}
        readOnly={!isEditable}
      />
    </div>
  );
};

export default ProfileInput;
