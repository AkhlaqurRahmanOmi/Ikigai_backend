const express = require("express");
const connectToDatabase = require("./db");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to handle employee data insertion
app.post("/employees", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      department,
      position,
      hire_date,
      salary,
      hourly_rate,
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !hire_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Connect to the database
    const { client, release } = await connectToDatabase();

    // SQL query to insert employee data into the database
    const query =
      "INSERT INTO employees (first_name, last_name, email, department, position, hire_date, salary, hourly_rate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

    // Execute the query with employee data as parameters
    await client.query(query, [
      first_name,
      last_name,
      email,
      department,
      position,
      hire_date,
      salary,
      hourly_rate,
    ]);

    // Release the database connection
    release();

    // Send success response
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
