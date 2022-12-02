const request = require("supertest");
const app = require("../../app");

describe("Test POST /launches", () => {
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

  const launchDataWithInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "yolo"
  };
  test("should response with 201 success", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaucnhDate)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaucnhDate.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("should catch missing required property", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property"
    });
  });

  test("should catch invalid dates", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date"
    });
  });
});
