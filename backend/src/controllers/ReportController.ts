import { NextFunction, Request, Response } from "express";
import ErrorBase from "../errors/ErrorBase";
import Logger from "../config/logger";
import { getTeacherWorkLoadRecords } from "../utils/ReportServices";

const LOG = new Logger("ReportServices.ts");

/*
we will just use the name as an unique identifier for now in order to match the test cases given.
To make the result more uniquely identifible, we can always include the user of the teacher email with the name
*/
export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    LOG.info("Generating workload report...");
    const t1 = new Date().getTime();
    const teachers = await getTeacherWorkLoadRecords();
    const result: {
      [teachername: string]: {
        subjectCode: string;
        subjectName: string;
        numberOfClasses: number;
      }[];
    } = {};

    for (const teacher of teachers) {
      const teacherclass = teacher.Classes;
      const countArray: { [subjectCode: string]: number } = {};
      teacherclass.forEach((classes) => {
        const { subjectCode, name } = classes.Subject;
        countArray[subjectCode + " " + name] =
          countArray[subjectCode + " " + name] + 1 || 1;
      });
      for (const keys in countArray) {
        const [subjectCode, subjectName] = keys.split(" ");
        if (!result[teacher.name]) result[teacher.name] = [];
        result[teacher.name].push({
          subjectCode: subjectCode,
          subjectName: subjectName,
          numberOfClasses: countArray[keys],
        });
      }
    }
    const t2 = new Date().getTime();
    LOG.info(
      `Workload report successfully generated in ${t2 - t1} milliseconds`
    );
    res.status(200).send(result);
  } catch (error) {
    LOG.info("Generating Workload report failed");
    next(
      new ErrorBase("Something went wrong, please try again later.", 500, 500)
    );
  }
};
