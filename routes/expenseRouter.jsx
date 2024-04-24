const express = require("express");
const router = express.Router();
const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../Controllers/expenseController");

// Test routes for CRUD operations
router.post("/expenses", createExpense); // Create a new expense
router.get("/expenses", getAllExpenses); // Get all expenses
router.get("/expenses/:id", getExpenseById); // Get an expense by ID
router.put("/expenses/:id", updateExpense); // Update an expense by ID
router.delete("/expenses/:id", deleteExpense); // Delete an expense by ID

module.exports = router;
