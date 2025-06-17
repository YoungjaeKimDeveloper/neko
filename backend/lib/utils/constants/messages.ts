/*

    enum-like Response Messages

*/

export const RESPONSE_MESSAGES = {
  CREATE: "Data created:",
  UPDATE: "Data updated successfully",
  DELETE: "Data deleted successfully",
  SUCCESS: "Request completed successfully:",
  BAD_REQUEST: "Bad request:",
  UNAUTHORIZED: "Unauthorized:",
  NOT_FOUND: "Not found:",
  INTERNAL: "Server error:",
};

// sendResponse({
//     res: res,
//     status: RESPONSE_HTTP.OK,
//     success: true,
//     message: `${RESPONSE_MESSAGES.SUCCESS} token deleted`,
//   });
