/*
  Common Input Bar
*/

import { type LucideIcon } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputText {
  hintText?: string;
  Icon: LucideIcon;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  // Set the type of parameters
}

const AuthInputText = ({
  hintText,
  Icon,
  errorMessage,
  register,
}: AuthInputText) => {
  // BUILD UI
  return (
    <div>
      <div className="px-10 pt-5 max-w-[100%] min-h-[20px] lg:min-h-[40px]  flex items-center relative">
        {/* Icon */}
        {Icon && <Icon className="absolute left-11 text-hintText size-5" />}
        <input
          {...register}
          type="text"
          placeholder={hintText ?? "Email@gmail.com"}
          className="input w-full [text-indent:1rem] shadow-sm border border-gray-200 font-content placeholder:text-hintText placeholder:text-sm"
        />
      </div>
      {errorMessage && (
        <p className="text-warning text-sm text-center py-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default AuthInputText;
