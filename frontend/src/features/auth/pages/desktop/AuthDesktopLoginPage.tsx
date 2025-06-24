/*

    Auth Desktop Login Page

*/
// Components
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/AuthFooter";
import AuthInputPassword from "../../components/AuthInputPassword";
import AuthInputText from "../../components/AuthInputText";
// Assets
import logoImg from "../../../../../public/neko_logo.png";
import bannerImg from "../../../../../public/authSideBanner.jpg";
// Icons
import { Lock, User } from "lucide-react";
const AuthDesktopLoginPage = () => {
  // Build Ui
  return (
    <div className="px-10">
      <div className="w-[100%] bg-gray-50-50 h-[700px] rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full rounded-lg">
          {/* Left - Login Input */}
          <div className="col-span-1 w-full h-full flex flex-col items-center pt-20 rounded-l-lg">
            {/* Left - Welcome Message */}
            <div className="flex flex-col items-center">
              <p>Welcome back!</p>
              <p>We've missed you.</p>
            </div>
            {/* Left- Logo */}
            <img src={logoImg} alt="neko_logo" className="size-40" />
            {/* Input */}
            <div className="w-[75%]">
              <AuthInputText Icon={User} />
              <AuthInputPassword hintText="Password" Icon={Lock} />
            </div>
            <div className="w-[30%] mx-auto mt-5">
              <MainButton text="Login" />
            </div>
            <div className="mt-5">
              <AuthFooter
                description="Start helping and getting help."
                text="Sign up"
                path="signup"
              />
            </div>
          </div>
          {/* Right - Image + Description */}
          <div className="col-span-1 w-full h-full  hidden lg:block  lg:relative">
            <img
              src={bannerImg}
              alt="banner_img"
              className="w-full h-full object-cover opacity-50 rounded-r-lg"
            />
            {/* Description */}
            <div className="flex flex-col gap-10 items-center absolute top-[25%] left-[25%] font-banner text-2xl">
              <p>Because of your small effort</p>
              <p>Today feels like spring.</p>
              <p>Your quiet attention makes</p>
              <p>the world a kinder place.</p>
              <p>Kindness isn’t free — but it’s priceless.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDesktopLoginPage;
