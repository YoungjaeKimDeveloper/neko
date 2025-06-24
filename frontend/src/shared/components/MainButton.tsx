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
}
const MainButton = ({ text, type = "button", isLoading }: MainButton) => {
  // Build ui
  return (
    <div className="w-[100%] mx-auto text-sm">
      <div className="flex justify-center  px-20 py-2 rounded-xl shadow-sm hover:bg-gray-100 duration-200 cursor-pointer font-content w-full">
        <button disabled={isLoading} type={type}>
          {isLoading ? <Loader className="animate-spin" /> : text}
        </button>
      </div>
    </div>
  );
};

export default MainButton;
