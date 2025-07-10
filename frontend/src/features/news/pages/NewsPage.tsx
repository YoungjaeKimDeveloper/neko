/*

    News Page

*/

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NewsResponse } from "../types/news.type";
// BUILD COMPONENT
const NewsPage = () => {
  const newsAPI = import.meta.env.VITE_NEWS_API;
  const { data } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const result = await axios.get<NewsResponse>(newsAPI);
      return result.data.articles;
    },
    onError: (error) => {
      console.log("Failed to fetch the NEWS data", error);
    },
  });

  if (data != null) {
    console.log(data[0].content);
  }
  // BUILD UI
  return <div>NewsPage</div>;
};

export default NewsPage;
