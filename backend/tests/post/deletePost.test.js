"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const tester_id_1 = require("../_config/tester.id");
const post_controller_1 = require("../../features/post/application/controllers/post.controller");
/*

    delete post test cases
    1. Happy path ✅
        - valid request   (Test via Postman)
    2. Sad paths ❌
         - post does't exists
         - user is not authorized
*/
describe("Delete post testing ", () => {
    // Happ path(1)
    test("Happy path - valid request - test with Postman", async () => {
        expect(true).toBe(true);
    });
    // Sad path(1) - Unauthorized to delete post
    test("sad paht(1) - Unauthorized to delete", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "DELETE",
        });
        request.params.postId = tester_id_1.TEST_POST.id;
        request.user = {
            id: "hacker",
        };
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.deletePost)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(401);
        expect(json.success).toBe(false);
    });
    // Sad path(2) - post doesn't exists
    test("sad path(2)", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "DELETE",
        });
        request.params.postId = "066354d2-01e4-4b4b-8fef-242f047e4219";
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.deletePost)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(404);
        expect(json.success).toBe(false);
    });
});
