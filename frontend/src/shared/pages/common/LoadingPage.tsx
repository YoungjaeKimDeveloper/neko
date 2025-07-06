import { Loader } from "lucide-react";

/*

    Common loading page

*/
const LoadingPage = () => {
  // BUILD UI
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <Loader className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
