import { ResponseInterface } from "../interfaces/response.interface";

export const sendResponse = (params: ResponseInterface) => {
  return params.res.status(params.status).json({
    success: params.success,
    message: params.message,
    data: params.data ?? null,
  });
};
