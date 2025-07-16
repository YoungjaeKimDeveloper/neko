/*
    Image Uploader
*/

import ImageUpLoading, { type ImageListType } from "react-images-uploading";
import { Plus } from "lucide-react";

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
      value={images}
      onChange={onChange}
      maxNumber={5}
      dataURLKey="data_url" //base64
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
