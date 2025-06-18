import httpMocks from "node-mocks-http";
import { TEST_POST, TESTER } from "../_config/tester.id";
import { updatePost } from "../../features/post/application/controllers/post.controller";
/*
    - No smoke test
    updatePost
        - 1 happy path
        - 2 sad patb

*/
describe("Update post", () => {
  // Happy path -1
  test("Happy path update post", async () => {
    const request = httpMocks.createRequest({
      method: "PUT",
      body: {
        updated_title: "updated title",
        updated_content: "updated content",
      },
    });
    const response = httpMocks.createResponse();
    (request as any).user = {
      id: TESTER.id,
    };
    request.params = {
      postId: TEST_POST.id,
    };
    await updatePost(request, response);
    const json = response._getJSONData();
    // console.log(json);
    expect(response.statusCode).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).not.toBe(null);
  });
  // Sad path(1) -
  test("Sad path(1) - nothing to update", async () => {
    const request = httpMocks.createRequest({
      method: "PUT",
    });
    (request as any).user = {
      id: TESTER.id,
    };
    const response = httpMocks.createResponse();
    await updatePost(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(400);
    expect(json.success).toBe(false);
  });
  // Sad path(2) -
  test("Sad path(2) - Unauthorized user", async () => {
    const request = httpMocks.createRequest({
      method: "PUT",
    });

    const response = httpMocks.createResponse();
    await updatePost(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(401);
    expect(json.success).toBe(false);
  });
});
