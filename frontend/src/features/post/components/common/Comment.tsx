import { formatDistanceToNow } from "date-fns";

/*
    Comment Component
*/
interface CommentProps {
  comment: {
    id?: string;
    user_id: string;
    content: string;
    created_at?: Date;
    user_name?: string;
    user_profile_image?: string;
  };
}
const Comment = ({ comment }: CommentProps) => {
  // BUILD UI
  console.log("Comment", comment);
  return (
    <div className="pb-2">
      <div className="flex flex-col rounded-xl bg-gray-50 shadow-sm">
        {/* Comment */}
        <div className="p-2 rounded-xl ">
          <div className="flex w-full gap-x-2 flex-col">
            <div className="flex items-center gap-x-2">
              <img
                src={comment.user_profile_image ?? "/userProfile.png"}
                alt="writer_user"
                className="size-12 rounded-full"
              />
              <div className="w-full rounded-xl ">
                <p>{comment.user_name}</p>
                <p className="text-[10px] text-hintText">
                  {comment.created_at && (
                    <span>
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <p className="pl-2">{comment.content} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
