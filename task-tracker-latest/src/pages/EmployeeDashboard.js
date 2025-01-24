import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import TaskTable from "../components/TaskTable"; // Assuming you already have TaskTable component

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Form fields state
  const [newTask, setNewTask] = useState({
    client: "",
    issue: "",
    employee: "",
    status: "pending",
    billing: "yes",
    date: "",
  });

  // Fetch tasks, clients, and employees from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await axios.get("http://192.168.1.5:5000/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(taskResponse.data);

        const clientResponse = await axios.get("http://192.168.1.5:5000/clients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClients(clientResponse.data);

        const employeeResponse = await axios.get("http://192.168.1.5:5000/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmployees(employeeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.1.5:5000/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks([...tasks, response.data]);
      setNewTask({
        client: "",
        issue: "",
        employee: "",
        status: "pending",
        billing: "yes",
        date: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <Box sx={{ border: "1px solid #ccc", padding: 3, borderRadius: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add Task
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Issue"
                name="issue"
                value={newTask.issue}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Client</InputLabel>
                <Select
                  name="client"
                  value={newTask.client}
                  onChange={handleInputChange}
                >
                  {clients.map((client) => (
                    <MenuItem key={client._id} value={client.name}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Employee</InputLabel>
                <Select
                  name="employee"
                  value={newTask.employee}
                  onChange={handleInputChange}
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee._id} value={employee.name}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Billing</InputLabel>
                <Select
                  name="billing"
                  value={newTask.billing}
                  onChange={handleInputChange}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="maybe">Maybe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Date"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Task
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>

      {/* Task Table */}
      <TaskTable tasks={tasks} setTasks={setTasks} userType="employee" />
    </div>
  );
};

export default EmployeeDashboard;
