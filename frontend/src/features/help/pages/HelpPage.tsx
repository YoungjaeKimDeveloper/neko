/*

    Help Page

*/

import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";
import AuthMobileSidebar from "../../auth/components/mobile/AuthMobileSidebar";
import FAQItem, { type ICONTYPE } from "../components/FAQItem";
import FAQLists from "../data/help.data.json";
// Component
const HelpPage = () => {
  // BUILD UI

  return (
    <div className="flex min-h-screen w-screen mb-20 ">
      {/* Sidebar - left */}
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      {/* Right Container - Right */}
      <div className="w-full lg:ml-[150px] ">
        <div className=" mx-auto mt-10 w-[80%] h-screenflex-1 flex flex-col items-center rounded-xl ">
          <div className="size-24 mt-4 rounded-xl  mb-5">
            {/* Logo - Content */}
            <img
              src="/neko_logo.png"
              alt="neko_logo"
              className="object-cover border border-gray-300 rounded-xl shadow-sm"
            />
          </div>
          {/* Top - title */}
          <h3 className="text-2xl font-content">Frequently asked questions</h3>
          {/* Top - Subtitle */}
          <p className="text-xl mt-2 text-hintText mb-5">
            These are the most commonly asked questions about Neko
          </p>

          {/* Bottom - Container */}
          <div className="flex items-start w-[75%] md:w-[60%] relative mt-10 flex-col gap-y-10">
            {FAQLists.map(({ icon, question, answer }, index) => (
              <FAQItem
                key={index}
                icon={icon as ICONTYPE}
                question={question}
                answer={answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
