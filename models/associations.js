import { Book } from "./Book.js";
import { Author } from "./Author.js";

Author.hasMany(Book, { foreignKey: "authorID" });
Book.belongsTo(Author, { foreignKey: "authorID" });
