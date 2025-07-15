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
import FAQLists from "../data/help.data.json";
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

// Component
const FAQItem = () => {
  // BUILD UI
  return (
    <>
      {FAQLists.map(({ icon, question, answer }, index) => {
        const IconComponent = ICON_MAP[icon as keyof typeof ICON_MAP];
        return (
          <div key={index} className="shadow-lg p-4 rounded-md">
            <div className="border border-gray-200 shadow-sm size-10 flex items-center justify-center rounded-xl  absolute -left-12 ">
              <IconComponent />
            </div>
            <div className="flex justify-between w-full flex-col ">
              <div className="flex justify-between w-full">
                <h3 className="font-content">{question}</h3>
                <ChevronUp />
              </div>
              <p className="font-sans inline-block">{answer}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FAQItem;
