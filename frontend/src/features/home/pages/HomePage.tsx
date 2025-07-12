/*

    Authorized user - Homepage

*/
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import { axiosInstance } from "../../../shared/api/axios";
import { errorLogV2 } from "../../../../../shared/error/error.log";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import type { PostWithWriter } from "../../../../../backend/features/post/domain/entities/post";
import LoadingPage from "../../../shared/pages/common/LoadingPage";
import type User from "../../../../../backend/features/auth/domain/entities/user";
// Component
const HomePage = () => {
  const queryClient = useQueryClient();
  // Auth user
  const authUser = queryClient.getQueryData<User>(["authUser"]);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get<ResponseDTO>("/posts/all");
        toast.success(result.data.message);
        return result.data.data;
      } catch (error) {
        errorLogV2({
          error,
          file: "HomePage",
          function: "Fetch posts",
        });
        return null;
      }
    },
    enabled: !!authUser,
  });

  // unreadNotification

  // if (notifications !== null) {
  //   const unreadNotification = notifications?.filter(
  //     (notification: NotificationAPIResponse) =>
  //       notification.notifications_is_read == false
  //   ).length;
  //   console.log(unreadNotification);
  // }

  console.log(posts);

  if (isLoading) {
    return <LoadingPage />;
  }
  // BUILD UI
  return (
    <div className="flex min-h-screen w-screen">
      {/* Sidebar - left */}
      <AuthDesktopSidebar />
      {/* MainPage - Right */}
      {/* Cards layout */}
      <div className="h-screen w-screen mx-auto lg:pr-10">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 w-fit lg:w-full mx-auto mt-4 lg:mx-4 lg:pl-[200px] gap-5 gap-y-10 pb-32">
            {/* Mapping posts */}
            {posts?.map((post: PostWithWriter) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
