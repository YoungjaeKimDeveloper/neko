/*

COMMON RESPONSE DTO CROSS THE FILE

*/

import type User from "../../../backend/features/auth/domain/entities/user";
import type { Response } from "express";
export interface ResponseDTO {
  res?: Response;
  status?: any;
  success: boolean;
  message: string;
  data?: any;
  user?: User;
}
