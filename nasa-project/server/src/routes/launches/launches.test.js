const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("should response with 200 success", async () => {
    const response = await request(app).get("/launches");
    expect(response.statusCode).toBe(200);
  });
});
