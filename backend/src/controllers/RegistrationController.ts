import { Request, Response, NextFunction } from "express";
import { IBody } from "modelTypes";

import {
  findOrCreateSubject,
  findOrCreateClass,
  findOrCreateTeacher,
  findOrCreateStudents,
} from "../utils/RegistrationServices";

import Logger from "../config/logger";

const LOG = new Logger("RegistrationRoutes.ts");
/*
Please do let me know if i am mistaken on the requirement.

Assumption:
1) I assume that classes and subject combination will be the unique identifier 
to find if i am registrating a new class or updating an existing class as
each class can have multiple subject and it is difficult to differentiate if i am
updating / creating a subject + class combination. 

2) Given 1) i will remove all teacher and student that were attached to the class
previously and insert new student and teacher to the class. 

3) After removing the teacher/student from the class, we still keep them in the 
database

4) I have made both the teacher and student an optional array
teacher: Teacher[] | Teacher and student: Student[] | Student


Issues:
1) There is a bug with sequelize and mysql where bulkcreate will return null for id
https://github.com/sequelize/sequelize/issues/2908 which i tried both solution but
it still did not work for me.

2) Want to try using transaction commiting but does not work well with 
jest testing. May have to mock the transaction? I am removing this currently
until i find a better way to perform transaction.

3) Upsert seems to not return object with id

Solution 1: I iterate the array of teacher and student instead of using bulkinsert
but this will likely hurt the performance due to multiple call being done to the db

solution 3: I refetch the object after using upsert to save it to the db but found issue
could be due to jest running in parallel instead of sequential. i will keep the refetching solution
for now.
*/

export const RegistrationController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<void>> => {
  const { teacher, students, subject, class: classes } = <IBody>req.body;
  try {
    const storedSubject = await findOrCreateSubject(subject);

    const storedClasses = await findOrCreateClass(classes, storedSubject);

    await findOrCreateTeacher(teacher, storedClasses);
    await findOrCreateStudents(students, storedClasses);
    LOG.info("Class registered");
    return res.status(204).send();
  } catch (err) {
    LOG.error(err.message);
    next(err);
  }
};
