const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("should response with 200 success", async () => {
    await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  test("should response with 201 success", async () => {
    const completeLaucnhDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186 f",
      launchDate: "January 4, 2028"
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186 f"
    };

    const response = await request(app)
      .post("/launches")
      .send(completeLaucnhDate)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaucnhDate.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
});
