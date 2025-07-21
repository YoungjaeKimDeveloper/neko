"use strict";
/*
    ERROR MESSAGE AND ERROR STACK
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogV2 = exports.errorLog = void 0;
// Version - 1
const errorLog = (parameters) => {
    console.error("ERROR IN:", parameters.file);
    console.error(` ‼❌MESSAGE: ERROR IN ${parameters.location}: ${parameters.error}`);
    console.error(` ‼❌MESSAGE: ERROR IN ${parameters.location}: ${parameters.error.stack}`);
};
exports.errorLog = errorLog;
// Version -2
const errorLogV2 = (parameters) => {
    console.error("Error in file: ", parameters.file);
    console.error("Error in function: ", parameters.function);
    console.error(`Error details:", ${console.error(parameters.error.stack) ?? ""}`);
};
exports.errorLogV2 = errorLogV2;
