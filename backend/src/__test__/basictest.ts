import app from "../app";
import request from "supertest";

describe("test is working", () => {
  it("should return true", async () => {
    await request(app).get("/");
    expect(true).toBe(true);
  });
});
