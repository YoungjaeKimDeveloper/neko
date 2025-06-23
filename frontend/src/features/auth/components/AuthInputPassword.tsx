/*
  Common Input Bar
*/

import { Eye, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";

const AuthInputPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const togglePassword = () => setIsShowPassword((prev) => !prev);
  // BUILD UI
  return (
    <div className="px-10 py-5  min-h-[20px] lg:min-h-[40px]  flex items-center relative">
      <Lock className="absolute left-11" />
      {/* Text filed */}
      <input
        type={isShowPassword ? "text" : "password"}
        placeholder="Password"
        className="input w-full [text-indent:1rem] shadow-md font-content placeholder:text-hintText placeholder:text-sm"
      />
      {/* Show password */}
      {isShowPassword ? (
        <EyeClosed className="absolute right-12" onClick={togglePassword} />
      ) : (
        <Eye className="absolute right-12" onClick={togglePassword} />
      )}
    </div>
  );
};

export default AuthInputPassword;
