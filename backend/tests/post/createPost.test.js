"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const post_controller_1 = require("../../features/post/application/controllers/post.controller");
// happy path - 1
// sad path - 2
describe("createPost", () => {
    // Sad path : Unauthorized
    test("Unauthorized", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                title: "test title",
                content: "test content",
                location: "Seoul",
            },
        });
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.createPost)(request, response);
        expect(response.statusCode).toBe(401);
    });
    // Sad path: missing title
    test("Validation-0 return 400 missing title", async () => {
        const userId = "tester123";
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                content: "test content",
                location: "test location",
                userId: userId,
            },
        });
        request.user = {
            id: "tester123",
        };
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.createPost)(request, response);
        expect(response.statusCode).toBe(400);
    });
    // Happy path
    test("Happy path - create post successfully", async () => {
        const userId = "a523befe-08b8-4eee-b08e-e21386ba37f3";
        const request = node_mocks_http_1.default.createRequest({
            method: "POST",
            body: {
                title: "test title",
                content: "test content",
                location: "test location",
                userId: userId,
            },
        });
        request.user = {
            id: "a523befe-08b8-4eee-b08e-e21386ba37f3",
        };
        const response = node_mocks_http_1.default.createResponse();
        await (0, post_controller_1.createPost)(request, response);
        expect(response.statusCode).toBe(200);
    });
});
