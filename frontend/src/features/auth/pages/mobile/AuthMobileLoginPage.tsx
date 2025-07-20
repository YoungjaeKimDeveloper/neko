import InputPassword from "../../components/common/AuthInputPassword";
import InputText from "../../components/common/AuthInputText";
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/common/AuthFooter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import loginAPI from "../../services/auth.login.service";
import type { LoginDTO } from "../../../../../../shared/dto/auth/auth.request.dto";
import toast from "react-hot-toast";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authLoginSchema,
  type AuthLoginFormValues,
} from "../../schema/auth.login.schema";

/*

  Login page for new user

*/
const AuthMobileLoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authLoginSchema),
  });
  // Call Login API
  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userData: LoginDTO) => loginAPI(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      await navigate("/home");
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError("root", {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (error as any).response.data.message,
        });
        toast.error("Something went wrong");
      }
    },
  });

  // Submit login form

  const onSubmit: SubmitHandler<AuthLoginFormValues> = (data) =>
    loginMutation(data);

  // BUILD UI
  return (
    // Outer Container
    <div className="px-10 mb-10 pt-10 md:pt-20 lg:hidden flex h-screen w-full">
      {/* Inner Container */}
      <div className="w-[90%] md:w-[60%] shadow-md  mx-auto rounded-xl border-gray-200  md:h-fit border  h-fit">
        {/* Main Content */}
        <div
          className=" flex flex-col items-center h-fit 
        
        rounded-xl"
        >
          {/* Welcome Message */}
          <div className="flex flex-col items-center py-2">
            <p>Welcome back!</p>
            <p>We've missed you.</p>
          </div>
          <img src="/neko_logo.png" alt="logo_image" className="size-20" />
          {/* Login form */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <InputText
              register={register("email")}
              Icon={User}
              hintText="neko@gmail.com"
              errorMessage={errors?.email?.message}
            />
            {/* Password */}
            <InputPassword
              Icon={Lock}
              hintText="Password"
              register={register("password")}
              errorMessage={errors.password?.message}
            />

            {/* Login button */}
            <div
              className={`w-[80%] mx-auto mt-3 ${
                isLoading && "cursor-not-allowed"
              }`}
            >
              <MainButton
                text="Login"
                type="submit"
                isLoading={isLoading || isSubmitting}
              />
              {errors.root?.message && (
                <p className="text-warning text-sm text-center py-2">
                  {errors.root?.message}
                </p>
              )}
            </div>
          </form>
          {/* Sigm up message */}
          <div className="md:mt-10 py-4">
            <AuthFooter
              description="Already have an account with Neko?."
              text="Sign up"
              path="signup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthMobileLoginPage;
