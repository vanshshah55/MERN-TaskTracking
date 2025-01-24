const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/tasks');
const clientRoutes = require('./routes/clients');
const employeeRoutes = require('./routes/employees');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://192.168.1.5:27017/task-tracker-latest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/tasks', taskRoutes);
app.use('/clients', clientRoutes);
app.use('/employees', employeeRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
