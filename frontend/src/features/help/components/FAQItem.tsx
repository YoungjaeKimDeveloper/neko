/*

  FAQ Item

*/

import {
  Bell,
  ChevronUp,
  FlagTriangleRight,
  MapPinHouse,
  Pencil,
  Send,
  ShieldCheck,
  TabletSmartphone,
  UserRoundPen,
} from "lucide-react";
import { useState } from "react";

// Matching ICON text and Icon
const ICON_MAP = {
  report: FlagTriangleRight,
  edit: Pencil,
  send: Send,
  bell: Bell,
  safe: ShieldCheck,
  profile: UserRoundPen,
  mobile: TabletSmartphone,
  location: MapPinHouse,
} as const;
// Limited Options
// Extract the key of ICON_MAP -> create new type

export type ICONTYPE = keyof typeof ICON_MAP;

interface FAQItemProps {
  icon: ICONTYPE;
  question: string;
  answer: string;
}

// Component
const FAQItem = ({ icon, question, answer }: FAQItemProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggleFAQ = () => setIsOpened((prev) => !prev);
  // BUILD UI
  const IconComponent = ICON_MAP[icon as keyof typeof ICON_MAP];
  return (
    <div className="flex gap-x-4 w-[100%] items-center flex-col">
      <div className="flex w-full items-center gap-x-4">
        <div className="border border-gray-200 shadow-sm size-10 flex items-center justify-center rounded-xl   ">
          <IconComponent />
        </div>
        <div className="flex justify-between w-full">
          <h3 className="font-content text-sm md:text-xl">{question}</h3>
          <ChevronUp
            className={`${
              isOpened && "rotate-180"
            } duration-300 cursor-pointer`}
            onClick={() => toggleFAQ()}
          />
        </div>
      </div>
      <div className="flex justify-between w-full flex-col px-2 pt-4">
        {isOpened && (
          <p className=" text-sm font-help font-semibold text-gray-400">
            {answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQItem;
