import { Classes, Students, Subjects, Teachers } from "../../models";
import {
  findOrCreateSubject,
  findOrCreateClass,
  findOrCreateTeacher,
  findOrCreateStudents,
} from "../../utils/RegistrationServices";

import { data } from "../TestConstant";
import { cleanUpMockData } from "../TestServices";

describe("test registration services", () => {
  beforeAll(async () => {
    await cleanUpMockData("multi");
    await cleanUpMockData("single");
  });
  afterAll(async () => {
    await cleanUpMockData("multi");
    await cleanUpMockData("single");
  });
  describe("findOrCreateSubject Test", () => {
    describe("if input is a new subject", () => {
      it("should be saved into the DB", async () => {
        await findOrCreateSubject(data.validSingle.subject);
        const result = await Subjects.findAll();
        expect(result).toHaveLength(1);
      });
    });
    describe("when adding another input with the same details", () => {
      it("should have still have length 1", async () => {
        await findOrCreateSubject(data.validSingle.subject);
        const result = await Subjects.findAll();
        expect(result).toHaveLength(1);
      });
    });
    describe("when adding another input with the same subjectCode but different name", () => {
      it("should have still have length 1", async () => {
        await findOrCreateSubject({
          subjectCode: data.validSingle.subject.subjectCode,
          name: "new name",
        });
        const result = await Subjects.findAll();
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("new name");
      });
    });
  });

  describe("findOrCreateClass Test", () => {
    describe("if input is a new class", () => {
      let subject: Subjects;
      beforeAll(async () => {
        subject = await Subjects.findOne({
          where: { subjectCode: data.validSingle.subject.subjectCode },
        });
      });
      it("should be saved into the DB", async () => {
        let result = await Classes.findAll();
        expect(result).toHaveLength(0);
        await findOrCreateClass(data.validSingle.class, subject);
        result = await Classes.findAll();
        expect(result).toHaveLength(1);
      });
      it("should have a subject", async () => {
        const result = await Classes.findAll();
        expect(result[0].SubjectId).toBe(subject.id);
      });
      describe("when adding another class with the same classCode but different name", () => {
        it("should should only update the existing class", async () => {
          let result = await Classes.findAll();
          expect(result).toHaveLength(1);
          await findOrCreateClass(
            { classCode: data.validSingle.class.classCode, name: "newClass" },
            subject
          );
          result = await Classes.findAll();
          expect(result).toHaveLength(1);
          expect(result[0].SubjectId).toBe(subject.id);
          expect(result[0].name).toBe("newClass");
        });
      });
    });
  });

  describe("findOrCreateTeacher Test", () => {
    describe("When adding valid number of teacher to the database", () => {
      let classes: Classes;
      beforeAll(async () => {
        classes = await Classes.findOne({
          where: { classCode: data.validSingle.class.classCode },
        });
      });
      it("should add one teacher in the db when one teacher is sent", async () => {
        let result = await Teachers.findAll();
        expect(result).toHaveLength(0);
        await findOrCreateTeacher(data.validSingle.teacher, classes);
        result = await Teachers.findAll();
        expect(result).toHaveLength(1);
        const junctionTable = await classes.getTeachers();
        expect(junctionTable).toHaveLength(1);
      });
    });
  });

  describe("findOrCreateStudents Test", () => {
    describe("When sending students details", () => {
      let classes: Classes;
      beforeAll(async () => {
        classes = await Classes.findOne({
          where: { classCode: data.validSingle.class.classCode },
        });
      });
      it("should add one student if one student is sent ", async () => {
        await findOrCreateStudents(data.validSingle.students, classes);
        const result = await Students.findAll();
        expect(result).toHaveLength(1);
        const junctionTable = await classes.getStudents();
        expect(junctionTable).toHaveLength(1);
      });
      it("should add one student if more than one student is sent ", async () => {
        await findOrCreateStudents(data.validMultiple.students, classes);
        const result = await Students.findAll();
        expect(result).toHaveLength(3);
        const junctionTable = await classes.getStudents();
        expect(junctionTable).toHaveLength(3);
      });
    });
  });
});
