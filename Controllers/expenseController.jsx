const pool = require("../db"); // Assuming you have a database connection pool set up

// Controller function to create a new expense
const createExpense = async (req, res) => {
  try {
    // Extract expense data from the request body
    const {
      name,
      department_id,
      total_amount,
      paid_by,
      total_tax_amount,
      expense_date,
    } = req.body;

    // Insert the expense data into the database
    const newExpense = await pool.query(
      "INSERT INTO hr_expense_sheet (name, department_id, total_amount, paid_by, total_tax_amount, expense_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        name,
        department_id,
        total_amount,
        paid_by,
        total_tax_amount,
        expense_date,
      ]
    );

    res.status(201).json(newExpense.rows[0]); // Return the newly created expense
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Failed to create expense" });
  }
};

// Controller function to get all expenses
const getAllExpenses = async (req, res) => {
  try {
    // Fetch all expenses from the database
    const expenses = await pool.query("SELECT * FROM hr_expense_sheet");
    res.json(expenses.rows); // Return the list of expenses
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

// Controller function to get an expense by ID
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the expense with the specified ID from the database
    const expense = await pool.query(
      "SELECT * FROM hr_expense_sheet WHERE id = $1",
      [id]
    );
    if (expense.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense.rows[0]); // Return the expense
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};

// Controller function to update an expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    // Extract updated expense data from the request body
    const {
      name,
      department_id,
      total_amount,
      paid_by,
      total_tax_amount,
      expense_date,
    } = req.body;

    // Update the expense in the database
    const updatedExpense = await pool.query(
      "UPDATE hr_expense_sheet SET name = $1, department_id = $2, total_amount = $3, paid_by = $4, total_tax_amount = $5, expense_date = $6 WHERE id = $7 RETURNING *",
      [
        name,
        department_id,
        total_amount,
        paid_by,
        total_tax_amount,
        expense_date,
        id,
      ]
    );

    if (updatedExpense.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updatedExpense.rows[0]); // Return the updated expense
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
};

// Controller function to delete an expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the expense with the specified ID from the database
    const deletedExpense = await pool.query(
      "DELETE FROM hr_expense_sheet WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedExpense.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
