/*

    Auth Desktop Login Page

*/
// External
import toast from "react-hot-toast";
// Components
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/common/AuthFooter";
import AuthInputPassword from "../../components/common/AuthInputPassword";
import AuthInputText from "../../components/common/AuthInputText";
// Assets
import { User, UserRoundPen, Lock, LockKeyhole } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import signupAPI from "../../services/auth.signup.service";
import type { SignUpDTO } from "../../../../../../shared/dto/auth/auth.request.dto";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  authSignupSchema,
  type AuthSignupFormValues,
} from "../../schema/auth.signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";

// Component
const AuthDesktopSignUpPage = () => {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();
  // Send the data to API
  // SET UP FOR RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    // Apply type for useForm
  } = useForm<AuthSignupFormValues>({
    // Resolver - check the validation during "Runtime" and display message
    resolver: zodResolver(authSignupSchema),
  });

  const { mutateAsync: signupMutation, isLoading } = useMutation({
    mutationFn: (userData: SignUpDTO) => signupAPI(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });

      await toast.success("User signup");
      naviagte("/home");
    },
    onError: (error: unknown) => {
      setError("root", {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (error as any).response.data.message || "ID is existed",
      });
      if (error instanceof Error) {
        console.log("Failed to signup", error?.message);
      }
      toast.error("Failed to signup");
    },
  });
  // Submit to API
  // Complie type error
  const onSubmit: SubmitHandler<AuthSignupFormValues> = (data) =>
    signupMutation(data);
  // Build Ui
  return (
    <div className="px-10">
      <div className="w-[100%] bg-gray-50-50 h-[700px] rounded-lg shadozodw-lg  shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full rounded-lg">
          {/* Left - Image + Description */}
          <div className="col-span-1 w-full h-full  hidden lg:block  lg:relative">
            <img
              src="/authSideBanner.jpg"
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
            <img src="/neko_logo.png" alt="neko_logo" className="size-20" />
            {/* Input */}
            <form className="w-[75%]" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <AuthInputText
                Icon={User}
                hintText="newUser@gmail.com"
                register={register("email")}
                errorMessage={errors?.email?.message}
              />
              {/* Username */}
              <AuthInputText
                Icon={UserRoundPen}
                hintText="Username"
                register={register("userName")}
                errorMessage={errors.userName?.message}
              />
              {/* Password */}
              <AuthInputPassword
                Icon={Lock}
                hintText="Password"
                register={register("password")}
                errorMessage={errors.password?.message}
              />
              {/* ConfirmPassword */}
              <AuthInputPassword
                hintText="Confirm Password"
                Icon={LockKeyhole}
                register={register("confirmPassword")}
                errorMessage={errors.confirmPassword?.message}
              />
              {/* Show error message from back-end */}
              <p className="text-center text-red-500 py-4">
                {errors.root && errors.root.message}
              </p>
              <div className="w-[70%] max-w-[200px] mx-auto mt-5">
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
