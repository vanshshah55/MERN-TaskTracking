import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
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
    date: new Date().toISOString().split("T")[0],
  });

  // Fetch tasks, clients, and employees from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await axios.get("http://localhost:5000/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(taskResponse.data);

        const clientResponse = await axios.get(
          "http://localhost:5000/clients",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClients(clientResponse.data);

        const employeeResponse = await axios.get(
          "http://localhost:5000/employees",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
      const response = await axios.post("http://localhost:5000/tasks", newTask, {
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
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom color="primary" align="center">
        Task Dashboard
      </Typography>

      {/* Add Task Form */}
      <Card sx={{ marginBottom: "20px", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="textSecondary">
            Add New Task
          </Typography>
          <form onSubmit={handleAddTask}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Issue"
                  name="issue"
                  value={newTask.issue}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Client</InputLabel>
                  <Select
                    name="client"
                    value={newTask.client}
                    onChange={handleInputChange}
                    label="Client"
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
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Employee</InputLabel>
                  <Select
                    name="employee"
                    value={newTask.employee}
                    onChange={handleInputChange}
                    label="Employee"
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
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Billing</InputLabel>
                  <Select
                    name="billing"
                    value={newTask.billing}
                    onChange={handleInputChange}
                    label="Billing"
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="maybe">Maybe</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="Date"
                  name="date"
                  value={newTask.date}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ padding: "10px" }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Task Table */}
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="textSecondary">
            Tasks List
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <TaskTable tasks={tasks} setTasks={setTasks} userType="employee" />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeDashboard;
