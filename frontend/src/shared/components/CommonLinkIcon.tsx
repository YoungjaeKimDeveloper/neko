/*

    Link + Icon to implement cleaner code

*/

import type { LucideIcon } from "lucide-react";

import { Link } from "react-router-dom";
interface CommonLinkIcon {
  icon: LucideIcon;
  link: string;
  size?: number;
}
const CommonLinkIcon = ({ icon: Icon, link, size }: CommonLinkIcon) => {
  return (
    <Link to={`/${link}`}>
      <Icon
        size={size ?? 10}
        className="text-icon hover:text-hovered_icon duration-300"
      />
    </Link>
  );
};

export default CommonLinkIcon;
