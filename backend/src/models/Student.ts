import { DataTypes, HasManyAddAssociationMixin, Model } from "sequelize";

import sequelize from "../config/database";
import Classes from "./Classes";

class Students extends Model {
  public id: number;
  public name: string;
  public email: string;

  public addClasses: HasManyAddAssociationMixin<Classes, Classes>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Students.init(
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
    tableName: "students",
    sequelize,
  }
);

export default Students;
