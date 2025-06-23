import logo from "../../../../../public/neko_logo.png";
import InputPassword from "../../components/AuthInputPassword";
import InputText from "../../components/AuthInputText";
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/AuthFooter";
/*

  Login page for new user

*/
const AuthMobileLoginPage = () => {
  // BUILD UI
  return (
    // Outer Container
    <div className="px-10 mb-10 pt-10">
      {/* Inner Container */}
      <div className="w-[300px] shadow-sm bg-amber-50 h-[500px] mx-auto rounded-xl">
        {/* Main Content */}
        <div className=" flex flex-col items-center justify-center bg-red-50 h-full rounded-xl">
          {/* Welcome Message */}
          <div className="flex flex-col items-center">
            <p>Welcome to the Neko family</p>
            <p>We're glad you're here.</p>
          </div>
          <img src={logo} alt="logo_image" className="size-20" />
          {/* Login input */}
          <div className="w-full">
            {/* email */}
            <InputText />
            {/* Password */}
            <InputPassword hintText="Password" />
            {/* Login button */}
            <div className="w-[80%] mx-auto mt-3">
              <MainButton text="Login" />
            </div>
          </div>
          {/* Sigm up message */}
          <AuthFooter
            description="Already have an account with Neko?."
            text="Sign up"
            path="signup"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthMobileLoginPage;
