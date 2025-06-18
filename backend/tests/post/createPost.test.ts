import httpMocks from "node-mocks-http";
import { createPost } from "../../features/post/application/controllers/post.controller";
// happy path - 1
// sad path - 2
describe("createPost", () => {
  // Sad path : Unauthorized
  test("Unauthorized", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        title: "test title",
        content: "test content",
        location: "Seoul",
      },
    });
    const response = httpMocks.createResponse();
    await createPost(request, response);
    expect(response.statusCode).toBe(401);
  });
  // Sad path: missing title
  test("Validation-0 return 400 missing title", async () => {
    const userId = "tester123";
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        content: "test content",
        location: "test location",
        userId: userId,
      },
    });
    (request as any).user = {
      id: "tester123",
    };
    const response = httpMocks.createResponse();
    await createPost(request, response);
    expect(response.statusCode).toBe(400);
  });
  // Happy path
  test("Happy path - create post successfully", async () => {
    const userId = "a523befe-08b8-4eee-b08e-e21386ba37f3";
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        title: "test title",
        content: "test content",
        location: "test location",
        userId: userId,
      },
    });
    (request as any).user = {
      id: "a523befe-08b8-4eee-b08e-e21386ba37f3",
    };
    const response = httpMocks.createResponse();
    await createPost(request, response);
    expect(response.statusCode).toBe(200);
  });
});
