import { useState } from "react";

import InputPassword from "../../components/AuthInputPassword";
import InputText from "../../components/AuthInputText";
import MainButton from "../../../../shared/components/MainButton";
import AuthFooter from "../../components/AuthFooter";
import { authLoginSchema } from "../../schema/auth.login.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import loginAPI from "../../services/auth/auth.login.service";
import type { LoginDTO } from "../../../../../../shared/dto/auth/auth.request.dto";
import toast from "react-hot-toast";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

/*

  Login page for new user

*/
const AuthMobileLoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Call Login API
  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userData: LoginDTO) => loginAPI(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      await navigate("/home");
      toast.success("Hello user");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error("Something went wrong");
      }
    },
  });
  // Track the values
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Submit login form
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Button Clicked");
    const result = authLoginSchema.safeParse({ email, password });
    if (!result.success) {
      console.error(result.error.format()); // foramt --> show details
      return;
    }
    loginMutation({ email, password });
    // const validData = result.data;
  };

  // BUILD UI
  return (
    // Outer Container
    <div className="px-10 mb-10 pt-10">
      {/* Inner Container */}
      <div className="w-[300px] shadow-lg  h-[500px] mx-auto rounded-xl">
        {/* Main Content */}
        <div className=" flex flex-col items-center justify-center  h-full rounded-xl">
          {/* Welcome Message */}
          <div className="flex flex-col items-center">
            <p>Welcome back!</p>
            <p>We've missed you.</p>
          </div>
          <img src="/neko_logo.png" alt="logo_image" className="size-20" />
          {/* Login form */}
          <form className="w-full" onSubmit={handleLogin}>
            {/* email */}
            <InputText
              Icon={User}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password */}
            <InputPassword
              Icon={Lock}
              hintText="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Login button */}
            <div
              className={`w-[80%] mx-auto mt-3 ${
                isLoading && "cursor-not-allowed"
              }`}
            >
              <MainButton text="Login" type="submit" isLoading={isLoading} />
            </div>
          </form>
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
