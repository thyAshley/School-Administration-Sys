import { Classes, Students, Subjects, Teachers } from "../models";
import { data } from "./TestConstant";

export async function cleanUpMockData(type: string): Promise<void> {
  if (type === "multi") {
    await Teachers.destroy({
      where: { email: data.validMultiple.teacher[0].email },
    });
    await Teachers.destroy({
      where: { email: data.validMultiple.teacher[1].email },
    });
    await Students.destroy({
      where: { email: data.validMultiple.students[0].email },
    });
    await Students.destroy({
      where: { email: data.validMultiple.students[1].email },
    });
    await Students.destroy({
      where: { email: data.validMultiple.students[2].email },
    });
  } else {
    await Teachers.destroy({
      where: { email: data.validSingle.teacher.email },
    });
    await Students.destroy({
      where: { email: data.validSingle.students.email },
    });
  }

  await Classes.destroy({
    where: { classCode: data.validMultiple.class.classCode },
  });
  await Classes.destroy({
    where: { classCode: data.validSingle3.class.classCode },
  });
  await Subjects.destroy({
    where: { subjectCode: data.validMultiple.subject.subjectCode },
  });
  await Subjects.destroy({
    where: { subjectCode: data.validSingle2.subject.subjectCode },
  });
}
