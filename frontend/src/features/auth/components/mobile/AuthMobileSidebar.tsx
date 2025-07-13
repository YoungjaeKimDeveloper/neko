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
  console.log("isShowingSideba1r", isShowingSidebar);
  //
  const authUser = queryClient.getQueryData<User>(["authUser"]);
  // Notification
  const { data: notifications } = useQuery({
    queryKey: ["notifications", authUser?.id],
    queryFn: async () => {
      // Data type axios.get<Date Type>
      const result = await axiosInstance.get<ResponseDTO>("/notifications");
      return result.data;
    },
    onSuccess: (notification) => {
      console.log("Message from backend", notification.message);
      console.log("Fetched notifications: ", notification);
      toast.success("Notifications fetched successfully");
    },
    onError: (error) => {
      errorLogV2({
        error: error,
        function: "Fetch notification",
        file: "NotificationPage.tsx",
      });
      toast.error("Failed to fetch notifications");
    },
    enabled: !!authUser?.id,
  });
  console.log("Notifications: ", notifications);

  const unReadNotification = notifications?.data?.filter(
    (notification: NotificationAPIResponse) =>
      notification.notifications_is_read == false
  ).length;

  console.log(
    "Number of Notificaiton from AuthMobileSidebar",
    unReadNotification
  );

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
