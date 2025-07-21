"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseV2 = exports.sendResponse = void 0;
// Version - 1
const sendResponse = (params) => {
    return params.res.status(params.status).json({
        success: params.success,
        message: `${params.message}`,
        data: params.data ?? null,
    });
};
exports.sendResponse = sendResponse;
// Version - 2
// export const sendResponseV2 = (params: ResponseInterfaceV2) => {
//   return params.res.status(params.status).json({
//     success: params.success,
//     message: `${params.message}`,
//     details: `${params.details}`,
//     data: params.data ?? null,
//   });
// };
// Version - 3
const sendResponseV2 = (params) => {
    return params.res.status(params.status).json({
        success: params.success,
        message: params.message,
        details: params.details,
        data: params.data ?? null,
    });
};
exports.sendResponseV2 = sendResponseV2;
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
