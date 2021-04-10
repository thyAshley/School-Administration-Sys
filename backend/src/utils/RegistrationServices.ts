import { IClass, IStudent, ISubject, ITeacher } from "modelTypes";
import { Classes, Students, Subjects, Teachers } from "../models";
import ErrorBase from "../errors/ErrorBase";

export const findOrCreateSubject = async (
  subject: ISubject
): Promise<Subjects> => {
  try {
    let subjectInDB = await Subjects.findOne({
      where: { subjectCode: subject.subjectCode },
    });
    if (!subjectInDB) {
      subjectInDB = await Subjects.create(subject);
    }
    // update name if updated
    if (subjectInDB.name !== subject.name) {
      subjectInDB.name = subject.name;
      await subjectInDB.save();
    }
    return subjectInDB;
  } catch (error) {
    console.log(error);
    throw new ErrorBase(
      "Something went wrong, Unable to create subject in the database",
      400,
      400
    );
  }
};

export const findOrCreateClass = async (
  classes: IClass,
  storedSubject: Subjects
): Promise<Classes> => {
  try {
    let classesInDB = await Classes.findOne({
      where: {
        SubjectId: storedSubject.id,
        classCode: classes.classCode,
      },
    });
    if (!classesInDB) {
      classesInDB = await Classes.create({
        ...classes,
        SubjectId: storedSubject.id,
      });
    }

    // renaming
    if (classesInDB.name !== classes.name) {
      classesInDB.name = classes.name;
    }
    await classesInDB.save();
    return classesInDB;
  } catch (error) {
    throw new ErrorBase(
      "Something went wrong, Unable to create classes in the database",
      400,
      400
    );
  }
};

export const findOrCreateTeacher = async (
  teacher: ITeacher | ITeacher[],
  storedClasses: Classes
): Promise<void> => {
  try {
    // get existing teachers
    const existingTeacher = await storedClasses.getTeachers();
    if (existingTeacher.length) {
      storedClasses.removeTeachers(existingTeacher);
    }
    let result: Teachers;

    if (Array.isArray(teacher)) {
      if (teacher.length > 2) {
        throw new Error(
          "You can only assign 2 teacher teaching the same subject to a class"
        );
      }

      const teacherList: { [email: string]: boolean } = {};
      teacher.forEach(async (teach) => {
        if (!(teach.email in teacherList)) {
          teacherList[teach.email] = true;
          await Teachers.upsert(teach);
          const teacherInDB = await Teachers.findOne({
            where: { email: teach.email },
          });
          await storedClasses.addTeachers(teacherInDB);
        }
      });
    } else {
      await Teachers.upsert(teacher);
      const teacherInDB = await Teachers.findOne({
        where: { email: teacher.email },
      });
      await storedClasses.addTeachers(teacherInDB);
    }
  } catch (error) {
    throw new ErrorBase(error.message, 400, 400);
  }
};

export const findOrCreateStudents = async (
  students: IStudent | IStudent[],
  storedClasses: Classes
): Promise<void> => {
  try {
    const existingStudent = await storedClasses.getStudents();
    if (existingStudent) {
      await storedClasses.removeStudents(existingStudent);
    }

    if (Array.isArray(students)) {
      const studentList: { [email: string]: boolean } = {};
      for (const stud of students) {
        if (!(stud.email in studentList)) {
          studentList[stud.email] = true;
          await Students.upsert(stud);
          const studentInDb = await Students.findOne({
            where: { email: stud.email },
          });
          await storedClasses.addStudents(studentInDb);
        }
      }
    } else {
      await Students.upsert(students);
      const studentInDb = await Students.findOne({
        where: { email: students.email },
      });
      await storedClasses.addStudents(studentInDb);
    }
  } catch (error) {
    // console.log("fail");
    throw new ErrorBase(error.message, 400, 400);
  }
};
