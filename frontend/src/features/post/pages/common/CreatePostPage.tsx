/* eslint-disable @typescript-eslint/no-unused-vars */
/*

    Create Post page - common(Mobile + Desktop)

*/

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PostInput from "../../components/common/PostInput";
import { AuthDesktopSidebar } from "../../../auth/components/desktop/AuthDesktopSidebar";
import MainButton from "../../../../shared/components/MainButton";
import ImageUpLoading from "react-images-uploading";
import type { ImageListType } from "react-images-uploading";
import { useState } from "react";
import { Plus, Trash, X } from "lucide-react";
// Schema - Runtime
const PostSchema = z.object({
  title: z.string().min(5, { message: "Title should be at least 5 letters" }),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 letters" }),
  rewardAmount: z.coerce.number(),
  location: z
    .string()
    .min(3, { message: "Location should be at least 3 letters" })
    .max(10, { message: "Location is too long (max:15 letters" }),
});
// Inferred Type - Complie
type Post = z.infer<typeof PostSchema>;
const CreatePostPage = () => {
  // React hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Post>({
    // Runtime Resolver
    resolver: zodResolver(PostSchema),
  });

  const [images, setImages] = useState<ImageListType>([]);
  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };
  const maxNumber: number = 5;
  const [isHovered, setisHovered] = useState(false);
  // BUILD UI
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <AuthDesktopSidebar />
      {/* Main */}
      <div className="flex flex-col items-start w-screen  gap-y-4">
        {/* Image Preview */}
        <div
          className={`w-[100%] mx-auto h-20 mt-10 max-w-[600px]  flex flex-col justify-between`}
        >
          <p>Create post</p>
          <ImageUpLoading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {/* Render Props */}
            {({ imageList, onImageUpload }) => (
              <div className="flex gap-x-2">
                {/* Add Icon */}
                {imageList.map((image) => (
                  <div className="size-10 relative">
                    <img
                      src={image.data_url}
                      alt="image"
                      className="size-10 rounded-sm"
                    />
                  </div>
                ))}
                {imageList.length < 5 && (
                  <div className="size-10 border border-dashed">
                    <div className="flex justify-center items-center w-full h-full">
                      <Plus onClick={onImageUpload} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ImageUpLoading>
        </div>
        {/* Title */}
        <PostInput
          title="Title"
          hintText="Please help me find the cat"
          numberOfLetters={10}
        />
        {/* Text area - Description */}
        <div className="w-[100%] mx-auto h-[200px] mt-5 max-w-[600px]">
          <div className="flex mx-auto h-full">
            {/* Title and Input */}
            <div className="flex flex-col w-full items-start h-full">
              <div className="flex flex-col w-full h-full">
                <p>Description</p>
                <textarea
                  maxLength={100}
                  placeholder="I lost my cute cat near Townhall station"
                  className={
                    "input shadow-postInput w-full  mt-3 font-content pl-[10px] h-full py-2 resize-none"
                  }
                />
              </div>
              {/* World counter */}
              <div className="flex justify-end w-full ">
                <div className="flex items-end">
                  <p className="text-hintText">0/{100}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostInput title="Reward amount" hintText="$0" numberOfLetters={10} />
        <PostInput
          title="Location"
          hintText="Townhall station"
          numberOfLetters={20}
        />
        <MainButton text="Post" style="w-[40%] mt-5 " />
      </div>
    </div>
  );
};

export default CreatePostPage;
