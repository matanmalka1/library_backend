import express from "express";
import { Loans } from "../models/Loans.js";
import { Book } from "../models/Book.js";
import { Customer } from "../models/Customer.js";
import { verifyToken } from "../helpers/authMiddleware.js";

export const router = express.Router();

/* CREATE LOAN */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { bookID, customerID } = req.body;

    if (!bookID || !customerID) {
      return res
        .status(400)
        .json({ error: "bookID and customerID are required" });
    }

    const loan = await Loans.create({ bookID, customerID });
    return res.status(201).json(loan);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* GET ALL LOANS */
router.get("/", verifyToken, async (req, res) => {
  try {
    const loans = await Loans.findAll({
      include: [
        {
          model: Book,
          attributes: ["bookID", "bookName", "authorName"],
        },
        {
          model: Customer,
          attributes: ["customerID", "firstName", "lastName", "email"],
        },
      ],
    });
    return res.json(loans);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* GET ONE LOAN */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const loan = await Loans.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          attributes: ["bookID", "bookName", "authorName"],
        },
        {
          model: Customer,
          attributes: ["customerID", "firstName", "lastName", "email"],
        },
      ],
    });

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    return res.json(loan);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* DELETE LOAN */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Loans.destroy({
      where: { LoanID: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Loan not found" });
    }

    return res.json({ message: "Loan deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
