/*
  Common Input Bar
*/

import { Eye, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";
interface AuthInputText {
  hintText: string;
}
const AuthInputPassword = ({ hintText }: AuthInputText) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const togglePassword = () => setIsShowPassword((prev) => !prev);
  // BUILD UI
  return (
    <div className="px-10 pt-5 min-h-[20px] lg:min-h-[40px] flex items-center relative">
      <Lock className="absolute left-11 text-hintText size-5" />
      {/* Text filed */}
      <input
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
  );
};

export default AuthInputPassword;
