import httpMocks from "node-mocks-http";
import { TEST_POST, TESTER } from "../_config/tester.id";
import { deletePost } from "../../features/post/application/controllers/post.controller";
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
    const request = httpMocks.createRequest({
      method: "DELETE",
    });
    request.params.postId = TEST_POST.id;
    (request as any).user = {
      id: "hacker",
    };
    const response = httpMocks.createResponse();
    await deletePost(request, response);
    const json = response._getJSONData();
    // console.log("Delete post - json", json);
    expect(response.statusCode).toBe(401);
    expect(json.success).toBe(false);
  });
  // Sad path(2) - post doesn't exists
  test("sad path(2)", async () => {
    const request = httpMocks.createRequest({
      method: "DELETE",
    });
    request.params.postId = "066354d2-01e4-4b4b-8fef-242f047e4219";
    (request as any).user = {
      id: TESTER.id,
    };
    const response = httpMocks.createResponse();
    await deletePost(request, response);
    const json = response._getJSONData();
    // console.log("Delete post - json", json);
    expect(response.statusCode).toBe(404);
    expect(json.success).toBe(false);
  });
});
