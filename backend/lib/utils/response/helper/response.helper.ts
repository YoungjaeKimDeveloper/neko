import {
  ResponseInterface,
  ResponseInterfaceV2,
} from "../interfaces/response.interface";

// Version - 1
export const sendResponse = (params: ResponseInterface) => {
  return params.res.status(params.status).json({
    success: params.success,
    message: `${params.message} : ${params.details}`,
    data: params.data ?? null,
  });
};

// Version - 2
export const sendResponseV2 = (params: ResponseInterfaceV2) => {
  return params.res.status(params.status).json({
    success: params.success,
    message: `${params.message} : ${params.details}`,
    details: `${params.details}`,
    data: params.data ?? null,
  });
};

// Templates

// Version - 1
// return sendResponse({
//         res: res,
//         status: RESPONSE_HTTP,
//         success: ,
//         message: `${RESPONSE_MESSAGES.}`,
//         data:
//       });

// Version - 2
// return sendResponseV2({
//         res: res,
//         status: RESPONSE_HTTP,
//         success: ,
//         details:
//         message: `${RESPONSE_MESSAGES.}`,
//         data:
//       });
