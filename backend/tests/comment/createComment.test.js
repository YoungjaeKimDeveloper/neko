"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const tester_id_1 = require("../_config/tester.id");
const comment_controller_1 = require("../../features/comment/application/controller/comment.controller");
/*

    Create comment test
    1. Happy path - 1
        - create new comment
    2. Sad path
        - nothing to create
        - unAuthorized

*/
describe("create comment test", () => {
    // Happy path - 1
    test("create comment test", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                content: "update test",
            },
        });
        // Mock verify Token
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        request.params.postId = tester_id_1.TEST_POST.id;
        const response = node_mocks_http_1.default.createResponse();
        await (0, comment_controller_1.createComment)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(201);
    });
    // Sad path(1) - missing content
    test("create comment test", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
        });
        // Mock verify Token
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        request.params.postId = tester_id_1.TEST_POST.id;
        const response = node_mocks_http_1.default.createResponse();
        await (0, comment_controller_1.createComment)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(400);
    });
    // Sad path(1) - missing content
    test("create comment test", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
        });
        // Mock verify Token
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        request.params.postId = tester_id_1.TEST_POST.id;
        const response = node_mocks_http_1.default.createResponse();
        await (0, comment_controller_1.createComment)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(400);
    });
    // Sad path(2) - Unauthorized
    test("create comment test", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                content: "update test",
            },
        });
        // Mock verify Token
        request.params.postId = tester_id_1.TEST_POST.id;
        const response = node_mocks_http_1.default.createResponse();
        await (0, comment_controller_1.createComment)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(401);
    });
});
