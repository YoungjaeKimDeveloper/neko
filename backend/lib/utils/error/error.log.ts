/*
    ERROR MESSAGE AND ERROR STACK
*/

interface ErrorDTO {
  location: string;
  error: any;
}

export const errorLog = (parameters: ErrorDTO) => {
  console.error(
    ` ‼❌MESSAGE: ERROR IN ${parameters.location}: ${parameters.error}`
  );
  console.error(
    ` ‼❌MESSAGE: ERROR IN ${parameters.location}: ${parameters.error.stack}`
  );
};
