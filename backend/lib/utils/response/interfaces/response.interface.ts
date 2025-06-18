// OCP(Open-Close Principle)
import { Response } from "express";

// Version - 1
export interface ResponseInterface {
  res: Response;
  success: boolean;
  status: number;
  message: string;
  data?: any;
  details?: string;
}

// Version - 2
export interface ResponseInterfaceV2 {
  res: Response;
  success: boolean;
  status: number;
  message: string;
  details?: string;
  data?: any;
}
