import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
interface ListTitle {
  icon: LucideIcon;
  link: string;
  size?: number;
  label: string;
  numberOfNotification?: number;
}
const AuthMobileSideListTitle = ({
  icon: Icon,
  link,
  size,
  label,
  numberOfNotification,
}: ListTitle) => {
  // BUILD UI
  return (
    <div className=" hover:bg-gray-200 w-[90%] py-2 rounded-xl px-1 mx-auto duration-300 text-gray-400 hover:text-black z-10">
      <Link to={`/${link}`}>
        <div className=" sm:justify-start w-full h-full gap-1  flex justify-start items-center relative">
          <Icon size={size ?? 10} />
          <p className="text-[16px] pl-2">{label}</p>
          {numberOfNotification !== undefined && numberOfNotification > 0 && (
            <div className="absolute bottom-4 left-3 bg-red-400  rounded-full px-2">
              <span className="text-white font-content text-sm">
                {numberOfNotification}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default AuthMobileSideListTitle;
