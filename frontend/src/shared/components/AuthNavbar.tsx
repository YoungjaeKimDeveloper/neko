/*
    Common Navbar
*/
// Todo Auth User Unauth User 구별해서 Navbar Icon보여주기
import { Link } from "react-router-dom";
import logoImg from "../../../public/neko_logo.png";
// Icons
import { Bell, Home, LogOut } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";
const AuthNavbar = () => {
  // Single-ton
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete("/auth/auth-tokens");
    },
    onSuccess: () => {
      toast.success("See you next time");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });
  // BUILD UI
  return (
    // Size
    <div className="w-screen shadow-lg h-[75px] mb-navBottom ">
      {/* Layout */}
      <div className="flex justify-between items-center ">
        {/* Left Logo + Neko */}

        <Link to={"/"}>
          <div className="flex items-center">
            <img src={logoImg} alt="logo_img" className="h-20" />
            <h3 className="font-title text-primary text-2xl">Neko</h3>
          </div>
        </Link>

        {/* Right Home + Login */}
        <div className="flex gap-2 pr-4">
          <Link to={"/"}>
            <Home />
          </Link>
          <Link to={"/notification"}>
            <Bell />
          </Link>
          <button onClick={() => logout()}>
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
