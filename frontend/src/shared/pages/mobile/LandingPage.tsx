/* 

  Shared Landing page

*/
import { Link } from "react-router-dom";

import MainButton from "../../components/MainButton";
const Landingpage = () => {
  return (
    // Outer - Position
    <div className="px-10 mb-10 mt-12  h-screen">
      {/* Container*/}
      <div className="w-full h-fit lg:h-[80%] rounded-card  flex flex-col items-center lg:justify-center py-4 lg:flex-row lg:gap-10 shadow-xl">
        {/* Loayout */}
        <img
          src={"/landing_page.jpg"}
          alt="landing_image"
          className="rounded-card w-[90%] max-h-[80%] mt-5 shadow-lg lg:w-[33%] lg:h-[66%]"
        />
        {/* Small Text */}
        <div className="mt-5 lg:w-[33%] lg:flex lg:flex-col lg:items-center lg:text-center lg:shadow-md lg:h-[66%] lg:py-4 lg:rounded-card flex  flex-col items-center justify-center lg:border lg:border-gray-200">
          <div className="flex flex-col items-center gap-y-4 font-content text-gray-500 ">
            <p>Did you lose your cat?</p>
            <p>Don't worry - you're not alone.</p>
            <p>Our community member are here to</p>
            <p>help you find your lovely family cat.</p>
          </div>
          {/* Big text  */}
          <div className="flex flex-col mt-8 gap-2 font-content text-center text-xl ">
            <p>Not just an animal.</p>
            <p>Not just a companion.</p>
            <p>A cat is part of the family.</p>
          </div>
          {/* Find a cat button */}
          <div className="flex items-center justify-center mt-10 ">
            <Link to={"/login"}>
              <MainButton text="Find a cat" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
