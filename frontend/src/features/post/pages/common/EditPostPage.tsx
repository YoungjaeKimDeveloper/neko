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
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../shared/api/axios";
import { errorLogV2 } from "../../../../../../shared/error/error.log";
import toast from "react-hot-toast";
import type { ResponseDTO } from "../../../../../../shared/dto/common/response.dto";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../../../shared/pages/common/LoadingPage";
import {
  UpdatePostSchema,
  type UpdatePostValues,
} from "../../schema/updatePostSchema";

// Schema - Runtime

// Component
const EditPostPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const [description, setDescription] = useState<string>("");

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
  } = useForm<UpdatePostValues>({
    // Runtime Checker(Resolver)
    resolver: zodResolver(UpdatePostSchema),
  });
  // As image uploder is external libary,it is impossible to track using input,

  // const onChange = (imageList: ImageListType) => {
  //   setImageList(imageList);
  //   setValue(
  //     "image_urls",
  //     imageList.map((img) => img.data_url),
  //     { shouldValidate: true }
  //   );
  // };
  // Set the default values when data fetched
  useEffect(() => {
    register("updated_image_urls");
    setValue("updated_image_urls", fetchedPost?.image_urls, {
      shouldValidate: true,
    });
  }, [register, setValue, fetchedPost?.image_urls]);

  useEffect(() => {
    if (isFetchedData && fetchedPost) {
      setDescription(fetchedPost?.content);
      reset({
        updated_title: fetchedPost.title,
        updated_content: fetchedPost?.content,
        updated_location: fetchedPost?.location,
        updated_reward_amount: fetchedPost?.reward_amount,
        updated_image_urls: fetchedPost?.image_urls,
        updated_is_found: fetchedPost?.is_found,
      });
    }
  }, [setValue, fetchedPost, reset, isFetchedData]);
  // Submit the new from to update post
  const { mutateAsync: updatePost, isPending: isUpdating } = useMutation({
    // useMutation에서는 외부에서 직접적으로 데이터를 받아와서 사용해줘야함
    // 실제 function 자체를 의미함
    mutationFn: async (data: UpdatePostValues) => {
      console.log(data);
      const result = await axiosInstance.put<ResponseDTO>(
        `posts/${postId}`,
        data
      );
      if (!result.data.success) {
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
  if (isFetchPostLoading || !fetchedPost) {
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
      {/* Check final values before submitting forms */}
      <form
        className="flex flex-col items-start w-screen  gap-y-4"
        onSubmit={handleSubmit((data: UpdatePostValues) => {
          console.log("Form clicked!");
          updatePost(data);
        })}
      >
        {/* Image Preview */}
        <div
          className={`w-[100%] mx-auto h-20 mt-10 max-w-[600px]  flex flex-col justify-between`}
        >
          <p>Edit post</p>
          {/* Image Uploader images */}

          <div className="flex gap-x-2 rounded-x  items-center justify-between">
            <div className="flex gap-x-2">
              {image_urls?.map((url: string) => (
                <div className="size-10">
                  <img src={url} alt="image" className="size-10 rounded-sm" />
                </div>
              ))}
            </div>
            <label className="flex flex-col items-center">
              <input
                type="checkbox"
                className="checkbox"
                {...register("updated_is_found")}
                defaultChecked={is_found}
              />
              <span className="font-content text-sm">I found my cat</span>
            </label>
          </div>
          {errors.updated_image_urls?.message}
        </div>
        {/* Title */}
        <PostInput
          title="Title"
          hintText={title}
          numberOfLetters={20}
          register={register("updated_title")}
          errorMessage={errors.updated_title?.message}
          value={title}
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
                  {...register("updated_content", {
                    onChange: (e) => setDescription(e.target.value),
                  })}
                  value={description}
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
                  <p className="text-warning">
                    {errors.updated_content?.message}{" "}
                  </p>
                  <p className="text-hintText">
                    {description.length}/{300}
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
          register={register("updated_reward_amount")}
          errorMessage={errors.updated_reward_amount?.message}
          value={reward_amount}
        />
        {/* Location */}
        <PostInput
          title="Location"
          hintText={location}
          numberOfLetters={10}
          register={register("updated_location")}
          errorMessage={errors.updated_location?.message}
          value={location}
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
