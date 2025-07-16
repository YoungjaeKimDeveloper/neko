/*
    Auth - Sign up
*/
import { RESPONSE_HTTP } from "../../../../../shared/constants/http-status";
import type { SignUpDTO } from "../../../../../shared/dto/auth/auth.request.dto";
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import { axiosInstance } from "../../../shared/api/axios";

const signupAPI = async (signupDTO: SignUpDTO) => {
  try {
    // ResponseDTO - Response Data format
    const result = await axiosInstance.post<ResponseDTO>(
      "/auth/users",
      signupDTO
    );
    if (
      result.status !== RESPONSE_HTTP.CREATED ||
      result.data.success !== true
    ) {
      throw new Error(result.data.message || "Failed to singup");
    }
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to Signup", error.message);
    }
    throw error;
  }
};

export default signupAPI;
