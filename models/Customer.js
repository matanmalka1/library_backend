import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Customer = sequelize.define("Customer", {
  customerID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  address: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER },
  password: { type: DataTypes.STRING, allowNull: false },
});
