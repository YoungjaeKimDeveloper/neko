/*

    Edit post page - Responsive Size - (Mobile + Desktop)
    Features
    - 1. Fetch Existed Post image
    - 2. User can Update
    Validation
    1. Zod + RHF

    Always Searpate
    - UI
    - Main Logic
    - Side Effect
    
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
import { axiosInstance } from "../../../../shared/api/axios";
import { RESPONSE_HTTP } from "../../../../../../shared/constants/http-status";
import { errorLogV2 } from "../../../../../../shared/error/error.log";
import toast from "react-hot-toast";
import type { ResponseDTO } from "../../../../../../shared/dto/common/response.dto";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../../../shared/pages/common/LoadingPage";
import type { Post } from "../../../../../../backend/features/post/domain/entities/post";
// Schema - Runtime

// Component
const EditPostPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const [description, setdescription] = useState<number>(0);
  const [images, setImages] = useState<ImageListType>([]);
  // Fetch existed Data - UseQuery - Main Logic
  const {
    data: fetchedPost,
    isLoading: isFetchPostLoading,
    isSuccess: isFetchedData,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const result = await axiosInstance.get<ResponseDTO>(`/posts/${postId}`);
      // Throw error when it fails to load
      if (result.data.success !== true) {
        throw new Error("Failed to fetch single Post with postId");
      }
      console.log("Fetched Post Successfully ", fetchedPost);
      return result.data.data;
    },
    onError: (error) => {
      errorLogV2({
        error: error,
        function: "Fetch existed post",
        file: "EditPostPage.tsx",
      });
    },
  });

  // React hook-form (RHF)
  const {
    register,
    handleSubmit,
    // Catch the check the error manually
    // Set the value manually
    setValue,
    setError,
    reset,
    // Show erros || isSubmitting
    formState: { errors },
    // Accpet the Filed mathcing schema
    // Check the type based on Shcema
  } = useForm<PostFormValues>({
    // Runtime Checker(Resolver)
    resolver: zodResolver(PostSchema),
  });
  // Set the default values when data fetched
  useEffect(() => {
    if (isFetchedData && fetchedPost) {
      reset({
        title: fetchedPost.title,
        content: fetchedPost.content,
        image_urls: fetchedPost.image_urls,
        location: fetchedPost.location,
        reward_amount: fetchedPost.reward_amount,
      });
    }
  }, [isFetchedData, fetchedPost, reset]);
  // Track the number of description

  // Image Tracker[S] -------------
  // As image uploder is external libary,it is impossible to track using input,
  useEffect(() => {
    register("image_urls");
  }, [register]);

  // Handle image lists
  const onChange = (imageList: ImageListType) => {
    // UI for user
    setImages(imageList);
    // Track the image value manually
    // images[key] : value[imageList.map((img)=>img.file)]
    // Set the value manually, instead of using register
    // {"image_ulrs",["imageUrl1,imageUrl2,imageUrl3"]}
    setValue(
      "image_urls",
      imageList.map((img) => img.data_url),
      // After users set new iamge -> check the validtaion
      { shouldValidate: true } // base64
    );
  };
  // Image Tracker[E] ------------------

  // Submit the new from to update post
  const { mutateAsync: updatePost, isPending: isUpdating } = useMutation({
    // useMutation에서는 외부에서 직접적으로 데이터를 받아와서 사용해줘야함
    // 실제 function 자체를 의미함
    mutationFn: async (data: PostFormValues) => {
      const result = await axiosInstance.put<ResponseDTO>(
        `posts/${postId}`,
        data
      );
      if (result.data.status != RESPONSE_HTTP.OK) {
        throw new Error(`Failed to update post ${result.data.message}`);
      }
    },
    onSuccess: async () => {
      toast.success("Post Editted successfully");
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      await navigate("/home");
    },
    onError: (error) => {
      errorLogV2({
        file: "EditPostPage.tsx",
        error: error,
        function: "updatePost",
      });
      if (error instanceof Error) {
        setError("root", {
          type: "server",
          message: error.message,
        });
        toast.error(`Failed to update post ${error.message}`);
      }
    },
  });
  //   Loading UI
  if (isFetchPostLoading) {
    return <LoadingPage />;
  }
  const { title, content, is_found, image_urls, location, reward_amount } =
    fetchedPost;
  console.log("Image urls", image_urls);
  // BUILD UI
  return (
    <div className="flex pb-20">
      {/* Left Sidebar */}
      <AuthDesktopSidebar />
      {/* Right - main */}
      <form
        className="flex flex-col items-start w-screen  gap-y-4"
        onSubmit={handleSubmit((data) => updatePost(data))}
      >
        {/* Image Preview */}
        <div
          className={`w-[100%] mx-auto h-20 mt-10 max-w-[600px]  flex flex-col justify-between`}
        >
          <p>Create post</p>
          {/* Image Uploader images */}
          <ImageUploader images={images} onChange={onChange} />
          {image_urls.map((url: string) => (
            <div className="size-10 relative">
              <img src={url} alt="image" className="size-10 rounded-sm" />
            </div>
          ))}
          {errors.image_urls?.message}
        </div>
        {/* Title */}
        <PostInput
          title="Title"
          hintText={title}
          numberOfLetters={20}
          register={register("title")}
          errorMessage={errors.title?.message}
        />
        {/* Text area - Description */}
        <div className="w-[100%] mx-auto h-[200px] mt-5 max-w-[600px]">
          <div className="flex mx-auto h-full">
            {/* Title and Input */}
            <div className="flex flex-col w-full items-start h-full">
              {/* DESCRIPTION */}
              <div className="flex flex-col w-full h-full">
                <p>Description</p>
                <textarea
                  {...register("content", {
                    onChange: (e) => setdescription(e.target.value.length),
                  })}
                  maxLength={300}
                  placeholder={content}
                  className={
                    "input shadow-postInput w-full  mt-3 font-content pl-[10px] h-full py-2 resize-none"
                  }
                />
              </div>
              {/* World counter */}
              <div className="flex justify-end w-full ">
                <div className="flex justify-between w-full">
                  <p className="text-warning">{errors.content?.message} </p>
                  <p className="text-hintText">
                    {description}/{300}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reward amount*/}
        <PostInput
          title="Reward amount"
          hintText={`$${reward_amount}`}
          numberOfLetters={10}
          register={register("reward_amount")}
          errorMessage={errors.reward_amount?.message}
        />
        {/* Location */}
        <PostInput
          title="Location"
          hintText={location}
          numberOfLetters={10}
          register={register("location")}
          errorMessage={errors.location?.message}
        />
        {/* Submit BTN */}
        {isUpdating ? (
          <MainButton
            text="Loading..."
            type="submit"
            style="w-[40%] mt-5"
            isLoading={isUpdating}
          />
        ) : (
          <MainButton
            text="Edit"
            type="submit"
            style="w-[40%] mt-5"
            isLoading={isUpdating}
          />
        )}
      </form>
    </div>
  );
};

export default EditPostPage;
