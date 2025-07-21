"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const tester_id_1 = require("../_config/tester.id");
const post_controller_1 = require("../../features/post/application/controllers/post.controller");
/*
    - No smoke test
    updatePost
        - 1 happy path
        - 2 sad patb

*/
describe("Update post", () => {
    // Happy path -1
    test("Happy path update post", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "PUT",
            body: {
                updated_title: "updated title",
                updated_content: "updated content",
            },
        });
        const response = node_mocks_http_1.default.createResponse();
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        request.params = {
            postId: tester_id_1.TEST_POST.id,
        };
        await (0, post_controller_1.updatePost)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(json.success).toBe(true);
        expect(json.data).not.toBe(null);
    });
    // Sad path(1) -
    test("Sad path(1) - nothing to update", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "PUT",
        });
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.updatePost)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(400);
        expect(json.success).toBe(false);
    });
    // Sad path(2) -
    test("Sad path(2) - Unauthorized user", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "PUT",
        });
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.updatePost)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(401);
        expect(json.success).toBe(false);
    });
});
