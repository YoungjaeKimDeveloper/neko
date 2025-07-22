import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PostInput from "../../components/common/PostInput";
import { AuthDesktopSidebar } from "../../../auth/components/Desktop/AuthDesktopSidebar.tsx";
import MainButton from "../../../../shared/components/MainButton";
import type { ImageListType } from "react-images-uploading";
import { useEffect, useState } from "react";
import { PostSchema, type PostFormValues } from "../../schema/postSchema";
import ImageUploader from "../../../../shared/components/ImageUploader";
import { axiosInstance } from "../../../../shared/api/axios";
import { RESPONSE_HTTP } from "../../../../../../shared/constants/http-status.ts";

import toast from "react-hot-toast";
import type { ResponseDTO } from "../../../../../../shared/dto/common/response.dto";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthMobileSidebar from "../../../auth/components/mobile/AuthMobileSidebar";

// Component
const CreatePostPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // React hook-form (RHF)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    // Runtime Checker(Resolver)
    resolver: zodResolver(PostSchema),
    // check the validation based on real time
    // Based on user interaction
    mode: "onChange",
  });
  const content = watch("content") || "";
  // As image uploder is external libary,it is impossible to track using input,
  // So, track the value, manually.
  useEffect(() => {
    register("image_urls");
  }, [register]);

  // Manage images
  const [images, setImages] = useState<ImageListType>([]);
  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
    // Set the values manually to RHF
    setValue(
      "image_urls",
      imageList.map((img) => img.data_url),
      // Check the validation manually.
      { shouldValidate: true }
    );
  };

  // Create new Post
  const { mutateAsync: createPost } = useMutation({
    mutationFn: async (data: PostFormValues) => {
      const result = await axiosInstance.post<ResponseDTO>("/posts", data);
      if (
        result.status !== RESPONSE_HTTP.CREATED ||
        result.data.success !== true
      ) {
        console.log("에러추적", result.data);
        throw new Error(result.data.message || "Failed to create newpost");
      }
      return true;
    },
    // Success
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await navigate("/");
    },
    onError: async (error) => {
      if (error instanceof Error) {
        console.log("에러 열어보기", error);
        setError("root", {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (error as any).response.data.message,
        });
        toast.error("Failed to create new post");
      }
    },
    // Error(fail)
  });
  // Submit form to Backend - Call API
  const onSubmit: SubmitHandler<PostFormValues> = (data) => createPost(data);

  // BUILD UI
  return (
    <div className="flex pb-40">
      {/* Left Sidebar */}
      <AuthMobileSidebar />
      <AuthDesktopSidebar />
      {/* Right - main */}
      <form
        className="flex flex-col items-start w-[80%] mx-auto lg:w-screen gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className="flex flex-col items-start w-[80%] mx-auto lg:w-screen gap-y-4"
          disabled={isSubmitting}
        >
          {/* Image Preview */}
          <div
            className={`w-[100%] mx-auto h-20 mt-10 max-w-[600px]  flex flex-col justify-between`}
          >
            <p className="pb-4">Create post</p>
            {/* Image Uploader */}
            <ImageUploader images={images} onChange={onChange} />
            <p className="text-warning text-[12px] md:text-sm py-2">
              {errors.image_urls?.message}
            </p>
          </div>
          {/* Title */}
          <PostInput
            title="Title"
            hintText="Please help me find the cat"
            numberOfLetters={40}
            register={register("title")}
            errorMessage={errors.title?.message}
            isSubmitting={isSubmitting}
          />
          {/* Text area - Description */}
          <div className="w-[100%] mx-auto h-[200px] mt-5 max-w-[600px]">
            <div className="flex mx-auto h-full">
              {/* Title and Input */}
              <div className="flex flex-col w-full items-start h-full">
                <div className="flex flex-col w-full h-full">
                  <p>Description</p>
                  <textarea
                    disabled={isSubmitting}
                    {...register("content")}
                    maxLength={300}
                    placeholder="I lost my cute cat near Townhall station"
                    className={
                      "input shadow-postInput w-full  mt-3 font-content pl-[10px] h-full py-2 resize-none"
                    }
                  />
                </div>
                {/* World counter */}
                <div className="flex justify-end w-full ">
                  <div className="flex justify-between w-full">
                    <p className="text-warning text-[12px] md:text-sm">
                      {errors.content && errors.content?.message}{" "}
                    </p>
                    <p className="text-hintText">
                      {content.length}/{300}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PostInput
            title="Reward amount"
            hintText="$0"
            numberOfLetters={3}
            register={register("reward_amount")}
            errorMessage={errors.reward_amount?.message}
            isSubmitting={isSubmitting}
          />
          <PostInput
            title="Location"
            hintText="Townhall station"
            numberOfLetters={30}
            register={register("location")}
            errorMessage={errors.location?.message}
            isSubmitting={isSubmitting}
          />
          {isSubmitting ? (
            <MainButton
              text="Loading..."
              type="submit"
              style="w-[30%] mt-5 mx-auto min-w-[200px]"
              isLoading={isSubmitting}
            />
          ) : (
            <MainButton
              text="Post"
              type="submit"
              style="w-[30%] mt-5 mx-auto min-w-[200px]"
              isLoading={isSubmitting}
            />
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePostPage;
