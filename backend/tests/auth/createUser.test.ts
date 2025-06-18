import httpMocks from "node-mocks-http";
import { createUser } from "../../features/auth/application/controller/auth.controller";
/*  
  createUser function test 
  Sad paht - 1
  Happy path -1
*/

describe("createUser test", () => {
  // sad path
  test("it returns 400 if missing email", async () => {
    let response;
    let request;
    request = httpMocks.createRequest({
      method: "POST",
      body: {
        userName: "tester",
        password: "test1234",
      },
    });
    response = httpMocks.createResponse();
    await createUser(request, response);
    expect(response.statusCode).toBe(400);
  });
  // happy path
  test("create new user", async () => {
    let request = httpMocks.createRequest({
      method: "POST",
      body: {
        email: "tester12345@gmail.com",
        password: "123123",
        userName: "tester",
      },
    });
    let response = httpMocks.createResponse();
    await createUser(request, response);
  });
});
