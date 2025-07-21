"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const auth_controller_1 = require("../../features/auth/application/controller/auth.controller");
/*
    Test issueToken
    Sad path - 2 (missing email, mismatching password)
    Happy path - 1
*/
describe("issueToken", () => {
    // sad path -1
    test("reutrn 400 missing email", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                password: "123123",
            },
        });
        const response = node_mocks_http_1.default.createResponse();
        await (0, auth_controller_1.issueAuthToken)(request, response);
        expect(response.statusCode).toBe(400);
    });
    // sad path -2
    test("reutrn 401 mismatch password", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                email: "tester12345@gmail.com",
                password: "12312",
            },
        });
        const response = node_mocks_http_1.default.createResponse();
        await (0, auth_controller_1.issueAuthToken)(request, response);
        expect(response.statusCode).toBe(401);
    });
    // happy path -1
    test("return 200 issue new token", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                email: "tester12345@gmail.com",
                password: "123123",
            },
        });
        const response = node_mocks_http_1.default.createResponse();
        await (0, auth_controller_1.issueAuthToken)(request, response);
        expect(response.statusCode).toBe(200);
    });
});
