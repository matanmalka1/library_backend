import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import { router as customerRoutes } from "./routes/customer.js";
import { router as bookRoutes } from "./routes/book.js";
import { router as authorRoutes } from "./routes/author.js";
import { router as loanRoutes } from "./routes/loans.js";

dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is required");
  console.error("Please add JWT_SECRET=your_secret_key to your .env file");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/customers", customerRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/loans", loanRoutes);

const PORT = process.env.PORT || 5000;

// server
app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
});
