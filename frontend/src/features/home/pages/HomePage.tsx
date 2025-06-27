/*

    Authorized user - Homepage

*/
import { useQuery } from "@tanstack/react-query";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import { axiosInstance } from "../../../shared/api/axios";
import { errorLogV2 } from "../../../../../shared/error/error.log";

const HomePage = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get("/posts/all");
        return result.data;
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
    <div className="flex h-screen w-screen">
      {/* Sidebar - left */}
      <AuthDesktopSidebar />
      {/* Mainpage */}
      
    </div>
  );
};

export default HomePage;
