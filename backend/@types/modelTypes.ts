export interface ITeacher {
  name?: string;
  email?: string;
}

export interface IStudent {
  name?: string;
  email?: string;
}

export interface ISubject {
  subjectCode?: string;
  name?: string;
}

export interface IClass {
  classCode?: string;
  name?: string;
}

export interface IBody {
  teacher: ITeacher | ITeacher[];
  students: IStudent | IStudent[];
  subject: ISubject;
  class: IClass;
}
