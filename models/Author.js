import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Author = sequelize.define("Author", {
  AuthorID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
});
