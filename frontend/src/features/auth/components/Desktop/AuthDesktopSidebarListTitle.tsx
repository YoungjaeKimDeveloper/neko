import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
interface ListTitle {
  icon: LucideIcon;
  link: string;
  size?: number;
  label: string;
}
const AuthDesktopSidebarListTitle = ({
  icon: Icon,
  link,
  size,
  label,
}: ListTitle) => {
  // BUILD UI
  return (
    <div className=" hover:bg-gray-200 w-[90%] py-2 rounded-xl px-1 mx-auto duration-300 text-gray-400 hover:text-black bg-red-200">
      <Link to={`/${link}`}>
        <div className="flex justify-center sm:justify-start items-center gap-2 bg-blue-300 flex ">
          <Icon size={size ?? 10} className="" />
          <p className="uppercase">{label}</p>
        </div>
      </Link>
    </div>
  );
};

export default AuthDesktopSidebarListTitle;
