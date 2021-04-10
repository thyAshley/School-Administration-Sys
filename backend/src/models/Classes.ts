import { ISubject } from "modelTypes";
import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasOneSetAssociationMixin,
  Model,
} from "sequelize";

// 1. A teacher can teach in multiple classes.
// 2. A teacher can teach multiple subjects, regardless to the same or different class.
// 3. 2 different teachers can teach the same subject in the same class.
// 4. A student can be in multiple classes.

import sequelize from "../config/database";
import Students from "./Student";
import Subjects from "./Subject";
import Teachers from "./Teacher";

class Classes extends Model {
  public id: number;
  public name: string;
  public classCode: string;
  public SubjectId: number;

  public getTeachers: HasManyGetAssociationsMixin<Teachers>;
  public addTeachers: HasManyAddAssociationMixin<Teachers, Teachers>;
  public removeTeachers: HasManyRemoveAssociationsMixin<Teachers, Teachers>;

  public getStudents: HasManyGetAssociationsMixin<Students>;
  public addStudents: HasManyAddAssociationMixin<Students, Students>;
  public removeStudents: HasManyRemoveAssociationsMixin<Students, Students>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Classes.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    classCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "classes",
    sequelize,
  }
);

Classes.belongsTo(Subjects);
Subjects.hasMany(Classes);

Students.belongsToMany(Classes, {
  through: "StudentClasses",
  as: "Classes",
  foreignKey: "student_id",
});

Classes.belongsToMany(Students, {
  through: "StudentClasses",
  as: "Students",
  foreignKey: "classes_id",
});

Teachers.belongsToMany(Classes, {
  through: "TeacherClasses",
  as: "Classes",
  foreignKey: "teacher_id",
});
Classes.belongsToMany(Teachers, {
  through: "TeacherClasses",
  as: "Teachers",
  foreignKey: "classes_id",
});

export default Classes;
