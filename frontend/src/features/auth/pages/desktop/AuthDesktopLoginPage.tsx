/*

    Auth Desktop Login Page

*/
// Components
import { useForm, type SubmitHandler } from "react-hook-form";
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/common/AuthFooter";
import InputPassword from "../../components/common/AuthInputPassword";
import Inputtext from "../../components/common/AuthInputText";
// Assets

// Icons
import { Lock, User } from "lucide-react";
import {
  authLoginSchema,
  type AuthLoginFormValues,
} from "../../schema/auth.login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginDTO } from "../../../../../../shared/dto/auth/auth.request.dto";

import { useNavigate } from "react-router-dom";

import loginAPI from "../../services/auth.login.service";
// Component
const AuthDesktopLoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    // Generic for developer
  } = useForm<AuthLoginFormValues>({
    // Resolver for catching error during Runtime
    resolver: zodResolver(authLoginSchema),
  });
  // Call API
  const { mutateAsync: login } = useMutation({
    mutationFn: async (userData: LoginDTO) => loginAPI(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      await navigate("/home");
    },
    onError: async (error) => {
      if (error instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError("root", { message: (error as any).response.data.message });
      }
    },
  });
  const onSubmit: SubmitHandler<AuthLoginFormValues> = (data) => login(data);
  // Build Ui
  return (
    <div className="w-full h-fit flex items-center justify-center pb-10">
      <div className="px-10 hidden lg:block mt-10 ">
        <div className="w-[100%] bg-gray-50-50 h-[700px] rounded-lg border border-gray-300 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full rounded-lg">
            {/* Left - Login Input */}
            <div className="col-span-1 w-full h-full flex flex-col items-center pt-20 rounded-l-lg">
              {/* Left - Welcome Message */}
              <div className="flex flex-col items-center text-xl">
                <p>Welcome back!</p>
                <p>We've missed you.</p>
              </div>
              {/* Left- Logo */}
              <img src="/neko_logo.png" alt="neko_logo" className="size-40" />
              {/* Input */}
              <form className="w-[75%]" onSubmit={handleSubmit(onSubmit)}>
                <Inputtext
                  Icon={User}
                  register={register("email")}
                  hintText="neko@gmail.com"
                  errorMessage={errors.email?.message}
                />
                <InputPassword
                  hintText="Password"
                  Icon={Lock}
                  register={register("password")}
                  errorMessage={errors.password?.message}
                />
                <div className="w-[40%] mx-auto mt-5">
                  <MainButton
                    text="Login"
                    isLoading={isSubmitting}
                    type="submit"
                  />
                  {errors.root && (
                    <p className="text-center text-sm text-red-500 mt-5 ">
                      {errors.root.message}
                    </p>
                  )}
                </div>
              </form>

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
                src="/authSideBanner.jpg"
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
    </div>
  );
};

export default AuthDesktopLoginPage;
