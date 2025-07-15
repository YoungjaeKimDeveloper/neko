/*

    Help Page

*/

import { ChevronUp, Smile } from "lucide-react";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import AuthMobileSidebar from "../../auth/components/mobile/AuthMobileSidebar";
import faqList from "../data/help.data.json";
// Component
const HelpPage = () => {
  console.log("FAQLIST", faqList);
  // BUILD UI
  return (
    <div className="flex min-h-screen w-screen">
      {/* Sidebar - left */}
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      {/* Right Container - Right */}
      <div className="w-full ml-[75px] md:ml-[150px] ">
        <div className=" mx-auto mt-10 w-[80%] h-screenflex-1 flex flex-col items-center rounded-xl shadow-xl">
          <div className="size-24 bg-gray-50 mt-4 rounded-xl shadow-sm mb-5">
            {/* Logo - Content */}
            <img
              src="/neko_logo.png"
              alt="neko_logo"
              className="object-cover"
            />
          </div>
          {/* Top - title */}
          <h3 className="text-2xl font-content">Frequently asked questions</h3>
          {/* Top - Subtitle */}
          <p className="text-sm text-hintText mb-5">
            These are the most commonly asked questions about Neko
          </p>

          {/* Bottom - Container */}
          <div className="flex items-start w-[75%] md:w-[60%] relative mt-10 bg-red-400">
            <div className="bg-gray-100 size-10 flex items-center justify-center rounded-xl  absolute bottom-5 -left-12">
              <Smile />
            </div>
            <div className="flex justify-between w-full flex-col ">
              <div className="flex justify-between w-full">
                <h3 className="font-content">
                  Is there a free trial available?
                </h3>
                <ChevronUp />
              </div>
              <p className="font-sans inline-block">yes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
