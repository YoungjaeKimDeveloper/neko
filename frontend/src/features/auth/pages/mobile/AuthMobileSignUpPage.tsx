import logo from "../../../../../public/neko_logo.png";
import InputPassword from "../../components/AuthInputPassword";
import InputText from "../../components/AuthInputText";
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/AuthFooter";
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
            <p>We're glad you're here.</p>
          </div>
          <img src={logo} alt="logo_image" className="size-20" />
          {/* Login input */}
          <div className="w-full">
            {/* email */}
            <InputText />
            <InputText />
            {/* Password */}
            <InputPassword hintText="Password" />
            <InputPassword hintText="Confirm Password" />
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
