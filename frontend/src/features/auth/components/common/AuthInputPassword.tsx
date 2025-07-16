/*
  Common Input Bar
*/

import { Eye, EyeClosed, type LucideIcon } from "lucide-react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
interface AuthInputText {
  hintText: string;
  Icon: LucideIcon;
  errorMessage?: string;
  regitser: UseFormRegisterReturn;
  // Void - > reutrn nothing
}
const AuthInputPassword = ({
  hintText,
  Icon,
  errorMessage,
  regitser,
}: AuthInputText) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const togglePassword = () => setIsShowPassword((prev) => !prev);
  // BUILD UI
  return (
    <div>
      <div className="px-10 pt-5 min-h-[20px] lg:min-h-[40px] flex items-center relative">
        {Icon && <Icon className="absolute left-11 text-hintText size-5" />}
        {/* Text filed */}
        <input
          // spared -> Send all data to parents component
          {...regitser}
          type={isShowPassword ? "text" : "password"}
          placeholder={hintText}
          className="input w-full [text-indent:1rem] shadow-md font-content placeholder:text-hintText placeholder:text-sm"
        />
        {/* Show password */}
        {isShowPassword ? (
          <EyeClosed
            className="absolute right-12 text-hintText size-5"
            onClick={togglePassword}
          />
        ) : (
          <Eye
            className="absolute right-12 text-hintText size-5"
            onClick={togglePassword}
          />
        )}
      </div>
      {errorMessage && (
        <p className="text-warning text-sm text-center py-2 ">{errorMessage}</p>
      )}
    </div>
  );
};

export default AuthInputPassword;
