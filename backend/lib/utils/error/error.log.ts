/*
    ERROR MESSAGE AND ERROR STACK
*/

import { error } from "console";

interface ErrorDTO {
  file?: string;
  location: string;
  error: any;
}

interface ErrorDTO_V2 {
  file?: string;
  function: string;
  error: any;
}
// Version - 1
export const errorLog = (parameters: ErrorDTO) => {
  console.error("ERROR IN:", parameters.file);
  console.error(
    ` ‼❌MESSAGE: ERROR IN ${parameters.location}: ${parameters.error}`
  );
  console.error(
    ` ‼❌MESSAGE: ERROR IN ${parameters.location}: ${parameters.error.stack}`
  );
};
// Version -2
export const errorLogV2 = (parameters: ErrorDTO_V2) => {
  console.error("Error in file: ", parameters.file);
  console.error("Error in function: ", parameters.function);
  console.error(
    `Error details:", ${console.error(parameters.error.stack) ?? ""}`
  );
};
