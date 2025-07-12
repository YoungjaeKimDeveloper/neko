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
    <div className=" hover:bg-gray-200 w-[90%] py-2 rounded-xl px-1 mx-auto duration-300">
      <Link to={`/${link}`}>
        <div className="flex justify-start items-center gap-2 ">
          <Icon size={size ?? 10} className="" />

          <p className="uppercase">{label}</p>
        </div>
      </Link>
    </div>
  );
};

export default AuthDesktopSidebarListTitle;
