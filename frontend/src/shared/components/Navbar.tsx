/*
    Common Navbar
*/
import logoImg from "../../../public/neko_logo.png";
// Icons
import { Home, LogIn } from "lucide-react";
const Navbar = () => {
  return (
    // Size
    <div className="w-screen shadow-lg h-[75px] mb-20 ">
      {/* Layout */}
      <div className="flex justify-between items-center ">
        {/* Left Logo + Neko */}
        <div className="flex items-center">
          <img src={logoImg} alt="logo_img" className="h-20" />
          <h3 className="font-title text-primary text-2xl">Neko</h3>
        </div>
        {/* Right Home + Login */}
        <div className="flex gap-2 pr-2">
          <Home />
          <LogIn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
