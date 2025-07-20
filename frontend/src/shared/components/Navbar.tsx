/*
    Common Navbar
*/
// Todo Auth User Unauth User 구별해서 Navbar Icon보여주기
import { Link } from "react-router-dom";
// Icons
import { Home, LogIn } from "lucide-react";
const Navbar = () => {
  // BUILD UI
  return (
    // Size
    <div className="w-screen shadow-lg h-[75px] ">
      {/* Layout */}
      <div className="flex justify-between items-center ">
        {/* Left Logo + Neko */}
        <Link to={"/"}>
          <div className="flex items-center">
            <img src="/neko_logo.png" alt="logo_img" className="h-20" />
            <h3 className="font-title text-primary text-2xl">Neko</h3>
          </div>
        </Link>

        {/* Right Home + Login */}
        <div className="flex gap-2 pr-10">
          <Link to={"/"}>
            <Home className="text-gray-400 font-bold hover:text-black duration-300" />
          </Link>
          <Link to={"/login"}>
            <LogIn className="text-gray-400 font-bold hover:text-black duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
