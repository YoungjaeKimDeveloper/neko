/*

    Auth Navbar - mobile
    18/07/2025
    - Decided to delete news page as it was not suitable for Neko

*/
import { useState } from "react";
import {
  Bell,
  Cat,
  CircleArrowRight,
  CirclePlus,
  CircleQuestionMark,
  Home,
  Menu,
} from "lucide-react";
import AuthMobileSideListTitle from "./AuthMobileSidebarListTitle";
import HoverEffectedIcon from "./HoverEffectedIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type User from "../../../../../../backend/features/auth/domain/entities/user";
import { axiosInstance } from "../../../../shared/api/axios";
import type { ResponseDTO } from "../../../../../../shared/dto/common/response.dto";
import toast from "react-hot-toast";
import { errorLogV2 } from "../../../../../../shared/error/error.log";
import type { NotificationAPIResponse } from "../../../../../../backend/features/notification/domain/dto/notification.dto";

// Component..
const AuthMobileSidebar = () => {
  const queryClient = useQueryClient();
  const [isShowingSidebar, setIsShowingSidebar] = useState<boolean>(true);
  const toggleSidebar = () => setIsShowingSidebar((prev) => !prev);

  //
  const authUser = queryClient.getQueryData<User>(["authUser"]);
  // Notification
  const { data: notifications } = useQuery({
    queryKey: ["notifications", authUser?.id],
    queryFn: async () => {
      const result = await axiosInstance.get<ResponseDTO>("/notifications");
      return result.data;
    },
    onSuccess: (notification) => {
      toast.success("Notifications fetched successfully");
      return notification;
    },
    onError: (error) => {
      errorLogV2({
        error: error,
        function: "Fetch notification",
        file: "NotificationPage.tsx",
      });
      toast.error("Failed to fetch notifications");
    },
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!authUser?.id,
  });

  const unReadNotification = notifications?.data?.filter(
    (notification: NotificationAPIResponse) =>
      notification.notifications_is_read == false
  ).length;

  // BUILD UI
  return (
    <div className="relative block lg:hidden">
      <div className="fixed z-50 left-[20px] ">
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
        <div className="flex flex-col gap-y-2 justify-center  mx-auto mt-20 ">
          <AuthMobileSideListTitle
            icon={Home}
            link="home"
            size={25}
            label="HOME"
          />
          <AuthMobileSideListTitle
            icon={Cat}
            link="found-cat"
            size={25}
            label="Found"
          />
          <AuthMobileSideListTitle
            icon={CirclePlus}
            link="create-post"
            size={35}
            label="CREATE"
          />

          <AuthMobileSideListTitle
            icon={Bell}
            link="notification"
            size={25}
            label="Alert"
            numberOfNotification={unReadNotification}
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
