import request from "supertest";
import app from "../src/app";

describe("GET /health", () => {
  let server: import("http").Server; // Specifying the type for server
  let port: number;

  jest.setTimeout(10000);

  beforeAll((done) => {
    server = app.listen(0, () => {
      const address = server.address();
      if (address && typeof address !== "string") {  // Check for null and string type
        port = address.port;
      }
      done();
    });
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    }
  });

  it("should return 200 OK", async () => {
    const response = await request(`http://localhost:${port}`).get("/health");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Server is healthy");
  });
});
