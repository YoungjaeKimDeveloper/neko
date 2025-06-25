/*

    Auth Desktop Login Page

*/
// External
import toast from "react-hot-toast";
import { useState } from "react";
// Components
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/AuthFooter";
import AuthInputPassword from "../../components/AuthInputPassword";
import AuthInputText from "../../components/AuthInputText";
// Assets
import logoImg from "../../../../../public/neko_logo.png";
import bannerImg from "../../../../../public/authSideBanner.jpg";
import { User, UserRoundPen, Lock, LockKeyhole } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import signupAPI from "../../services/auth/auth.signup.service";
import type { SignUpDTO } from "../../../../../../shared/dto/auth/auth.request.dto";
import { authSignupSchema } from "../../schema/auth.signup.schema";
import type { AuthSignup } from "../../schema/auth.signup.schema";

const AuthDesktopSignUpPage = () => {
  // useMutation
  // Refact - Separate the file UI and Logic

  // Refact - Try to use react form
  // Track Values
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // show error message if user failes to pass schema - Object
  const [formattedErros, setFormattedErros] = useState<
    Partial<Record<keyof AuthSignup, string>>
  >({});
  // Send to  API
  const { mutate: signupMutation, isLoading } = useMutation({
    mutationFn: (userData: SignUpDTO) => signupAPI(userData),
    onSuccess: () => {
      toast.success("User signup");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Failed to signup", error?.message);
      }
      toast.error("Failed to signup");
    },
  });
  // Submit to API
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset forms
    setFormattedErros({});
    // Verify fileds with schema
    const result = authSignupSchema.safeParse({
      email,
      userName,
      password,
      confirmPassword,
    });
    // Failed to pass schema
    if (!result.success) {
      // Show error message in arrange
      const formattedError = result.error.format();
      // Partial enalbes this logic!
      setFormattedErros({
        email: formattedError.email?._errors[0],
        userName: formattedError.userName?._errors[0],
        password: formattedError.password?._errors[0],
        confirmPassword: formattedError.confirmPassword?._errors[0],
      });
      return;
    }
    signupMutation({ email, password, userName });
  };

  // Build Ui
  return (
    <div className="px-10">
      <div className="w-[100%] bg-gray-50-50 h-[700px] rounded-lg shadozodw-lg  shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full rounded-lg">
          {/* Left - Image + Description */}
          <div className="col-span-1 w-full h-full  hidden lg:block  lg:relative">
            <img
              src={bannerImg}
              alt="banner_img"
              className="w-full h-full object-cover opacity-50 rounded-l-lg"
            />
            {/* Description */}
            <div className="flex flex-col gap-10 items-center absolute top-[25%] left-[25%] font-banner text-2xl">
              <p>Because of your small effort</p>
              <p>Today feels like spring.</p>
              <p>Your quiet attention makes</p>
              <p>the world a kinder place.</p>
              <p>Kindness isn’t free — but it’s priceles.</p>
            </div>
          </div>
          {/* Right - Login Input */}
          <div className="col-span-1 w-full h-full flex flex-col items-center pt-10 rounded-l-lg">
            {/*  Welcome Message */}
            <div className="flex flex-col items-center">
              <p>Welcome to the Neko family</p>
              <p>we're glad you're here</p>
            </div>
            {/* Right- Logo */}
            <img src={logoImg} alt="neko_logo" className="size-20" />
            {/* Input */}
            <form className="w-[75%]" onSubmit={handleSignup}>
              <AuthInputText
                Icon={User}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={formattedErros?.email}
              />
              <AuthInputText
                Icon={UserRoundPen}
                hintText="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                errorMessage={formattedErros?.userName}
              />
              <AuthInputPassword
                hintText="Password"
                Icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={formattedErros?.password}
              />
              <AuthInputPassword
                hintText="Confirm Password"
                Icon={LockKeyhole}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                errorMessage={formattedErros?.confirmPassword}
              />
              <div className="w-[50%] mx-auto mt-5">
                <MainButton
                  text="Sign up"
                  type="submit"
                  isLoading={isLoading}
                />
              </div>
            </form>

            <div className="mt-5">
              <AuthFooter
                description="Already have an account with Neko?"
                text="Login"
                path="login"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDesktopSignUpPage;
