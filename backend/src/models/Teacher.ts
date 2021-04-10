import { ISubject } from "modelTypes";
import { DataTypes, HasManyAddAssociationMixin, Model } from "sequelize";

import sequelize from "../config/database";
import Classes from "./Classes";
import Subjects from "./Subject";

class Teachers extends Model {
  public id: number;
  public name: string;
  public email: string;

  public addSubject: HasManyAddAssociationMixin<Subjects, Subjects>;
  public addClasses: HasManyAddAssociationMixin<Classes, Classes>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // typing for report only not sure if it is the correct way in sequelize
  public readonly Classes: Teachers[];
  public readonly Subject: ISubject;
}

Teachers.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: "teachers",
    sequelize,
  }
);

export default Teachers;
