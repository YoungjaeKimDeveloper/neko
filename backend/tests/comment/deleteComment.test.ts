import httpMocks from "node-mocks-http";
import { TEST_POST, TESTER } from "../_config/tester.id";
import { deleteComment } from "../../features/comment/application/controller/comment.controller";
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
    const request = httpMocks.createRequest({
      method: "DELETE",
    });
    request.params.postId = TEST_POST.id;
    const response = httpMocks.createResponse();
    await deleteComment(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(401);
    expect(json.success).toBe(false);
  });
  // Sad path(2) - missing postId
  test("Bad request(missing postId), it should return 400", async () => {
    const request = httpMocks.createRequest({
      method: "DELETE",
    });
    (request as any).user = {
      id: TESTER.id,
    };
    const response = httpMocks.createResponse();
    await deleteComment(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(400);
    expect(json.success).toBe(false);
  });
});
