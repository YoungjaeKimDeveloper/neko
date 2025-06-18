import httpMocks from "node-mocks-http";
import { issueAuthToken } from "../../features/auth/application/controller/auth.controller";

/*
    Test issueToken
    Sad path - 2 (missing email, mismatching password)
    Happy path - 1
*/

describe("issueToken", () => {
  // sad path -1
  test("reutrn 400 missing email", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        password: "123123",
      },
    });
    const response = httpMocks.createResponse();
    await issueAuthToken(request, response);
    expect(response.statusCode).toBe(400);
  });
  // sad path -2
  test("reutrn 401 mismatch password", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        email: "tester12345@gmail.com",
        password: "12312",
      },
    });
    const response = httpMocks.createResponse();
    await issueAuthToken(request, response);
    expect(response.statusCode).toBe(401);
  });
  // happy path -1
  test("return 200 issue new token", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      body: {
        email: "tester12345@gmail.com",
        password: "123123",
      },
    });
    const response = httpMocks.createResponse();
    await issueAuthToken(request, response);
    expect(response.statusCode).toBe(200);
  });
});
