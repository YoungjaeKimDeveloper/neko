import InputPassword from "../../components/common/AuthInputPassword";
import InputText from "../../components/common/AuthInputText";
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/common/AuthFooter";
import { User, Lock, LockKeyhole } from "lucide-react";
import { UserRoundPen } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SignUpDTO } from "../../../../../../shared/dto/auth/auth.request.dto";

import {
  authSignupSchema,
  type AuthSignupFormValues,
} from "../../schema/auth.signup.schema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import signupAPI from "../../services/auth.signup.service";

// Component
const AuthMobileSignUpPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthSignupFormValues>({
    resolver: zodResolver(authSignupSchema),
  });
  // Call API
  const { mutateAsync: signUpMutation } = useMutation({
    mutationFn: (userData: SignUpDTO) => signupAPI(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      await navigate("/home");
      toast.success("Hello user");
    },
    onError: async (error) => {
      console.log("에러가 여기 있습나다", error);
      setError("root", {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (error as any).response.data.message || "Something went wrong",
      });
    },
  });

  const onSubmit: SubmitHandler<AuthSignupFormValues> = (data) =>
    signUpMutation(data);
  // BUILD UI
  return (
    // Outer Container
    <div className="px-10 mb-10 mt-20">
      {/* Inner Container */}
      <div className="w-[80%] h-fit  bg-grayr-50  mx-auto rounded-xl shadow-lg">
        {/* Main Content */}
        <div className=" flex flex-col items-center justify-center bg-grey-50 h-full rounded-xl">
          {/* Welcome Message */}
          <div className="flex flex-col items-center">
            <p>Welcome to the Neko family</p>
            <p>we're glad you're here</p>
          </div>
          <img src="/neko_logo.png" alt="logo_image" className="size-20" />
          {/* Login input */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <InputText
              Icon={User}
              hintText="newUser@gmail.com"
              register={register("email")}
              errorMessage={errors?.email?.message}
            />
            <InputText
              Icon={UserRoundPen}
              hintText="Username"
              register={register("userName")}
              errorMessage={errors.userName?.message}
            />
            {/* Password */}
            <InputPassword
              hintText="Password"
              Icon={Lock}
              register={register("password")}
              errorMessage={errors.password?.message}
            />
            <InputPassword
              hintText="Confirm Password"
              Icon={LockKeyhole}
              register={register("confirmPassword")}
              errorMessage={errors.confirmPassword?.message}
            />
            <p className="text-center text-red-500 py-5">
              {errors.root && errors.root.message}
            </p>
            {/* Login button */}
            <div className="w-[80%] mx-auto mt-3">
              <MainButton text="Signup" type="submit" />
            </div>
          </form>
          {/* Sigm up message */}
          <div className="py-4">
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
