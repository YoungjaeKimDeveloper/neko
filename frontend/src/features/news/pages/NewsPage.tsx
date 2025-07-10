/*

    News Page

*/

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
// BUILD COMPONENT
const NewsPage = () => {
  const newsAPI = import.meta.env.VITE_NEWS_API;
  console.log("HERE IS NEWS API", newsAPI);
  const { data, isSuccess } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const result = await axios.get(newsAPI);
      return result.data;
    },
    onError: (error) => {
      console.log("Failed to fetch the NEWS data", error);
    },
  });
  useEffect(() => {
    console.log("Fetched Data", data);
  }, [isSuccess, data]);
  console.log(data);
  // BUILD UI
  return <div>NewsPage</div>;
};

export default NewsPage;
