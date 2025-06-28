/*

    Sidebar for authorized user
    1. Opend
    2. Closed
    3. Link should be always kebab case
 */

import { CirclePlus, CircleQuestionMark, Home, Newspaper } from "lucide-react";
import AuthDesktopSidebarListTitle from "./AuthDesktopSidebarListTitle";

export const AuthDesktopSidebar = () => {
  return (
    <div className="h-screen w-[150px] shadow-sidebar bg-gray-500 ">
      {/* Sidebar Icon */}
      <div className=" left-9 top-[100px] h-screen flex flex-col gap-4 bg-white z-50 ">
        <div className=" h-full w-full">
          <div className="flex justify-between items-start flex-col h-[250px] py-4 mt-4  pl-4 ">
            <AuthDesktopSidebarListTitle
              icon={Home}
              link="home"
              size={25}
              label="Home"
            />
            <AuthDesktopSidebarListTitle
              icon={CirclePlus}
              link="create-post"
              size={25}
              label="create"
            />
            <AuthDesktopSidebarListTitle
              icon={Newspaper}
              link="news-api"
              size={25}
              label="news"
            />
            <AuthDesktopSidebarListTitle
              icon={CircleQuestionMark}
              link="help"
              size={25}
              label="help"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
