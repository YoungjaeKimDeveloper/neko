/*

    Notification Page
        - Services
            - 1. Fetch all notifications by currentUserId
            - 2. Read a notification
            - 3. Delete a notification            
*/

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import { axiosInstance } from "../../../shared/api/axios";
import toast from "react-hot-toast";
import { errorLogV2 } from "../../../../../shared/error/error.log";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import NotificationComponent from "../components/NotificationComponent";
import LoadingPage from "../../../shared/pages/common/LoadingPage";
import type { NotificationAPIResponse } from "../../../../../backend/features/notification/domain/dto/notification.dto";
import type User from "../../../../../backend/features/auth/domain/entities/user";

// Component
const NotificationPage = () => {
  const queryClient = useQueryClient();
  // Get current user - Caching
  const currentUserId = queryClient.getQueryData<User>(["authUser"])?.id;
  // - 1. Fetch all notifications by currentUserId
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", currentUserId],
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
  });
  // - 2. Read a notification
  const { mutateAsync: readNotification } = useMutation({
    // DO NOT USER TRY CATCH - !
    mutationFn: async (notificationId: string) => {
      const result = await axiosInstance.put<ResponseDTO>(
        `/notifications/${notificationId}`
      );
      if (result.data.success != true) {
        throw new Error("Failed to read the notification");
      }
      return true;
    },
    onSuccess: async () => {
      toast.success("Notification read successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["notifications", currentUserId],
      });
    },
    onError: (error) => {
      errorLogV2({
        file: "NotificationPage.tsx",
        error: error,
        function: "readNotification",
      });
    },
  });
  // - 3. Delete a notification
  const { mutateAsync: deleteNotification } = useMutation({
    mutationFn: async (notificationId: string) => {
      const result = await axiosInstance.delete<ResponseDTO>(
        `/notifications/${notificationId}`
      );
      if (result.data.success != true) {
        throw new Error("Failed to delete a notification");
      }
      return true;
    },
    onSuccess: async () => {
      toast.success("Delete notification successfully");
      await queryClient.invalidateQueries({
        queryKey: ["notifications", currentUserId],
      });
    },

    onError: (error) => {
      if (error instanceof Error) {
        errorLogV2({
          error: error,
          function: "deleteNotification",
          file: "NotificationPage",
        });
        toast.error(error.message);
      }
    },
  });
  if (isLoading) {
    return <LoadingPage />;
  }
  // BUILD UI
  return (
    <div>
      {/* Left - Sidebar */}
      <AuthDesktopSidebar />
      {/* Right - main - margin-l -150px */}
      <div className="lg:pl-[150px]  w-full h-full">
        {/* SubContainer - main content container */}
        <div className=" mt-10  mx-auto rounded-xl shadow-xl border-solid border w-[80%] min-h-[600px] h-fit py-2 px-4">
          {/* Notification */}
          <h3 className="font-content text-2xl py-2">Notificaiton</h3>
          {/* Notification - Component */}
          {notifications?.data.map((notification: NotificationAPIResponse) => (
            <NotificationComponent
              key={notification.notifications_id}
              notification={notification}
              onReadNotification={readNotification}
              onDeleteNotification={deleteNotification}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
