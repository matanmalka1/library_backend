import express from "express";
import { Author } from "../models/Author.js";
import { verifyToken } from "../helpers/authMiddleware.js";

export const router = express.Router();

/* CREATE */
router.post("/", verifyToken, async (req, res) => {
  try {
    res.status(201).json(await Author.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* READ ALL*/
router.get("/", async (req, res) => {
  try {
    res.json(await Author.findAll());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* READ ONE*/
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const [updatedCount] = await Author.update(req.body, {
      where: { AuthorID: req.params.id },
    });

    if (!updatedCount) {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.json({ message: "Author updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* DELETE */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedCount = await Author.destroy({
      where: { AuthorID: req.params.id },
    });

    if (!deletedCount) {
      return res.status(404).json({ error: "Author not found" });
    }

    return res.json({ message: "Author deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
