/*
  Common Input Bar
*/

import { Eye, EyeClosed, type LucideIcon } from "lucide-react";
import { useState } from "react";
interface AuthInputText {
  value?: string;
  hintText: string;
  Icon: LucideIcon;
  // Void - > reutrn nothing
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const AuthInputPassword = ({
  hintText,
  value,
  onChange,
  Icon,
}: AuthInputText) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const togglePassword = () => setIsShowPassword((prev) => !prev);
  // BUILD UI
  return (
    <div className="px-10 pt-5 min-h-[20px] lg:min-h-[40px] flex items-center relative">
      {Icon && <Icon className="absolute left-11 text-hintText size-5" />}
      {/* Text filed */}
      <input
        value={value}
        type={isShowPassword ? "text" : "password"}
        placeholder={hintText}
        className="input w-full [text-indent:1rem] shadow-md font-content placeholder:text-hintText placeholder:text-sm"
        onChange={onChange}
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
