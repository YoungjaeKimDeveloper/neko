import httpMocks from "node-mocks-http";
import { TEST_POST, TESTER } from "../_config/tester.id";
import { createComment } from "../../features/comment/application/controller/comment.controller";

/*

    Create comment test 
    1. Happy path - 1
        - create new comment
    2. Sad path
        - nothing to create
        - unAuthorized

*/

describe("create comment test", () => {
  // Happy path - 1
  test("create comment test", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        content: "update test",
      },
    });
    // Mock verify Token
    (request as any).user = {
      id: TESTER.id,
    };
    request.params.postId = TEST_POST.id;
    const response = httpMocks.createResponse();
    await createComment(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(201);
    console.log("JSON", json);
  });
  // Sad path(1) - missing content
  test("create comment test", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
    });
    // Mock verify Token
    (request as any).user = {
      id: TESTER.id,
    };
    request.params.postId = TEST_POST.id;
    const response = httpMocks.createResponse();
    await createComment(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(400);
    console.log("JSON", json);
  });
  // Sad path(1) - missing content
  test("create comment test", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
    });
    // Mock verify Token
    (request as any).user = {
      id: TESTER.id,
    };
    request.params.postId = TEST_POST.id;
    const response = httpMocks.createResponse();
    await createComment(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(400);
    console.log("JSON", json);
  });
  // Sad path(2) - Unauthorized
  test("create comment test", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        content: "update test",
      },
    });
    // Mock verify Token

    request.params.postId = TEST_POST.id;
    const response = httpMocks.createResponse();
    await createComment(request, response);
    const json = response._getJSONData();
    expect(response.statusCode).toBe(401);
    console.log("JSON", json);
  });
});
