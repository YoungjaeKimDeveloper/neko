import httpMocks from "node-mocks-http";
import { fetchPostsByUserId } from "../../features/post/application/controllers/post.controller";
import { TESTER } from "../config/tester.id";

/*

    fetchPostByUserId 
        - 1 happy path
        - 2 sad patb

*/
const tester = TESTER.id;
describe("fetchPostByUserId", () => {
  // happy path - 1
  test("return 200", async () => {
    const request = httpMocks.createRequest({ method: "GET" });
    (request as any).user = {
      id: tester,
    };
    const response = httpMocks.createResponse();

    // Call API
    await fetchPostsByUserId(request, response);
    // Get json data
    const json = response._getJSONData();
    expect(response.statusCode).toBe(200);
    expect(json.success).toBe(true);
    expect(json.details).toBe("Posts fetched");
    expect(json.data).not.toBe(null);
  });

  // sad path -1
  test("return 401 unauthorized", async () => {
    const request = httpMocks.createRequest({ method: "GET" });
    const response = httpMocks.createResponse();
    await fetchPostsByUserId(request, response);
  });
});
