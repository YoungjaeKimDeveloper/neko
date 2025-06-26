/*

    Common Post Input

*/

// Inteface
interface PostInput {
  title: string;
  hintText: string;
  numberOfLetters: number;
  height?: string;
}

// Component
const PostInput = ({ title, hintText, numberOfLetters, height }: PostInput) => {
  // BUILD UI
  return (
    // Container
    <div className={`w-[100%] mx-auto h-20  mt-3 max-w-[600px] ${height}`}>
      <div className="flex items-center justify-center mx-auto h-full">
        {/* Title and Input */}
        <div className="flex flex-col w-full items-start h-full">
          <div className="flex flex-col itmes-start w-full h-full">
            <p>{title}</p>
            <input
              placeholder={hintText}
              type="text"
              className={`input shadow-postInput w-full  mt-3 font-content pl-[10px] h-full py-2 `}
              maxLength={numberOfLetters}
            />
          </div>
          {/* World counter */}
          <div className="flex justify-end   w-full ">
            <div className="flex items-end">
              <p className="text-hintText">0/{numberOfLetters}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
