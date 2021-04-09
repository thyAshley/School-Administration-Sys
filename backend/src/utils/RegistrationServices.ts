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
          const [tempTeacher] = await Teachers.upsert(teach);
          await storedClasses.addTeachers(tempTeacher);
        }
      });
    } else {
      [result] = await Teachers.upsert(teacher);
      await storedClasses.addTeachers(result);
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
      students.forEach(async (stud) => {
        const [tempStudent] = await Students.upsert(stud);
        await storedClasses.addStudents(tempStudent);
      });
    } else {
      const [student] = await Students.upsert(students);
      await storedClasses.addStudents(student);
    }
    return null;
  } catch (error) {
    throw new ErrorBase(error.message, 400, 400);
  }
};
