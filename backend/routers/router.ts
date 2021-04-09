import express from "express";

import Teachers from "../models/Teacher";
import Students from "../models/Student";
import Subjects from "../models/Subject";
import Classes from "../models/Classes";
import HealthcheckController from "../controllers/HealthcheckController";
import { ValidateRegistrationInputMiddleware } from "../middleware/InputValidationMiddleware";
import { RegistrationController } from "../controllers/RegistrationController";

const router = express.Router();
router.use("/", HealthcheckController);

router.post(
  "/register",
  ValidateRegistrationInputMiddleware,
  RegistrationController
);

const getTeacherWorkLoadRecords = async () => {
  return await Teachers.findAll({
    attributes: ["name"],
    include: [
      {
        model: Classes,
        as: "Classes",
        include: [
          {
            model: Subjects,
            attributes: ["subjectCode", "name"],
          },
        ],
      },
    ],
  });
};

// Sorry, can't work out how to do a group by and count in sequelize, so i create it by looping through the return item
router.get("/reports/workload", async (req, res) => {
  // using any type (to find out how to use typescript with combination models)
  const teachers: any = await getTeacherWorkLoadRecords();
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
    teacherclass.forEach((classes: any) => {
      const subjectInfo = classes.Subject;
      countArray[subjectInfo.subjectCode + " " + subjectInfo.name] =
        countArray[subjectInfo.subjectCode + " " + subjectInfo.name] + 1 || 1;
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
  res.status(200).send(result);
});

export default router;
