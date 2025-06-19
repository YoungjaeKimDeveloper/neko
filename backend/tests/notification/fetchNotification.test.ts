import httpMocks from "node-mocks-http";
import { TESTER } from "../_config/tester.id";
import { fetchNotification } from "../../features/notification/application/controller/notification.controller";
/*
    fetch notifications by userId
    
    1.Happy path(1)
        
*/

describe("Fetch notification tests", () => {
  test("Happy path, it should return 200 with data", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
    });
    (request as any).user = {
      id: TESTER.id,
    };
    const response = httpMocks.createResponse();
    await fetchNotification(request, response);
    const json = response._getJSONData();
    console.log("JSON", json);
    expect(response.statusCode).toBe(200);
  });
});
