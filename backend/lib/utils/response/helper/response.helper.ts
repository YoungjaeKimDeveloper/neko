import { ResponseInterface } from "../interfaces/response.interface";

export const sendResponse = (params: ResponseInterface) => {
  return params.res.status(params.status).json({
    success: params.success,
    message: params.message,
    data: params.data ?? null,
  });
};

// How to use

// return sendResponse({
//         res: res,
//         status: RESPONSE_HTTP,
//         success: ,
//         message: `${RESPONSE_MESSAGES.} reason`,
//       });



