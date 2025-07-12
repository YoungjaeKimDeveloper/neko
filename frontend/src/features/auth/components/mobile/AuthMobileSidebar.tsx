/*

    Auth Navbar - mobile

*/
import { useState } from "react";
import {
  Bell,
  CircleArrowRight,
  CirclePlus,
  CircleQuestionMark,
  Home,
  Menu,
  Newspaper,
} from "lucide-react";
import AuthMobileSideListTitle from "./AuthMobileSidebarListTitle";
import HoverEffectedIcon from "./HoverEffectedIcon";

// Component
const AuthMobileSidebar = () => {
  const [isShowingSidebar, setIsShowingSidebar] = useState<boolean>(true);
  const toggleSidebar = () => setIsShowingSidebar((prev) => !prev);
  console.log("isShowingSidebar", isShowingSidebar);
  // BUILD UI
  return (
    <div className="relative block lg:hidden">
      <div className="fixed z-20 left-[20px] ">
        {/* Toggle Menu BTN */}
        {isShowingSidebar ? (
          <HoverEffectedIcon
            icon={Menu}
            toggleSidebar={() => toggleSidebar()}
          />
        ) : (
          <HoverEffectedIcon
            icon={CircleArrowRight}
            toggleSidebar={() => toggleSidebar()}
          />
        )}
      </div>
      <div
        className={` bg-gray-50 shadow-xl h-screen fixed left-0- z-10  w-[125px] rounded-tr-sm flex flex-col items-start justify-start ${
          isShowingSidebar && "translate-x-[-400px]"
        }`}
      >
        <div className="flex flex-col gap-y-2 justify-center  mx-auto mt-14 ">
          <AuthMobileSideListTitle
            icon={Home}
            link="home"
            size={25}
            label="HOME"
          />
          <AuthMobileSideListTitle
            icon={CirclePlus}
            link="create-post"
            size={35}
            label="CREATE"
          />
          <AuthMobileSideListTitle
            icon={Newspaper}
            link="news-api"
            size={25}
            label="NEWS"
          />
          <AuthMobileSideListTitle
            icon={Bell}
            link="notification"
            size={25}
            label="Alert"
          />
          <AuthMobileSideListTitle
            icon={CircleQuestionMark}
            link="help"
            size={25}
            label="Help"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthMobileSidebar;
