import { Model } from "sequelize/types";
import { Teachers, Classes, Subjects } from "../models";

export const getTeacherWorkLoadRecords = async () => {
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
