/*
    Common Navbar
*/
// Todo Auth User Unauth User 구별해서 Navbar Icon보여주기
import { Link } from "react-router-dom";

// Icons
import { Bell, LogOut, User } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../shared/api/axios";
import toast from "react-hot-toast";
import CommonLinkIcon from "../../../../shared/components/CommonLinkIcon";
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
    <div className="w-screen shadow-sm h-[75px]  ">
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
        <div className="flex gap-2 pr-5  items-center">
          <CommonLinkIcon link="/home" size={30} icon={User} />
          <CommonLinkIcon link="/notification" size={30} icon={Bell} />
          <button onClick={() => logout()}>
            <LogOut
              size={30}
              className="text-icon hover:text-hovered_icon duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
