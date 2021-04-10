import {
  validateJson,
  validateStudent,
  validateSubject,
  validateTeacher,
} from "../../utils/ValidationServices";

describe("When submitting", () => {
  it.each`
    field         | value   | expectedMessage
    ${"teacher"}  | ${" "}  | ${"missing input"}
    ${"teacher"}  | ${null} | ${"missing input"}
    ${"teacher"}  | ${[]}   | ${"missing input"}
    ${"students"} | ${[]}   | ${"missing input"}
    ${"students"} | ${" "}  | ${"missing input"}
    ${"students"} | ${null} | ${"missing input"}
    ${"subject"}  | ${" "}  | ${"missing input"}
    ${"subject"}  | ${null} | ${"missing input"}
    ${"subject"}  | ${1}    | ${"missing input"}
    ${"subject"}  | ${[]}   | ${"missing input"}
    ${"subject"}  | ${null} | ${"missing input"}
    ${"classes"}  | ${" "}  | ${"missing input"}
    ${"classes"}  | ${null} | ${"missing input"}
  `(
    "if $field is $value, $expectedMessage is received",
    ({ field, value, expectedMessage }) => {
      const data: any = {
        teacher: {
          name: "Teacher 1",
          email: "Teacher1@gmail.com",
        },
        students: {
          name: "Student 1",
          email: "Student1@gmail.com",
        },
        subject: {
          subjectCode: "ENG",
          name: "English",
        },
        classes: {
          classCode: "P1-1",
          name: "P1 Integrity",
        },
      };

      data[field] = value;
      expect(() => validateJson(data)).toThrow(expectedMessage);
    }
  );

  describe("more than 2 teacher in a single request", () => {
    it("should return an error", () => {
      const teacher = [
        {
          name: "Teacher 1",
          email: "Teacher1@gmail.com",
        },
        {
          name: "Teacher 2",
          email: "Teacher2@gmail.com",
        },
        {
          name: "Teacher 3",
          email: "Teacher3@gmail.com",
        },
      ];
      expect(() => validateTeacher(teacher)).toThrow(
        "Only a maximum of two teacher can be assigned to a single class"
      );
    });
  });

  describe("2 valid teacher in a single request", () => {
    it("should not throw an error", () => {
      const teacher = [
        {
          name: "Teacher 1",
          email: "Teacher1@gmail.com",
        },
        {
          name: "Teacher 2",
          email: "Teacher2@gmail.com",
        },
      ];
      expect(() => validateTeacher(teacher)).not.toThrow();
    });
  });

  describe("teacher without name", () => {
    it("should throw an error", () => {
      const teacher = {
        email: "Teacher1@gmail.com",
      };

      const arrTeacher = [
        {
          name: "Teacher 1",
          email: "Teacher1@gmail.com",
        },
        {
          email: "Teacher2@gmail.com",
        },
      ];

      expect(() => validateTeacher(teacher)).toThrow(
        "Please validate your input for the teacher field"
      );

      expect(() => validateTeacher(arrTeacher)).toThrow(
        "Please validate your input for the teacher field"
      );
    });
  });

  describe("teacher without email", () => {
    it("should throw an error", () => {
      const teacher = {
        name: "Teacher 1",
      };

      const arrTeacher = [
        {
          name: "Teacher 1",
        },
        {
          name: "Teacher 2",
          email: "Teacher2@gmail.com",
        },
      ];

      expect(() => validateTeacher(teacher)).toThrow(
        "Please validate your input for the teacher field"
      );
      expect(() => validateTeacher(arrTeacher)).toThrow(
        "Please validate your input for the teacher field"
      );
    });
  });

  describe("teacher without valid email", () => {
    it("should not throw an error", () => {
      const teacher = {
        name: "Teacher 1",
        email: "Teacher1@@@@.com",
      };
      expect(() => validateTeacher(teacher)).toThrow(
        "Please validate your input for the teacher field"
      );
    });
  });

  describe("valid subject", () => {
    it("should not throw any error", () => {
      const subject = {
        name: "English",
        subjectCode: "ENG",
      };
      expect(() => validateSubject(subject)).not.toThrowError();
    });
  });

  describe("invalid subject without name", () => {
    it("should throw any error", () => {
      const subject = {
        subjectCode: "ENG",
      };
      expect(() => validateSubject(subject)).toThrow(
        "Please validate your input for the subject field"
      );
    });
  });

  describe("invalid subject without subjectCode", () => {
    it("should throw any error", () => {
      const subject = {
        name: "English",
      };
      expect(() => validateSubject(subject)).toThrow(
        "Please validate your input for the subject field"
      );
    });
  });

  describe("student without name", () => {
    it("should throw an error", () => {
      const student = {
        email: "Teacher1@gmail.com",
      };

      const arrstudent = [
        {
          name: "Student 1",
          email: "student@gmail.com",
        },
        {
          email: "student@gmail.com",
        },
      ];

      expect(() => validateStudent(student)).toThrow(
        "Please validate your input for the student field"
      );

      expect(() => validateStudent(arrstudent)).toThrow(
        "Please validate your input for the student field"
      );
    });
  });

  describe("student without email", () => {
    it("should throw an error", () => {
      const student = {
        name: "Student 1",
      };

      const arrStudent = [
        {
          name: "Student 1",
        },
        {
          name: "Student 2",
          email: "Student@gmail.com",
        },
      ];

      expect(() => validateStudent(student)).toThrow(
        "Please validate your input for the student field"
      );
      expect(() => validateStudent(arrStudent)).toThrow(
        "Please validate your input for the student field"
      );
    });
  });

  describe("student without valid email", () => {
    it("should not throw an error", () => {
      const student = {
        name: "Student 1",
        email: "student@@@@.com",
      };
      expect(() => validateStudent(student)).toThrow(
        "Please validate your input for the student field"
      );
    });
  });
});
