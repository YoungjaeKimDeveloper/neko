/*

    Sidebar for authorized user
    1. Opend
    2. Closed
    3. Link should be always kebab case
 */

import { CirclePlus, CircleQuestionMark, Home, Newspaper } from "lucide-react";
import CommonLinkIcon from "../../../../shared/components/CommonLinkIcon";

export const AuthDesktopSidebar = () => {
  return (
    <div className="h-screen w-[100px] shadow-sidebar">
      {/* Sidebar Icon */}
      <div className="fixed left-9 top-[100px] h-screen] flex flex-col gap-10 bg-white z-50">
        <div className="flex flex-col items-center">
          <CommonLinkIcon icon={Home} link="home" size={35} />
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center">
          <CommonLinkIcon icon={CirclePlus} link="create-post" size={35} />
          <p>Create</p>
        </div>

        <div className="flex flex-col items-center">
          <CommonLinkIcon icon={Newspaper} link="home" size={35} />
          <p>News</p>
        </div>
        <div className="flex flex-col items-center">
          <CommonLinkIcon icon={CircleQuestionMark} link="home" size={35} />
          <p>Help</p>
        </div>
      </div>
    </div>
  );
};
