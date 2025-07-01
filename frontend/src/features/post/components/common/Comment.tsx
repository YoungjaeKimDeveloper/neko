import { formatDistanceToNow } from "date-fns";

/*
    Comment Component
*/
interface CommentProps {
  comment: { id?: string; user_id: string; content: string; created_at?: Date };
}
const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="flex flex-col rounded-xl bg-gray-50 shadow-sm">
      {/* Comment */}
      <div className="p-2 rounded-xl ">
        <div className="flex w-full gap-x-2 flex-col">
          <div className="flex items-center gap-x-2">
            <img
              src="https://cdn.pixabay.com/photo/2018/10/29/21/46/human-3782189_1280.jpg"
              alt="writer_user"
              className="size-12 rounded-full"
            />
            <div className="w-full rounded-xl ">
              <p>James</p>
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
  );
};

export default Comment;
