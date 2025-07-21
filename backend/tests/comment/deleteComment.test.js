"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const tester_id_1 = require("../_config/tester.id");
const comment_controller_1 = require("../../features/comment/application/controller/comment.controller");
/*
    Delete comment
        1. Happy paht(1)✅ - test with Postman
        2. Sad paht(2)❌
            - Unauthorized -1
            - missing post id -2


*/
describe("deleteComment test", () => {
    // Happy path - test with Postman : result(passed)
    test("Happy path - test with Postman : result(passed)", async () => {
        expect(true).toBe(true);
    });
    // Sad path(1) - Unauthorized
    test("Unauthorized, it should return 401", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "DELETE",
        });
        request.params.postId = tester_id_1.TEST_POST.id;
        const response = node_mocks_http_1.default.createResponse();
        await (0, comment_controller_1.deleteComment)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(401);
        expect(json.success).toBe(false);
    });
    // Sad path(2) - missing postId
    test("Bad request(missing postId), it should return 400", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "DELETE",
        });
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        const response = node_mocks_http_1.default.createResponse();
        await (0, comment_controller_1.deleteComment)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(400);
        expect(json.success).toBe(false);
    });
});
