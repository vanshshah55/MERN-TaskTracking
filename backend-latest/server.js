require("dotenv").config(); // Load .env variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(bodyParser.json());

// Connect to MongoDB using .env variable
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err));

// Sample users (Move this to a database later)
const users = [
  { username: "Vipul", password: process.env.VIPUL_PASSWORD, userType: "owner" },
  { username: "Guru", password: process.env.GURU_PASSWORD, userType: "employee" },
  { username: "Sagar", password: process.env.SAGAR_PASSWORD, userType: "employee" },
  { username: "Shreyas", password: process.env.SHREYAS_PASSWORD, userType: "employee" },
  { username: "employee", password: process.env.EMPLOYEE_PASSWORD, userType: "employee" },
];

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const currentDateTime = new Date().toLocaleString();

  console.log(`Login attempt - Username: ${username}, Time: ${currentDateTime}`);

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    console.log(`[${currentDateTime}] ✅ User logged in: ${username}`);
    res.status(200).json({ success: true, userType: user.userType });
  } else {
    console.log(`[${currentDateTime}] ❌ Invalid login attempt for Username: ${username}`);
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
});

// Import routes
const taskRoutes = require("./routes/tasks");
const clientRoutes = require("./routes/clients");
const employeeRoutes = require("./routes/employees");

app.use("/tasks", taskRoutes);
app.use("/clients", clientRoutes);
app.use("/employees", employeeRoutes);

// Start server using .env PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
