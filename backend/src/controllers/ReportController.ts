import { NextFunction, Request, Response } from "express";
import ErrorBase from "../errors/ErrorBase";
import Logger from "../config/logger";
import { getTeacherWorkLoadRecords } from "../utils/ReportServices";
import { Classes } from "../models";
const LOG = new Logger("ReportServices.ts");
// Sorry, can't work out how to do a group by and count in sequelize, so i create it by looping through the return item

// unable to use performance.now() as it is not availble in node
export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // we need to find unique identifier instead of name, add email to name?
  // using any type (to find out how to use typescript with combination models)
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
