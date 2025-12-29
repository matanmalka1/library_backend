import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Book } from "./Book.js";
import { Customer } from "./Customer.js";

export const Loans = sequelize.define("Loans", {
  LoanID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

Book.hasMany(Loans, { foreignKey: "bookID" });
Loans.belongsTo(Book, { foreignKey: "bookID" });

Customer.hasMany(Loans, { foreignKey: "customerID" });
Loans.belongsTo(Customer, { foreignKey: "customerID" });
