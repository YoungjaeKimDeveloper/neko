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
    <div className="fixed top-[75px] left-0  w-[150px] h-screen bg-red shadow-sidebar z-50 hidden lg:block">
      {/* Sidebar Icon */}
      <div className="h-screen flex flex-col gap-0 bg-white z-50 ">
        <div className=" h-screen w-full">
          <div className="flex justify-between items-start flex-col h-[250px] py-2 pl-2 mt-10 w-full">
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
