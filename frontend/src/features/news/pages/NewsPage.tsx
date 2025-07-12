/*

    News Page
    1. Needs to implement News Card

*/

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NewsResponse } from "../types/news.type";
import LoadingPage from "../../../shared/pages/common/LoadingPage";
import { errorLogV2 } from "../../../../../shared/error/error.log";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import NewsCard from "../components/NewsCard";
import AuthMobileSidebar from "../../auth/components/mobile/AuthMobileSidebar";
// BUILD COMPONENT
const NewsPage = () => {
  const newsAPI = import.meta.env.VITE_NEWS_API;
  // Fetch News Data
  const { data: newsData, isLoading: isNewsLoading } = useQuery({
    queryKey: ["newsData"],
    queryFn: async () => {
      const result = await axios.get<NewsResponse>(newsAPI);
      return result.data.articles;
    },
    onSuccess: () => {
      console.log(newsData);
    },
    onError: (error) => {
      errorLogV2({
        error: error,
        function: "fetching news data",
        file: "NewsPage.tsx",
      });
    },
  });
  console.log("News: ", newsData);
  // BUILD UI - Loading Page
  if (isNewsLoading) {
    return <LoadingPage />;
  }
  // BUILD UI - Main Page
  return (
    <div className=" ">
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      <div className="grid grid-cols-1 lg:grid-cols-4 w-fit lg:w-full mx-auto pt-4 lg:mx-2 lg:pl-[200px] gap-5 gap-y-10 pb-32 ">
        {/* Sidebar */}

        {/* Show News Card */}
        {newsData?.map((news, index) => (
          <NewsCard key={index} {...news} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
