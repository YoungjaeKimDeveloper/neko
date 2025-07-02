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
    <div className="fixed top-[75px] left-0  w-[150px] h-screen bg-red shadow-sidebar z-50">
      {/* Sidebar Icon */}
      <div className="h-screen flex flex-col gap-4 bg-white z-50 ">
        <div className="h-screen">
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
