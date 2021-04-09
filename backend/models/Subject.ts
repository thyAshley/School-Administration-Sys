import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database";
class Subjects extends Model {
  public id: number;
  public name: string;
  public subjectCode: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subjects.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    subjectCode: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "subjects",
    sequelize,
  }
);

export default Subjects;
