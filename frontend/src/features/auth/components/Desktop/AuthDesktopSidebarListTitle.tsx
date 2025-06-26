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
    <Link to={`/${link}`}>
      <div className="flex justify-between items-center gap-x-4">
        <Icon
          size={size ?? 10}
          className="text-icon hover:text-hovered_icon duration-300"
        />

        <p>{label}</p>
      </div>
    </Link>
  );
};

export default AuthDesktopSidebarListTitle;
