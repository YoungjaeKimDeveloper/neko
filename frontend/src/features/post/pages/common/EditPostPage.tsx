/*

    Edit post page - Responsive Size - (Mobile + Desktop)
    Features
    - 1. Fetch Existed Post image
    - 2. User can Update
    Validation
    1. Zod + RHF
    
*/

import { useForm, type SubmitHandler } from "react-hook-form";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../../../shared/pages/common/LoadingPage";
// Schema - Runtime

// Component
const EditPostPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();

  // Fetch existed Data - UseQuery - Action
  const {
    data: fetchedPost,
    isError: isFetchingPostError,
    error: fetchingPostError,
    isLoading: isFetchPostLoading,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const result = await axiosInstance.get<ResponseDTO>(`/posts/${postId}`);
      if (result.data.success !== true) {
        throw new Error("Failed to fetch single Post with postId");
      }
      return result.data.data;
    },
  });
  //   Fetching error
  if (isFetchingPostError) {
    errorLogV2({
      error: fetchingPostError,
      function: "Fetch existed post",
      file: "EditPostPage.tsx",
    });
  }
  console.log("Fetched Post Successfully ", fetchedPost);

  // React hook-form (RHF)
  const {
    register,
    handleSubmit,
    // Catch the check the error manually
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
  // Track the number of description
  const [description, setdescription] = useState<number>(0);

  // Image Tracker[S] -------------
  // Todo - Double check
  // As image uploder is external libary,it is impossible to track using input,
  // So, track the value, manually.
  useEffect(() => {
    register("image_urls");
  }, [register]);
  // Add "images" to register
  register("image_urls");
  //   Save images in array
  const [images, setImages] = useState<ImageListType>([]);
  // onChange method
  const onChange = (imageList: ImageListType) => {
    // UI for user
    setImages(imageList);
    // Track the image value manually
    // images[key] : value[imageList.map((img)=>img.file)]
    setValue(
      "image_urls",
      imageList.map((img) => img.data_url),
      { shouldValidate: true } // base64
    );
  };
  // Image Tracker[E] ------------------
  const onSubmit: SubmitHandler<PostFormValues> = async (
    data: PostFormValues
  ) => {
    try {
      const result = await axiosInstance.post<ResponseDTO>("/posts", data);
      if (result.status !== RESPONSE_HTTP.CREATED) {
        toast.error(`Failed to create new post ${result.data?.message}`);
      }
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await navigate("/home");
      // Tood -Invalidate queirs
      toast.success("Post created✅");
    } catch (error) {
      errorLogV2({
        file: "EditPostPage",
        function: "onSutmib",
        error: error,
      });
      toast.error("Failed to post");
      return;
    }
  };
  //   Loading UI
  if (isFetchPostLoading) {
    return <LoadingPage />;
  }
  const { title, content, is_found, image_urls, location, reward_amount } =
    fetchedPost;
  // BUILD UI
  return (
    <div className="flex pb-20">
      {/* Left Sidebar */}
      <AuthDesktopSidebar />
      {/* Right - main */}
      <form
        className="flex flex-col items-start w-screen  gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Image Preview */}
        <div
          className={`w-[100%] mx-auto h-20 mt-10 max-w-[600px]  flex flex-col justify-between`}
        >
          <p>Create post</p>
          {/* Image Uploader images */}
          <ImageUploader images={images} onChange={onChange} />
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
                  {...register("content")}
                  maxLength={300}
                  placeholder={content}
                  className={
                    "input shadow-postInput w-full  mt-3 font-content pl-[10px] h-full py-2 resize-none"
                  }
                  onChange={(e) => setdescription(e.target.value.length)}
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
        {isSubmitting ? (
          <MainButton
            text="Loading..."
            type="submit"
            style="w-[40%] mt-5"
            isLoading={isSubmitting}
          />
        ) : (
          <MainButton
            text="Edit"
            type="submit"
            style="w-[40%] mt-5"
            isLoading={isSubmitting}
          />
        )}
      </form>
    </div>
  );
};

export default EditPostPage;
