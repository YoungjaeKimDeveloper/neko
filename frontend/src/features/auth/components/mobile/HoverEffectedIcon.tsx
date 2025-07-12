/*

    Hover effected Icon

*/

import type { LucideIcon } from "lucide-react";

// Interface
interface HoverEffectedIconProps {
  icon: LucideIcon;
  toggleSidebar: () => void;
}

// COMPONENT
// Alias : to show the actual Icon
const HoverEffectedIcon = ({
  icon: Icon,
  toggleSidebar,
}: HoverEffectedIconProps) => {
  // BUILD UI
  return (
    <div className="hover:bg-gray-200 text-gray-400  hover:text-black size-10 items-center justify-center rounded-full mx-auto cursor-pointer mt-2  flex flex-col  absolute left-[-5px] z-50">
      <Icon onClick={() => toggleSidebar()} />
    </div>
  );
};

export default HoverEffectedIcon;
