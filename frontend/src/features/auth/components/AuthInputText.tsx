/*
  Common Input Bar
*/

import { type LucideIcon } from "lucide-react";

interface AuthInputText {
  hintText?: string;
  value?: string;
  Icon: LucideIcon;
  // Set the type of parameters
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInputText = ({ value, onChange, hintText, Icon }: AuthInputText) => {
  // BUILD UI
  return (
    <div className="px-10 pt-5 max-w-[100%] min-h-[20px] lg:min-h-[40px]  flex items-center relative">
      {/* Icon */}
      {Icon && <Icon className="absolute left-11 text-hintText size-5" />}
      <input
        value={value}
        type="text"
        placeholder={hintText ?? "Email@gmail.com"}
        className="input w-full [text-indent:1rem] shadow-md font-content placeholder:text-hintText placeholder:text-sm"
        onChange={onChange}
      />
      {/* <Eye className="absolute right-12" /> */}
    </div>
  );
};

export default AuthInputText;
