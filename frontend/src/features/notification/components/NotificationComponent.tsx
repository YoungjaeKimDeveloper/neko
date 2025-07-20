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
}
// COMPONENT
const NotificationComponent = ({
  notification,
  onReadNotification,
  onDeleteNotification,
}: NotificationComponentProps) => {
  // DELETE NOTIFICATION - CONTROL STATE LOCALLY
  const [isDeletingNotification, setIsDeletingNotification] =
    useState<boolean>(false);
  const [isReadingComment, setIsReadingComment] = useState<boolean>(false);

  // Handle DeleteNotification - Locally
  const handleDeleteNotification = async () => {
    setIsDeletingNotification(true);
    // CREATE NEW PROMISE TO MANAGE BETTER UI
    await onDeleteNotification(notification.notifications_id);
    setIsDeletingNotification(false);
  };
  // Handle Read Notification - Manage Statement Locally
  const handleReadNotification = async () => {
    setIsReadingComment(true);
    await onReadNotification(notification.notifications_id);
    setIsReadingComment(false);
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
      className={`relative mt-5  min-h-[120px] rounded-xl w-[90%] mx-auto text-sm `}
    >
      <div className=" w-full h-full">
        {/* Userimg -top */}
        <Link to={`/${notification.user_user_name}`}>
          <img
            src={`${
              notification.users_user_profile_image ?? "/userProfile.png"
            } `}
            alt="user_profile_img"
            className="size-14 rounded-full z-0 translate-y-2 bottom-12"
          />
        </Link>
        {/* Details - bottom */}
        <div
          className={`flex items-center gap-x-4 mb-4 top-12 -z-10   left-2 w-[99%] rounded-xl py-2 px-2 border-gray-200 border shadow-sm ${
            notification.notifications_is_read && "bg-gray-200"
          }`}
        >
          {/* postimg */}
          <Link to={`${postLinkUrl}`}>
            <img
              src={postImgUrl}
              alt="user_profile_img"
              className="size-14 rounded-xl"
            />
          </Link>
          <div className="flex justify-between w-full items-center rounded-xl">
            <div>
              <p>
                <span className=" text-sm sm:text-xl text-primary pr-1">
                  {notification.user_user_name}
                </span>
                {/* Text for Tablet && Desktop */}
                <span className="hidden sm:block">
                  {notification.notifications_type == "COMMENT"
                    ? "left a comment on your post."
                    : "reacted to your post"}
                </span>
              </p>
              {/* Text for mobile*/}
              <p className="sm:hidden text-[10px]">
                {notification.notifications_type == "COMMENT"
                  ? "left a comment on your post."
                  : "reacted to your post"}
              </p>
              <p className="text-sm ">
                {formatDistanceToNow(
                  new Date(notification.notifications_created_at!)
                )}
              </p>
            </div>
            {/* Icons */}
            <div className="flex gap-x-3 pr-2 z-50">
              {/* Delete Notification */}
              <button
                disabled={isDeletingNotification || isReadingComment}
                onClick={handleDeleteNotification}
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
                className="cursor-pointer"
                onClick={() => handleReadNotification()}
                disabled={
                  isDeletingNotification ||
                  isReadingComment ||
                  notification.notifications_is_read
                }
              >
                {isReadingComment ? (
                  <Loader2 className="animate-spin " />
                ) : (
                  <Check
                    className={`hover:stroke-green-500 duration-150 opacity-50 hover:cursor-pointer 
                  ${notification.notifications_is_read && "stroke-green-500"} `}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
