import { Loader } from "lucide-react";

/*

    Common loading page

*/
const LoadingPage = () => {
  // BUILD UI
  return (
    <div className="w-full h-full flex items-center justify-center flex flex-col items-center">
      <Loader className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
