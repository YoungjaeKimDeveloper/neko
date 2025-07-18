/*
    users can see found cat
*/

/*

    Authorized user - Homepage

*/
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { errorLogV2 } from "../../../../shared/error/error.log";
import PostCard from "../home/components/PostCard";
import toast from "react-hot-toast";
import type { ResponseDTO } from "../../../../shared/dto/common/response.dto";
import type { PostWithWriter } from "../../../../backend/features/post/domain/entities/post";
import LoadingPage from "../../shared/pages/common/LoadingPage";
import type User from "../../../../backend/features/auth/domain/entities/user";
import AuthMobileSidebar from "../auth/components/mobile/AuthMobileSidebar";
import { AuthDesktopSidebar } from "../auth/components/desktop/AuthDesktopSidebar";
import { axiosInstance } from "../../shared/api/axios";
// Component
const FoundPage = () => {
  const queryClient = useQueryClient();
  // Auth user
  const authUser = queryClient.getQueryData<User>(["authUser"]);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts-found"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get<ResponseDTO>("/posts/found");
        console.log("Results are here - ", result);
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

  if (isLoading) {
    return <LoadingPage />;
  }
  // BUILD UI
  return (
    <div className="flex min-h-screen w-screen">
      {/* Sidebar - left */}
      {/* <AuthDesktopSidebar /> */}
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      {/* MainPage - Right */}
      {/* Cards layout */}
      <div className="h-screen w-screen mx-auto lg:pr-10">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-fit lg:w-full mx-auto mt-4 lg:mx-4 lg:pl-[200px] gap-5 gap-y-10 pb-32">
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

export default FoundPage;
