import express from "express";
import { Book } from "../models/Book.js";
import { verifyToken } from "../helpers/authMiddleware.js";
import { upload } from "../helpers/multer.js";
import { validateBook } from "../helpers/validation.js";

export const router = express.Router();

/* CREATE (with image upload) */
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const errors = validateBook(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    const book = await Book.create({
      ...req.body,
      image: req.file?.filename || null,
    });
    return res.status(201).json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* READ ALL */
router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* READ ONE */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* UPDATE */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const errors = validateBook(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    const [updatedCount] = await Book.update(req.body, {
      where: { bookID: req.params.id },
    });
    if (!updatedCount) return res.status(404).json({ error: "Book not found" });
    return res.json({ message: "Book updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* DELETE */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { bookID: req.params.id },
    });
    if (!deleted) return res.status(404).json({ error: "Book not found" });
    return res.json({ message: "Book deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
