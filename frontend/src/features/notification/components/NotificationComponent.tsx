/*

    NotificationComponent component
    
    
*/

import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Check, Loader2, Trash2 } from "lucide-react";
import type { NotificationAPIResponse } from "../../../../../backend/features/notification/domain/dto/notification.dto";
import { Link } from "react-router-dom";

interface NotificationComponentProps {
  notification: NotificationAPIResponse;
  onReadNotification: (notificationId: string) => void;
  onDeleteNotification: (notificationId: string) => void;
  isReadingNotification: boolean;
  isDeleting: boolean;
}
// COMPONENT
const NotificationComponent = ({
  notification,
  isReadingNotification,
  onReadNotification,
  onDeleteNotification,
  isDeleting,
}: NotificationComponentProps) => {
  // DELETE NOTIFICATION - CONTROL STATE LOCALLY
  const [isDeletingNotification, setIsDeletingNotification] =
    useState<boolean>(false);

  // MANAGE NOTIFICATION LOCALLY
  console.log(isDeletingNotification);
  const handleDeleteNotification = async () => {
    setIsDeletingNotification(true);
    try {
      // CREATE NEW PROMISE TO MANAGE BETTER UI
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onDeleteNotification(notification.notifications_id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletingNotification(false); // 3초 지난 후에 false로 변경
    }
  };
  // Check - it the array is null or not.
  const postImgUrl =
    Array.isArray(notification.post_image_urls) &&
    notification.post_image_urls.length > 0
      ? notification.post_image_urls[0]
      : "/neko_logo.png";
  const postLinkUrl = notification?.notifications_related_post_id
    ? `/posts/${notification?.notifications_related_post_id}`
    : "/404Page";
  // BUILD UI
  return (
    <div
      className={`relative mt-5 shadow-xl min-h-[120px] rounded-xl w-full ${
        notification.notifications_is_read && "bg-gray-200"
      }`}
    >
      <div className=" w-full h-full">
        {/* Userimg -top */}
        <img
          src={`${
            notification.users_user_profile_image ?? "/userProfile.png"
          } `}
          alt="user_profile_img"
          className="size-14 rounded-full z-20 absolute bottom-15"
        />
        {/* Details - bottom */}
        <div className="flex items-center gap-x-4 mb-4 top-12 z-0 absolute left-2 w-[99%] rounded-xl">
          {/* postimg */}
          <Link to={`${postLinkUrl}`}>
            <img
              src={postImgUrl}
              alt="user_profile_img"
              className="size-14 rounded-xl left-0 top-0"
            />
          </Link>
          <div className="flex justify-between w-full items-center rounded-xl">
            <div>
              <p>
                <span className="text-xl text-primary pr-1">
                  {notification.user_user_name}
                </span>
                {notification.notifications_type == "COMMENT"
                  ? "left a comment on your post."
                  : "reacted to your post"}
              </p>
              <p className="text-sm text-hi">
                {formatDistanceToNow(
                  new Date(notification.notifications_created_at!)
                )}
              </p>
            </div>
            {/* Icons */}
            <div className="flex gap-x-3 pr-2">
              {/* Delete Notification */}
              <button
                disabled={
                  isReadingNotification || isDeletingNotification || isDeleting
                }
                onClick={() => handleDeleteNotification()}
              >
                {isDeletingNotification ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2
                    className={`hover:stroke-red-500 duration-150 opacity-50 hover:cursor-pointer ${
                      isDeletingNotification && "stroke-red-600"
                    }`}
                  />
                )}
              </button>
              {/* Read Notification */}
              <button
                onClick={() =>
                  onReadNotification(notification.notifications_id)
                }
                disabled={
                  isReadingNotification || isDeletingNotification || isDeleting
                }
              >
                <Check
                  className={`hover:stroke-green-500 duration-150 opacity-50 hover:cursor-pointer 
                    ${isReadingNotification && "stroke-green-500"}
                  ${notification.notifications_is_read && "stroke-green-500"} `}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
