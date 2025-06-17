import { Response } from "express";

export interface ResponseInterface {
  res: Response;
  success: boolean;
  status: number;
  message: string;
  data?: any;
}
