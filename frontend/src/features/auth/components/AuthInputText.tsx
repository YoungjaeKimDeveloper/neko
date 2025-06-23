/*
  Common Input Bar
*/

import { User } from "lucide-react";

const AuthInputText = () => {
  // BUILD UI
  return (
    <div className="px-10 pt-5 max-w-[100%] min-h-[20px] lg:min-h-[40px]  flex items-center relative">
      {/* Icon */}
      <User className="absolute left-11" />
      <input
        type="text"
        placeholder="WelcometoNeko@gmail.com"
        className="input w-full [text-indent:1rem] shadow-md font-content placeholder:text-hintText placeholder:text-sm"
      />
      {/* <Eye className="absolute right-12" /> */}
    </div>
  );
};

export default AuthInputText;
