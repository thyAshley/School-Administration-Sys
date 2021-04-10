import { BAD_REQUEST } from "http-status-codes";
import {
  IBody,
  IClass,
  IStudent,
  ISubject,
  ITeacher,
} from "../@types/modelTypes";

import ErrorBase from "../errors/ErrorBase";
import ErrorCodes from "../const/ErrorCodes";

// i took this from stack overflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: string) {
  if (!email) return false;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateName(name: string) {
  if (!name) return false;
  name = name.trim();
  return !!name;
}

function throwError(
  message: string,
  errorCode?: number,
  httpStatusCode?: number
) {
  errorCode = errorCode || BAD_REQUEST;
  httpStatusCode = httpStatusCode || 400;
  throw new ErrorBase(message, errorCode, httpStatusCode);
}

export function validateJson({
  teacher,
  students,
  subject,
  class: classes,
}: IBody): void {
  if (!teacher || !students || !subject || !classes) {
    throwError(
      "missing input",
      BAD_REQUEST,
      ErrorCodes.INVALID_JSON_INPUT_ERROR_CODE
    );
  }
  return;
}

export function validateTeacher(teacher: ITeacher | ITeacher[]): void {
  if (Array.isArray(teacher)) {
    if (teacher.length > 2) {
      throwError(
        "Only a maximum of two teacher can be assigned to a single class",
        BAD_REQUEST,
        400
      );
    }
    teacher.forEach((teach: ITeacher) => {
      if (!teach.email || !teach.name) {
        throwError(
          "Please validate your input for the teacher field",
          BAD_REQUEST,
          400
        );
      }

      if (!validateEmail(teach.email) || !validateName(teach.name)) {
        throwError(
          "Please validate your input for the teacher field",
          BAD_REQUEST,
          400
        );
      }
    });
  } else {
    if (!teacher.email || !teacher.name) {
      throwError(
        "Please validate your input for the teacher field",
        BAD_REQUEST,
        400
      );
    }
    if (!validateEmail(teacher.email) || !validateName(teacher.name)) {
      throwError(
        "Please validate your input for the teacher field",
        BAD_REQUEST,
        400
      );
    }
  }
  return;
}

export function validateSubject(subject: ISubject): void {
  if (typeof subject !== "object") {
    throwError(
      "Please validate your input for the subject field",
      BAD_REQUEST,
      400
    );
  }
  const trimName = subject?.name?.trim();
  const trimSubjectCode = subject?.subjectCode?.trim();
  if (!trimName || !trimSubjectCode) {
    throwError(
      "Please validate your input for the subject field",
      BAD_REQUEST,
      400
    );
  }
}

export function validateClass(classes: IClass): void {
  if (typeof classes !== "object") {
    throwError(
      "Please validate your input for the class field",
      BAD_REQUEST,
      400
    );
  }
  const trimName = classes?.name?.trim();
  const trimSubjectCode = classes?.classCode?.trim();
  if (!trimName || !trimSubjectCode) {
    throwError(
      "Please validate your input for the class field",
      BAD_REQUEST,
      400
    );
  }
}

export function validateStudent(students: IStudent | IStudent[]): void {
  if (Array.isArray(students)) {
    students.forEach((student: IStudent) => {
      if (!student.email || !student.name) {
        throwError(
          "Please validate your input for the student field",
          BAD_REQUEST,
          400
        );
      }

      if (!validateEmail(student.email) || !validateName(student.name)) {
        throwError(
          "Please validate your input for the student field",
          BAD_REQUEST,
          400
        );
      }
    });
  } else {
    if (!students.email || !students.name) {
      throwError(
        "Please validate your input for the student field",
        BAD_REQUEST,
        400
      );
    }
    if (!validateEmail(students.email) || !validateName(students.name)) {
      throwError(
        "Please validate your input for the student field",
        BAD_REQUEST,
        400
      );
    }
  }
  return;
}
