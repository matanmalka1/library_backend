import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Customer } from "../models/Customer.js";
import { verifyToken } from "../helpers/authMiddleware.js";
import { validateCustomer } from "../helpers/validation.js";

export const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    // Validate input
    const errors = validateCustomer(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const customer = await Customer.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password, ...safeCustomer } = customer.toJSON();
    return res.status(201).json(safeCustomer);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const customer = await Customer.findOne({
      where: { email: req.body.email },
    });
    if (!customer)
      return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(req.body.password, customer.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: customer.customerID, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* GET ALL */
router.get("/", verifyToken, async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.json(customers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* GET ONE */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json(customer);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* UPDATE */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    // Validate input for updates
    const errors = validateCustomer(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    const [updatedCount] = await Customer.update(req.body, {
      where: { customerID: req.params.id },
    });

    if (!updatedCount) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json({ message: "Customer updated successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

/* DELETE */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedCount = await Customer.destroy({
      where: { customerID: req.params.id },
    });

    if (!deletedCount) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
