/*
    Auth Login Service
*/
import type { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import { RESPONSE_HTTP } from "../../../../../shared/constants/http-status";
import type { LoginDTO } from "../../../../../shared/dto/auth/auth.request.dto";
import { axiosInstance } from "../../../shared/api/axios";

const loginAPI = async (loginDto: LoginDTO) => {
  try {
    // Send Request <--> Send Response
    const result = await axiosInstance.post<ResponseDTO>(
      "/auth/auth-tokens",
      loginDto
    );
    if (result.status !== RESPONSE_HTTP.OK || result.data.success !== true) {
      throw new Error(result?.data?.message || "Please double-check ID and PW");
    }
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to login", error.message);
      throw error;
    }
  }
};

export default loginAPI;
