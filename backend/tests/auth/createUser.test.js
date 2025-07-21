"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const auth_controller_1 = require("../../features/auth/application/controller/auth.controller");
/*
  createUser function test
  Sad paht - 1
  Happy path -1
*/
describe("createUser test", () => {
    // sad path
    test("it returns 400 if missing email", async () => {
        let response;
        let request;
        request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                userName: "tester",
                password: "test1234",
            },
        });
        response = node_mocks_http_1.default.createResponse();
        await (0, auth_controller_1.createUser)(request, response);
        expect(response.statusCode).toBe(400);
    });
    // happy path
    test("create new user", async () => {
        let request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                email: "tester12345@gmail.com",
                password: "123123",
                userName: "tester",
            },
        });
        let response = node_mocks_http_1.default.createResponse();
        await (0, auth_controller_1.createUser)(request, response);
    });
});
