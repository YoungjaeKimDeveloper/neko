/*

    Not Found 404 page

*/

import MainButton from "../../components/MainButton";
import { Link } from "react-router-dom";
// Component
const NotFoundPage = () => {
  // BUILD UI
  return (
    <div className=" pl-5 w-full">
      {/* SubContainer - main content container */}
      <div className=" mt-10 mx-auto rounded-xl shadow-xl border-solid border w-[80%] min-h-[400px] md:min-h-[600px] h-full flex flex-col">
        {/* Notification */}
        <h3 className="font-content text-2xl py-4 shadow-md px-4 rounded-sm text-center">
          404 Not found
        </h3>
        {/* Details */}
        <div className="w-full h-full flex items-center justify-center flex-1 flex-col gap-y-2">
          {/* Neko Image */}
          <div className="bg-gray-50 w-fit h-fit size-10 rounded-xl shadow-md">
            <img
              src="/neko_logo.png"
              alt="homePage_logo"
              className="object-contain size-40"
            />
          </div>
          {/* Text */}
          <p>Sorry, cannot find the page</p>
          {/* Button - Back to Home */}
          <Link to="/">
            <MainButton text="Home" style="mt-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
