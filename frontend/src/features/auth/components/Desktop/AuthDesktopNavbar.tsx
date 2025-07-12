/*
    Common Navbar
*/
// Todo Auth User Unauth User 구별해서 Navbar Icon보여주기
import { Link } from "react-router-dom";
// Icons
import { Bell, LogOut, User as UserIocn } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../shared/api/axios";
import toast from "react-hot-toast";
import CommonLinkIcon from "../../../../shared/components/CommonLinkIcon";
import type User from "../../../../../../backend/features/auth/domain/entities/user";
import type { ResponseDTO } from "../../../../../../shared/dto/common/response.dto";
import { errorLogV2 } from "../../../../../../shared/error/error.log";
import type { NotificationAPIResponse } from "../../../../../../backend/features/notification/domain/dto/notification.dto";
const AuthNavbar = () => {
  // Single-ton
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete("/auth/auth-tokens");
    },
    onSuccess: () => {
      toast.success("See you next time");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });
  // Auth user
  const authUser = queryClient.getQueryData<User>(["authUser"]);
  // unreadNotification
  const { data: notifications, isLoading: isFetchingNotifications } = useQuery({
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
  // if (notifications !== null) {
  //   const unreadNotification = notifications?.filter(
  //     (notification: NotificationAPIResponse) =>
  //       notification.notifications_is_read == false
  //   ).length;
  //   console.log(unreadNotification);
  // }
  console.log("Notification from HomePage", notifications);
  // BUILD UI
  return (
    // Size
    <div className="w-screen shadow-sm h-[75px]  ">
      {/* Layout */}
      <div className="flex justify-between items-center ">
        {/* Left Logo + Neko */}

        <Link to={"/"}>
          <div className="flex items-center">
            <img src="/neko_logo.png" alt="logo_img" className="h-20" />
            <h3 className="font-title text-primary text-2xl">Neko</h3>
          </div>
        </Link>

        {/* Right Home + Login */}
        <div className="flex gap-2 pr-5  items-center">
          <CommonLinkIcon link="profile" size={30} icon={UserIocn} />
          <CommonLinkIcon link="notification" size={30} icon={Bell} />
          <button onClick={() => logout()}>
            <LogOut
              size={30}
              className="text-icon hover:text-hovered_icon duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
