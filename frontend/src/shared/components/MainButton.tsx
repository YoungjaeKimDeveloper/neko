/*

    Main Action Button 
     1.Login
     2. Logout
     3. View
     4. Post
     etc...

*/

import { Loader } from "lucide-react";

interface MainButton {
  type?: "submit" | "reset" | "button";
  text: string;
  isLoading?: boolean;
  style?: string;
  width?: string;
}
const MainButton = ({
  text,
  type = "button",
  isLoading,
  style,
  width,
}: MainButton) => {
  // Build ui
  return (
    <button
      disabled={isLoading}
      type={type}
      className={` p-4 text-sm flex justify-center items-center px-20 rounded-xl shadow-sm hover:bg-gray-100 duration-200 cursor-pointer font-content  w-[${
        width ?? 100
      }%] ${style}`}
    >
      {isLoading ? <Loader className="animate-spin" /> : text}
    </button>
  );
};

export default MainButton;
