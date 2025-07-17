/*

    Common Post Input
    Always think
    Input + React Hook Form<PostFormValues>

*/
import { useState, useEffect } from "react";
// Q - Need to deep study
import type { UseFormRegisterReturn } from "react-hook-form";
// Inteface
// Name Convention - inter
// Name Convetion - Props
interface PostInputProps {
  title: string;
  hintText: string;
  numberOfLetters: number;
  height?: string;
  register: UseFormRegisterReturn; // from register Q - Need to deep study Track the value
  errorMessage?: string;
  value?: string;
  isSubmitting: boolean;
}

// Component
const PostInput = ({
  title,
  hintText,
  numberOfLetters,
  height,
  register, // Q - register return type
  errorMessage,
  value,
  isSubmitting,
}: PostInputProps) => {
  useEffect(() => {
    if (value) {
      setInputLength(value.length);
    }
  }, [value]);
  // Track number of letters
  const [inputLength, setInputLength] = useState<number>(value?.length ?? 0);
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
              disabled={isSubmitting}
              {...register}
              placeholder={hintText ?? value}
              type="text"
              className={`input shadow-postInput w-full  mt-3 font-content pl-[10px] h-full py-2 `}
              maxLength={numberOfLetters}
              // Track number and values
              onChange={(e) => {
                register.onChange(e);
                setInputLength(e.target.value.length);
              }}
            />
            {/* error message */}
            {errorMessage && (
              <p className="text-warning text-sm">{errorMessage}</p>
            )}
          </div>
          {/* World counter */}
          <div className="flex justify-end   w-full ">
            <div className="flex items-end">
              <p className="text-hintText">
                {inputLength}/{numberOfLetters}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
