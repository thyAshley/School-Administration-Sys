import request from "supertest";

import app from "../../app";
import { report, data } from "../TestConstant";
import { Students, Subjects, Teachers } from "../../models";
import { cleanUpMockData } from "../TestServices";

describe("/api/reports/workload", () => {
  beforeAll(async () => {
    await cleanUpMockData("multi");
    await cleanUpMockData("single");
  });
  afterAll(async () => {
    await cleanUpMockData("multi");
    await cleanUpMockData("single");
  });
  describe("when adding 1 teacher with 1 class", () => {
    let response: request.Response;
    beforeAll(async () => {
      await request(app).post("/api/register").send(data.validSingle);
      response = await request(app).get("/api/reports/workload");
    });
    it("should reflect in the report that the teacher has a single class", async () => {
      expect(response.body).toStrictEqual(report.reportSingle);
    });
    it("should return statusCode 200", () => {
      expect(response.status).toBe(200);
    });
  });

  describe("when adding the same class to a new teacher", () => {
    let response: request.Response;
    beforeAll(async () => {
      await request(app).post("/api/register").send(data.validSingle2);
      response = await request(app).get("/api/reports/workload");
    });
    it("should reflect in the report that the teacher has a single class", async () => {
      expect(response.body).toStrictEqual(report.reportSingle2);
    });
    it("should return statusCode 200", () => {
      expect(response.status).toBe(200);
    });
  });

  describe("when adding another class to an existing teacher", () => {
    let response: request.Response;
    beforeAll(async () => {
      await request(app).post("/api/register").send(data.validSingle3);
      response = await request(app).get("/api/reports/workload");
    });
    it("should reflect in the report that the teacher has a single class", async () => {
      expect(response.body).toStrictEqual(report.reportSingle3);
    });
    it("should return statusCode 200", () => {
      expect(response.status).toBe(200);
    });
  });
});
