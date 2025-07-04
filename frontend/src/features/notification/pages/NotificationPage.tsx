/*

    Notification Page
        - Services
            - 1. Fetch all notifications by currentUserId
            - 2. Read a notification
            - 3. Delete a notification
*/

import { Check, Trash2 } from "lucide-react";
import { AuthDesktopSidebar } from "../../auth/components/desktop/AuthDesktopSidebar";

// Component
const NotificationPage = () => {
  // BUILD UI
  // Container
  return (
    <div>
      {/* Left - Sidebar */}
      <AuthDesktopSidebar />
      {/* Right - main - margin-l -150px */}
      <div className="pl-[150px]  w-full h-full">
        {/* SubContainer - main content container */}
        <div className=" mt-10  mx-auto rounded-xl shadow-xl border-solid border w-[80%] h-[600px] py-2 px-4">
          {/* Notification */}
          <h3 className="font-content text-2xl">Notificaiton</h3>
          {/* Notification - Component */}
          <div className="relative mt-5 shadow-xl min-h-[120px] rounded-xl w-full">
            <div className=" w-full h-full">
              {/* Userimg -top */}
              <img
                src="/userProfile.png"
                alt="user_profile_img"
                className="size-14 rounded-full z-20 absolute bottom-15"
              />
              {/* Details - bottom */}
              <div className="flex items-center gap-x-4 mb-4 top-12 z-0 absolute left-2 w-[99%] rounded-xl">
                {/* postimg */}
                <img
                  src="/landing_page.jpg"
                  alt="user_profile_img"
                  className="size-14 rounded-xl left-0 top-0"
                />
                <div className="flex justify-between w-full items-center rounded-xl">
                  <div>
                    <p>
                      <span className="text-2xl text-primary">Sam</span> left a
                      comment on your post.
                    </p>
                    <p>3 days ago</p>
                  </div>
                  {/* Icons */}
                  <div className="flex gap-x-3 pr-2">
                    <Trash2 className="hover:opacity-100 duration-150 opacity-50 hover:cursor-pointer" />
                    <Check className="hover:opacity-100 duration-150 opacity-50 hover:cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
