/*

COMMON RESPONSE DTO CROSS THE FILE

*/

import User from "../../features/auth/domain/entities/user";
import { Response } from "express";
export interface ResponseDTO {
  res?: Response;
  status?: any;
  success: boolean;
  message: string;
  data?: any;
  user?: User;
}
