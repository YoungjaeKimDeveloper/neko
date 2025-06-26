/* eslint-disable @typescript-eslint/no-unused-vars */
/*

    Create Post page - common(Mobile + Desktop)

*/

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PostInput from "../../components/common/PostInput";
import { AuthDesktopSidebar } from "../../../auth/components/desktop/AuthDesktopSidebar";
import MainButton from "../../../../shared/components/MainButton";
import type { ImageListType } from "react-images-uploading";
import { useEffect, useState } from "react";
import { PostSchema, type PostFormValues } from "../../schema/postSchema";
import ImageUploader from "../../../../shared/components/ImageUploader";

// Schema - Runtime

// Inferred Type - Complie
// Component
const CreatePostPage = () => {
  // React hook-form (RHF)
  const {
    register,
    handleSubmit,
    // Catch the check the error manually
    setError,
    // Set the value manually
    setValue,
    // Show erros || isSubmitting
    formState: { errors, isSubmitting },
    // Accpet the Filed mathcing schema
    // Check the type based on Shcema
  } = useForm<PostFormValues>({
    // Runtime Checker(Resolver)
    resolver: zodResolver(PostSchema),
  });
  // Todo - Double check
  // As image uploder is external libary,it is impossible to track using input,
  // So, track the value, manually.
  useEffect(() => {
    register("images");
  }, [register]);

  // Add "images" to register
  register("images");
  //   Save images in array
  const [images, setImages] = useState<ImageListType>([]);
  // onChange method
  const onChange = (imageList: ImageListType) => {
    // UI for user
    setImages(imageList);
    // Track the image value manually
    // images[key] : value[imageList.map((img)=>img.file)]
    setValue(
      "images",
      imageList.map((img) => img.file)
    );
  };
  // BUILD UI
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <AuthDesktopSidebar />
      {/* Right - main */}
      <div className="flex flex-col items-start w-screen  gap-y-4">
        {/* Image Preview */}
        <div
          className={`w-[100%] mx-auto h-20 mt-10 max-w-[600px]  flex flex-col justify-between`}
        >
          <p>Create post</p>
          {/* Image Uploader */}
          <ImageUploader images={images} onChange={onChange} />
        </div>
        {/* Title */}
        <PostInput
          title="Title"
          hintText="Please help me find the cat"
          numberOfLetters={10}
          register={register("title")}
        />
        {/* Text area - Description */}
        <div className="w-[100%] mx-auto h-[200px] mt-5 max-w-[600px]">
          <div className="flex mx-auto h-full">
            {/* Title and Input */}
            <div className="flex flex-col w-full items-start h-full">
              <div className="flex flex-col w-full h-full">
                <p>Description</p>
                <textarea
                  {...register("description")}
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
        <PostInput
          title="Reward amount"
          hintText="$0"
          numberOfLetters={10}
          register={register("rewardAmount")}
        />
        <PostInput
          title="Location"
          hintText="Townhall station"
          numberOfLetters={20}
          register={register("location")}
        />
        <MainButton text="Post" style="w-[40%] mt-5 " />
      </div>
    </div>
  );
};

export default CreatePostPage;
