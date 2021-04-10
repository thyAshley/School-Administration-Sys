export const data = {
  validMultiple: {
    teacher: [
      {
        name: "Test",
        email: "testr@test.com",
      },
      {
        name: "Teacher 3",
        email: "teacher3@test.com",
      },
    ],
    students: [
      {
        name: "Student1",
        email: "student1@test.com",
      },
      {
        name: "Student2",
        email: "student2@test.com",
      },
      {
        name: "Student3",
        email: "student3@test.com",
      },
    ],
    subject: {
      subjectCode: "MATH",
      name: "Mathematic",
    },
    class: {
      classCode: "P1-1",
      name: "P1 Integrity",
    },
  },

  validSingle: {
    teacher: {
      name: "Teacher 2",
      email: "tester@test.com",
    },
    students: {
      name: "Student1",
      email: "student1@test.com",
    },

    subject: {
      subjectCode: "MATH",
      name: "Mathematic",
    },
    class: {
      classCode: "P1-1",
      name: "P1 Integrity",
    },
  },
  validSingle2: {
    teacher: {
      name: "Teacher 2",
      email: "tester@test.com",
    },
    students: {
      name: "Student1",
      email: "student1@test.com",
    },

    subject: {
      subjectCode: "ENG",
      name: "English",
    },
    class: {
      classCode: "P1-1",
      name: "P1 Integrity",
    },
  },
  validSingle3: {
    teacher: {
      name: "Teacher 2",
      email: "tester@test.com",
    },
    students: {
      name: "Student1",
      email: "student1@test.com",
    },

    subject: {
      subjectCode: "ENG",
      name: "English",
    },
    class: {
      classCode: "P1-2",
      name: "P1 Integrity",
    },
  },

  invalidMultiple: {
    teacher: [
      {
        email: "testr@test.com",
      },
    ],
    students: [
      {
        name: "Student1",
        email: "student1@test.com",
      },
      {
        name: "Student2",
      },
      {
        name: "Student3",
        email: "student3@test.com",
      },
    ],
    subject: {
      subjectCode: "MATH",
    },
    class: {
      classCode: "P1-1",
    },
  },

  invalidSingle: {
    teacher: {
      email: "Teacher1@test.com",
    },
    students: {
      email: "Student1@test.com",
    },
    subject: {
      subjectCode: "MATH",
    },
    class: {
      classCode: "P1-1",
    },
  },

  invalidSingle2: {
    teacher: {
      name: "Teacher 1",
    },
    students: {
      name: "Student 1",
    },
    subject: {
      name: "Mathematic",
    },
    class: {
      name: "P1 Integrity",
    },
  },
};

export const report = {
  reportSingle: {
    "Teacher 2": [
      {
        subjectCode: "MATH",
        subjectName: "Mathematic",
        numberOfClasses: 1,
      },
    ],
  },
  reportSingle2: {
    "Teacher 2": [
      {
        subjectCode: "MATH",
        subjectName: "Mathematic",
        numberOfClasses: 1,
      },
      {
        subjectCode: "ENG",
        subjectName: "English",
        numberOfClasses: 1,
      },
    ],
  },
  reportSingle3: {
    "Teacher 2": [
      {
        subjectCode: "MATH",
        subjectName: "Mathematic",
        numberOfClasses: 1,
      },
      {
        subjectCode: "ENG",
        subjectName: "English",
        numberOfClasses: 2,
      },
    ],
  },
};
