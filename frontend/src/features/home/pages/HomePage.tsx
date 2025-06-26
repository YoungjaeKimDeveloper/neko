/*

    Authorized user - Homepage

*/

import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <AuthDesktopSidebar />
      {/* Mainpage */}
    </div>
  );
};

export default HomePage;
