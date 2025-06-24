import type { ResponseDTO } from "./../../../../../../shared/dto/common/response.dto";
import { RESPONSE_HTTP } from "./../../../../../../shared/constants/http-status";
/*

    Auth Login Service

*/

import type { LoginDTO } from "../../../../../../shared/dto/auth/auth.request.dto";
import { axiosInstance } from "../../../../shared/api/axios";
import toast from "react-hot-toast";

const loginAPI = async (loginDto: LoginDTO) => {
  try {
    // Send Request <--> Send Response
    const result = await axiosInstance.post<ResponseDTO>(
      "/auth/auth-tokens",
      loginDto
    );
    // Failed to login
    if (result.status !== RESPONSE_HTTP.OK || result.data.success !== true) {
      return null;
    }
    // Succeed in login
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to login", error.message);
      toast.error(`Failed to login : ${error.message}`);
    }
  }
  return null;
};

export default loginAPI;
