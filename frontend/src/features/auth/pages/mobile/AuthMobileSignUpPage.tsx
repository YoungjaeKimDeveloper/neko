import InputPassword from "../../components/AuthInputPassword";
import InputText from "../../components/AuthInputText";
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/AuthFooter";
import { User, Lock, LockKeyhole } from "lucide-react";
import { UserRoundPen } from "lucide-react";
const AuthMobileSignUpPage = () => {
  // BUILD UI
  return (
    // Outer Container
    <div className="px-10 mb-10 pt-10">
      {/* Inner Container */}
      <div className="w-[300px]  bg-grayr-50 h-[500px] mx-auto rounded-xl shadow-lg">
        {/* Main Content */}
        <div className=" flex flex-col items-center justify-center bg-grey-50 h-full rounded-xl">
          {/* Welcome Message */}
          <div className="flex flex-col items-center">
            <p>Welcome to the Neko family</p>
            <p>we're glad you're here</p>
          </div>
          <img src="/neko_logo.png" alt="logo_image" className="size-20" />
          {/* Login input */}
          <div className="w-full">
            {/* email */}
            <InputText Icon={User} />
            <InputText Icon={UserRoundPen} hintText="Username" />
            {/* Password */}
            <InputPassword hintText="Password" Icon={Lock} />
            <InputPassword hintText="Confirm Password" Icon={LockKeyhole} />
            {/* Login button */}
            <div className="w-[80%] mx-auto mt-3">
              <MainButton text="Signup" />
            </div>
          </div>
          {/* Sigm up message */}
          <div>
            <AuthFooter
              description="Start helping and getting help."
              text="Login"
              path="login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthMobileSignUpPage;
