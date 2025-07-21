"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

    fetchPostByUserId
        - 1 happy path
        - 2 sad patb

*/
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const post_controller_1 = require("../../features/post/application/controllers/post.controller");
const tester_id_1 = require("../_config/tester.id");
const tester = tester_id_1.TESTER.id;
describe("fetchPostByUserId", () => {
    // happy path - 1
    test("return 200", async () => {
        const request = node_mocks_http_1.default.createRequest({ method: "GET" });
        request.user = {
            id: tester,
        };
        const response = node_mocks_http_1.default.createResponse();
        // Call API
        await (0, post_controller_1.fetchPostsByUserId)(request, response);
        // Get json data
        const json = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(json.success).toBe(true);
        expect(json.details).toBe("Posts fetched");
        expect(json.data).not.toBe(null);
    });
    // sad path -1
    test("return 401 unauthorized", async () => {
        const request = node_mocks_http_1.default.createRequest({ method: "GET" });
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.fetchPostsByUserId)(request, response);
    });
});
