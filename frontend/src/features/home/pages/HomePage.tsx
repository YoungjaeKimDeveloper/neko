/*

    Authorized user - Homepage

*/
import { useQuery } from "@tanstack/react-query";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import { axiosInstance } from "../../../shared/api/axios";
import { errorLogV2 } from "../../../../../shared/error/error.log";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import type { PostWithWriter } from "../../../../../backend/features/post/domain/entities/post";
// Component
const HomePage = () => {
  const { data: posts } = useQuery({
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
  });
  console.log(posts);
  // BUILD UI
  return (
    <div className="flex min-h-screen w-screen">
      {/* Sidebar - left */}
      <AuthDesktopSidebar />
      {/* MainPage - Right */}
      {/* Cards layout */}
      <div className="h-screen w-screen mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 w-fit lg:w-full mx-auto  gap-y-4 mt-4 lg:mx-4">
          {/* Mapping posts */}
          {posts?.map((post: PostWithWriter) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
