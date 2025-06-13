/*

COMMON RESPONSE DTO CROSS THE FILE

*/

import User from "../../features/auth/domain/entities/user";

export interface ResponseDTO {
  status?: any;
  success: boolean;
  message: string;
  data?: any;
  user?: User;
}
