/*
    Image Uploader
*/

import ImageUpLoading, { type ImageListType } from "react-images-uploading";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

// Interface - Capitalcase
interface ImageUploderProps {
  images: ImageListType;
  onChange: (imageList: ImageListType) => void;
}

// Component
// Accept [images and onChange ] from parents component
const ImageUploader = ({ images, onChange }: ImageUploderProps) => {
  return (
    <ImageUpLoading
      multiple
      acceptType={["jpg", "gif", "png", "jpeg", "webp"]}
      value={images}
      onChange={onChange}
      maxNumber={5}
      maxFileSize={5 * 1024 * 1024} //5mb
      dataURLKey="data_url" // image preview
      onError={(errors) => {
        if (errors?.maxNumber) {
          toast.error("You can upload up to 5 images.");
        }
        if (errors?.maxFileSize) {
          toast.error("File size is too large. Maximum allowed is 5MB");
        }
        if (errors?.acceptType) {
          toast.error("Please upload JPG,PNG,GIF or WEBP.");
        }
      }}
    >
      {/* Render Props */}
      {({ imageList, onImageUpload }) => (
        <div className="flex gap-x-2">
          {/* Add Icon */}
          {imageList.map((image, index) => (
            <div className="size-10 relative" key={index}>
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
                <Plus onClick={onImageUpload} className="cursor-pointer" />
              </div>
            </div>
          )}
        </div>
      )}
    </ImageUpLoading>
  );
};

export default ImageUploader;
