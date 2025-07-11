/*

    Individual News card component

*/

import { format } from "date-fns";
interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  publishedAt: Date;
  url: string;
}

const NewsCard = ({
  title,
  description,
  image,
  publishedAt,
  url,
}: NewsCardProps) => {
  const formateedData = format(new Date(publishedAt), "dd-MM-yyyy");
  //BUILD UI
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-full"
    >
      <div className="card w-[275px] h-fit shadow-md bg-gray-50 flex flex-col mx-auto ">
        <img
          src={
            image ??
            "https://cdn.pixabay.com/photo/2020/10/05/10/51/cat-5628953_1280.jpg"
          }
          alt="cat_img"
          className="w-full aspect-square object-center rounded-t-lg"
        />

        {/* Bottom Details */}
        <div className="px-2 py-2 flex flex-col items-center h-[210px]">
          {/* top */}
          <div className="flex flex-col  items-start w-full">
            <p className="text-xl line-clamp-1">{title}</p>
            <p className="text-sm w-[200px]">
              <span className="text-[12px] text-gray-500">{formateedData}</span>
            </p>
          </div>
          {/* Icons + price */}

          <div className="overflow-hidden w-full h-full flex flex-col justify-between">
            <p className=" overflow-hidden w-full line-clamp-4 text-sm pt-2 text-gray-500">
              {description}
            </p>
            <button className="bg-gray-200 py-1 hover:bg-gray-300 duration-300 font-content rounded-sm">
              View
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
