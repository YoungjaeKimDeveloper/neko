"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const tester_id_1 = require("../_config/tester.id");
const notification_controller_1 = require("../../features/notification/application/controller/notification.controller");
/*
    fetch notifications by userId
    
    1.Happy path(1)
        
*/
describe("Fetch notification tests", () => {
    test("Happy path, it should return 200 with data", async () => {
        const request = node_mocks_http_1.default.createRequest({
            method: "GET",
        });
        request.user = {
            id: tester_id_1.TESTER.id,
        };
        const response = node_mocks_http_1.default.createResponse();
        await (0, notification_controller_1.fetchNotification)(request, response);
        const json = response._getJSONData();
        expect(response.statusCode).toBe(200);
    });
});
