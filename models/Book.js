import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Book = sequelize.define("Book", {
  bookID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookName: { type: DataTypes.STRING, allowNull: false },
  desc: { type: DataTypes.TEXT },
  authorName: { type: DataTypes.STRING },
  publishDate: { type: DataTypes.DATE },
  pages: { type: DataTypes.INTEGER },
  genre: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING, allowNull: true }, 
});
