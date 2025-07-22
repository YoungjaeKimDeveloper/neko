/*

    Notification Page
        - Services
            - 1. Fetch all notifications by currentUserId
            - 2. Read a notification
            - 3. Delete a notification            
*/

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthDesktopSidebar } from "../../auth/components/Desktop/AuthDesktopSidebar.tsx";
import { axiosInstance } from "../../../shared/api/axios";
import toast from "react-hot-toast";
import { errorLogV2 } from "../../../../../shared/error/error.log.ts";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import NotificationComponent from "../components/NotificationComponent";
import LoadingPage from "../../../shared/pages/common/LoadingPage";
import type { NotificationAPIResponse } from "../../../../../backend/features/notification/domain/dto/notification.dto";
import type User from "../../../../../backend/features/auth/domain/entities/user";
import AuthMobileSidebar from "../../auth/components/mobile/AuthMobileSidebar";

// Component
const NotificationPage = () => {
  const queryClient = useQueryClient();
  // Get current user - Caching
  const currentUser = queryClient.getQueryData<User>(["authUser"]);
  // - 1. Fetch all notifications by currentUserId
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", currentUser?.id],
    queryFn: async () => {
      // Data type axios.get<Date Type>
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
        queryKey: ["notifications", currentUser?.id],
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
        queryKey: ["notifications", currentUser?.id],
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
    <div className="min-h-screen relative">
      {/* Left - Sidebar */}
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      {/* Right - main - margin-l -150px */}
      <div className="">
        <div className=" pl-5 lg:pl-[150px] w-full h-full">
          {/* SubContainer - main content container */}
          <div className=" mx-auto rounded-xl shadow-sm border-solid border w-[85%]  sm:w-[80%]  pb-10 h-fit  mt-10">
            {/* Notification */}
            <h3 className="font-content text-2xl py-4 shadow-sm  tracking-wide px-4 rounded-sm ">
              Notificaiton
            </h3>
            {/* Notification - Component */}
            {notifications?.data?.length > 0 ? (
              <div>
                {notifications?.data.map(
                  (notification: NotificationAPIResponse) => (
                    <NotificationComponent
                      key={notification.notifications_id}
                      notification={notification}
                      onReadNotification={readNotification}
                      onDeleteNotification={deleteNotification}
                    />
                  )
                )}
              </div>
            ) : (
              <div className=" w-full min-h-[400px] flex items-center justify-center">
                <p>No notifications yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
