import bcrypt from "bcrypt";
import { sequelize } from "./db.js";
import { Author } from "./models/Author.js";
import { Book } from "./models/Book.js";
import { Customer } from "./models/Customer.js";
import { Loans } from "./models/Loans.js";
import "./models/associations.js";

const targetCounts = {
  authors: 50,
  books: 50,
  customers: 50,
  loans: 50,
};

const firstNames = [
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
  "James",
  "William",
  "Benjamin",
  "Lucas",
  "Henry",
  "Theodore",
  "Emma",
  "Olivia",
  "Ava",
  "Sophia",
  "Isabella",
  "Mia",
  "Charlotte",
  "Amelia",
  "Harper",
  "Evelyn",
  "Mason",
  "Logan",
  "Ethan",
  "Jacob",
  "Michael",
  "Daniel",
  "Sebastian",
  "Jack",
  "Aiden",
  "Grace",
  "Chloe",
  "Lily",
  "Zoe",
  "Hannah",
  "Natalie",
  "Leah",
  "Madison",
  "Brooklyn",
  "Ella",
  "Aria",
];

const lastNames = [
  "Carter",
  "Mitchell",
  "Reed",
  "Bennett",
  "Hayes",
  "Cooper",
  "Morgan",
  "Parker",
  "Turner",
  "Brooks",
  "Collins",
  "Murphy",
  "Hughes",
  "Ward",
  "Peterson",
  "Foster",
  "Coleman",
  "Simmons",
  "Bell",
  "Howard",
  "Sanders",
  "Price",
  "Powell",
  "Sullivan",
  "Wood",
  "Barnes",
  "Ross",
  "Henderson",
  "Jenkins",
  "Watson",
  "Murray",
  "Butler",
  "Fisher",
  "Harrison",
  "Gibson",
  "Bailey",
  "Richardson",
  "Wallace",
  "Stone",
  "Grant",
];

const streetNames = [
  "Maple",
  "Oak",
  "Pine",
  "Cedar",
  "Willow",
  "Birch",
  "Elm",
  "Walnut",
  "Cherry",
  "Aspen",
  "Sycamore",
  "Magnolia",
  "Poplar",
  "Hawthorn",
  "Juniper",
  "Spruce",
  "Laurel",
  "Ridge",
  "Meadow",
  "Brook",
  "River",
  "Sunset",
  "Highland",
  "Park",
  "Center",
  "Lake",
  "Hill",
  "Forest",
  "Valley",
  "Grove",
];

const streetTypes = ["St", "Ave", "Rd", "Blvd", "Ln", "Dr", "Ct", "Way", "Pl", "Ter"];

const cities = [
  "Riverton",
  "Lakeside",
  "Brookfield",
  "Fairview",
  "Oakridge",
  "Highland",
  "Crestview",
  "Meadowbrook",
  "Mapleton",
  "Kingsport",
  "Ashford",
  "Cedar Grove",
  "Northgate",
  "Silverton",
  "Stonehaven",
  "Westfield",
  "Pinecrest",
  "Greenville",
  "Summit",
  "Fox Hollow",
];

const states = ["CA", "NY", "TX", "FL", "IL", "WA", "CO", "NC", "GA", "AZ", "OR", "MA"];

const titleAdjectives = [
  "Silent",
  "Hidden",
  "Golden",
  "Lost",
  "Crimson",
  "Shifting",
  "Hollow",
  "Midnight",
  "Fading",
  "Bright",
  "Rising",
  "Winding",
  "Distant",
  "Iron",
  "Quiet",
  "Broken",
  "Silver",
  "Still",
  "Wild",
  "Vast",
];

const titleNouns = [
  "Harbor",
  "Valley",
  "Signal",
  "Garden",
  "Crown",
  "Trail",
  "Archive",
  "Frontier",
  "Compass",
  "River",
  "Horizon",
  "Castle",
  "Bridge",
  "Forest",
  "Market",
  "Grove",
  "Station",
  "Coast",
  "Fountain",
  "Library",
];

const bookThemes = [
  "identity",
  "memory",
  "survival",
  "loyalty",
  "redemption",
  "ambition",
  "family ties",
  "secrets",
  "friendship",
  "justice",
  "hope",
  "change",
  "forgiveness",
  "courage",
  "belonging",
];

const bookSettings = [
  "a coastal town",
  "a desert outpost",
  "a mountain valley",
  "a bustling market",
  "a quiet suburb",
  "a historic district",
  "a remote island",
  "a small college",
  "a river port",
  "a winter resort",
];

const genres = [
  "Literary",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Historical Fiction",
  "Romance",
  "Thriller",
  "Adventure",
  "Drama",
  "Contemporary",
];

const normalize = (value) => value.toLowerCase().replace(/[^a-z]/g, "");
const makeEmail = (first, last, suffix = "") =>
  `${normalize(first)}.${normalize(last)}${suffix}@example.com`;

const pad2 = (value) => String(value).padStart(2, "0");
const makePublishDate = (index) => {
  const year = 1990 + (index % 30);
  const month = (index % 12) + 1;
  const day = (index % 28) + 1;
  return `${year}-${pad2(month)}-${pad2(day)}`;
};

const makeName = (index, offset = 0) => {
  const first = firstNames[(index + offset) % firstNames.length];
  const last = lastNames[(index * 3 + offset) % lastNames.length];
  return { first, last };
};

const makeAddress = (index) => {
  const number = 100 + ((index * 37) % 9000);
  const street = `${streetNames[index % streetNames.length]} ${
    streetTypes[(index * 7) % streetTypes.length]
  }`;
  const city = cities[(index * 5) % cities.length];
  const state = states[(index * 11) % states.length];
  const zip = String(10000 + ((index * 97) % 90000)).padStart(5, "0");
  return `${number} ${street}, ${city}, ${state} ${zip}`;
};

const makeBookTitle = (index) => {
  const adjective = titleAdjectives[index % titleAdjectives.length];
  const noun =
    titleNouns[Math.floor(index / titleAdjectives.length) % titleNouns.length];
  return `The ${adjective} ${noun}`;
};

const baseAuthorsData = [
  {
    firstName: "Lena",
    lastName: "Hart",
    email: "lena.hart@example.com",
  },
  {
    firstName: "Miles",
    lastName: "Carter",
    email: "miles.carter@example.com",
  },
  {
    firstName: "Nora",
    lastName: "Wells",
    email: "nora.wells@example.com",
  },
];

const baseBooksData = [
  {
    bookName: "Paper Roads",
    authorEmail: "lena.hart@example.com",
    desc: "A road trip story about siblings rebuilding trust.",
    publishDate: "2012-03-14",
    pages: 312,
    genre: "Literary",
  },
  {
    bookName: "Copper Fields",
    authorEmail: "miles.carter@example.com",
    desc: "A small-town mystery rooted in old farming secrets.",
    publishDate: "2016-09-02",
    pages: 368,
    genre: "Mystery",
  },
  {
    bookName: "Glass Tide",
    authorEmail: "nora.wells@example.com",
    desc: "A coastal drama about loss and renewal.",
    publishDate: "2010-05-21",
    pages: 295,
    genre: "Drama",
  },
  {
    bookName: "Stone Orchard",
    authorEmail: "miles.carter@example.com",
    desc: "A fantasy tale of a hidden grove and a broken pact.",
    publishDate: "2018-11-07",
    pages: 422,
    genre: "Fantasy",
  },
  {
    bookName: "Amber Street",
    authorEmail: "lena.hart@example.com",
    desc: "A romance set around a lively neighborhood market.",
    publishDate: "2014-02-18",
    pages: 276,
    genre: "Romance",
  },
];

const baseCustomersData = [
  {
    firstName: "Harper",
    lastName: "Stone",
    email: "harper.stone@example.com",
    address: "215 Willow Ln, Riverton, CA 91012",
    age: 28,
    password: "harper2024",
  },
  {
    firstName: "Evan",
    lastName: "Brooks",
    email: "evan.brooks@example.com",
    address: "418 Oakridge Ave, Brookfield, NY 11718",
    age: 35,
    password: "evan2024",
  },
  {
    firstName: "Isla",
    lastName: "Grant",
    email: "isla.grant@example.com",
    address: "902 Meadow Dr, Fairview, TX 75024",
    age: 24,
    password: "isla2024",
  },
];

const baseLoansData = [
  {
    bookName: "Paper Roads",
    customerEmail: "harper.stone@example.com",
  },
  {
    bookName: "Copper Fields",
    customerEmail: "evan.brooks@example.com",
  },
  {
    bookName: "Glass Tide",
    customerEmail: "isla.grant@example.com",
  },
  {
    bookName: "Amber Street",
    customerEmail: "harper.stone@example.com",
  },
];

const authorsData = [
  ...baseAuthorsData,
  ...Array.from(
    { length: Math.max(0, targetCounts.authors - baseAuthorsData.length) },
    (_, index) => {
      const id = index + 1;
      const { first, last } = makeName(index, 7);
      return {
        firstName: first,
        lastName: last,
        email: makeEmail(first, last, id),
      };
    }
  ),
];

const customersData = [
  ...baseCustomersData,
  ...Array.from(
    { length: Math.max(0, targetCounts.customers - baseCustomersData.length) },
    (_, index) => {
      const id = index + 1;
      const { first, last } = makeName(index, 19);
      return {
        firstName: first,
        lastName: last,
        email: makeEmail(first, last, id),
        address: makeAddress(index),
        age: 18 + ((index * 3) % 55),
        password: `password${id}`,
      };
    }
  ),
];

const booksData = [
  ...baseBooksData,
  ...Array.from(
    { length: Math.max(0, targetCounts.books - baseBooksData.length) },
    (_, index) => {
      const author =
        authorsData[(index + baseBooksData.length) % authorsData.length];
      const genre = genres[index % genres.length];
      const theme = bookThemes[index % bookThemes.length];
      const setting = bookSettings[index % bookSettings.length];
      return {
        bookName: makeBookTitle(index),
        authorEmail: author.email,
        desc: `A ${genre.toLowerCase()} story about ${theme} set in ${setting}.`,
        publishDate: makePublishDate(index),
        pages: 180 + ((index * 13) % 360),
        genre,
      };
    }
  ),
];

const loansData = (() => {
  const loans = [];
  const loanKeys = new Set();

  const addLoan = (bookName, customerEmail) => {
    const key = `${bookName}::${customerEmail}`;
    if (loanKeys.has(key)) {
      return;
    }
    loanKeys.add(key);
    loans.push({ bookName, customerEmail });
  };

  for (const loan of baseLoansData) {
    addLoan(loan.bookName, loan.customerEmail);
  }

  let index = 0;
  while (loans.length < targetCounts.loans) {
    const book = booksData[index % booksData.length];
    const customer = customersData[(index * 7) % customersData.length];
    addLoan(book.bookName, customer.email);
    index += 1;
  }

  return loans;
})();

const seed = async () => {
  const shouldForce = process.argv.includes("--force");
  await sequelize.sync({ force: shouldForce });
  const queryInterface = sequelize.getQueryInterface();
  const bookTableName = Book.getTableName();
  const resolvedBookTableName =
    typeof bookTableName === "string" ? bookTableName : bookTableName.tableName;
  const bookTable = await queryInterface.describeTable(resolvedBookTableName);
  const hasAuthorId = Boolean(bookTable.authorID);
  const bookQueryOptions = hasAuthorId
    ? {}
    : { attributes: { exclude: ["authorID"] } };

  const authorsByEmail = new Map();
  for (const author of authorsData) {
    const [record] = await Author.findOrCreate({
      where: { email: author.email },
      defaults: author,
    });
    authorsByEmail.set(record.email, record);
  }

  for (const book of booksData) {
    const author = authorsByEmail.get(book.authorEmail);
    if (!author) {
      throw new Error(`Missing author for book: ${book.bookName}`);
    }

    const payload = {
      bookName: book.bookName,
      desc: book.desc,
      authorName: `${author.firstName} ${author.lastName}`,
      publishDate: book.publishDate,
      pages: book.pages,
      genre: book.genre,
    };
    if (hasAuthorId) {
      payload.authorID = author.AuthorID;
    }

    await Book.findOrCreate({
      where: { bookName: payload.bookName },
      defaults: payload,
      ...bookQueryOptions,
    });
  }

  const customersByEmail = new Map();
  for (const customer of customersData) {
    const hashedPassword = await bcrypt.hash(customer.password, 10);
    const [record] = await Customer.findOrCreate({
      where: { email: customer.email },
      defaults: {
        ...customer,
        password: hashedPassword,
      },
    });
    customersByEmail.set(record.email, record);
  }

  const books = await Book.findAll(bookQueryOptions);
  const booksByName = new Map(books.map((book) => [book.bookName, book]));

  for (const loan of loansData) {
    const book = booksByName.get(loan.bookName);
    const customer = customersByEmail.get(loan.customerEmail);
    if (!book || !customer) {
      throw new Error(
        `Missing book or customer for loan: ${loan.bookName} -> ${loan.customerEmail}`
      );
    }

    await Loans.findOrCreate({
      where: {
        bookID: book.bookID,
        customerID: customer.customerID,
      },
      defaults: {
        bookID: book.bookID,
        customerID: customer.customerID,
      },
    });
  }

  console.log("Seed complete.");
};

const run = async () => {
  try {
    await seed();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

run();
