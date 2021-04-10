import request from "supertest";

import app from "../../app";
import { data } from "../TestConstant";
import { Classes, Students, Subjects, Teachers } from "../../models";
import { cleanUpMockData } from "../TestServices";

// i use any for input type without type safety as we have many combination of typing (error should already be caught by error middleware)
function register(input: any) {
  return request(app).post("/api/register").send(input);
}

describe("Test Registration API", () => {
  beforeAll(async () => {
    await cleanUpMockData("multi");
    await cleanUpMockData("single");
  });
  describe("When providing valid input and multiple teacher and student", () => {
    afterAll(async () => {
      await cleanUpMockData("multi");
    });
    it("should return status code 204", async () => {
      const result = await register(data.validMultiple);
      expect(result.status).toBe(204);
    });
    it("should add two teacher into the database", async () => {
      const teacher = await Teachers.findAll();
      expect(teacher.length).toBe(2);
    });
    it("should add 3 student into the database", async () => {
      const student = await Students.findAll();
      expect(student.length).toBe(3);
    });
    it("should add the subject to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(1);
    });
    it("should add the class to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(1);
    });
  });
  describe("When providing valid input and single teacher and student", () => {
    afterAll(async () => {
      await cleanUpMockData("single");
    });
    it("should return status code 204", async () => {
      const result = await register(data.validSingle);
      expect(result.status).toBe(204);
    });
    it("should add 1 teacher into the database", async () => {
      const teacher = await Teachers.findAll();
      expect(teacher.length).toBe(1);
    });
    it("should add 1 student into the db", async () => {
      const student = await Students.findAll();
      expect(student.length).toBe(1);
    });
    it("should add the subject to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(1);
    });
    it("should add the class to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(1);
    });
  });

  describe("When providing invalid input and single teacher and student", () => {
    it("should return status code 400", async () => {
      const result = await register(data.invalidSingle);
      expect(result.status).toBe(400);
    });
    it("should not add teacher into the database", async () => {
      const teacher = await Teachers.findAll();
      expect(teacher.length).toBe(0);
    });
    it("should not add student into the db", async () => {
      const student = await Students.findAll();
      expect(student.length).toBe(0);
    });
    it("should not add the subject to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(0);
    });
    it("should not add the class to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(0);
    });
  });

  describe("When providing invalid input and multiple teacher and student", () => {
    it("should return status code 400", async () => {
      const result = await register(data.invalidMultiple);
      expect(result.status).toBe(400);
    });
    it("should not add teacher into the database", async () => {
      const teacher = await Teachers.findAll();
      expect(teacher.length).toBe(0);
    });
    it("should not add student into the db", async () => {
      const student = await Students.findAll();
      expect(student.length).toBe(0);
    });
    it("should not add the subject to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(0);
    });
    it("should not add the class to the database", async () => {
      const subject = await Subjects.findAll();
      expect(subject.length).toBe(0);
    });
  });
});
