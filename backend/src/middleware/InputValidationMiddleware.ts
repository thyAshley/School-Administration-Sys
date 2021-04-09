import { Request, Response, NextFunction } from "express";

import { IBody } from "../@types/modelTypes";
import {
  validateJson,
  validateStudent,
  validateTeacher,
  validateSubject,
  validateClass,
} from "../utils/ValidationServices";

export const ValidateRegistrationInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  validateJson(req.body);
  const { teacher, students, subject, class: classes } = <IBody>req.body;

  validateTeacher(teacher);
  validateStudent(students);
  validateSubject(subject);
  validateClass(classes);
  next();
};
