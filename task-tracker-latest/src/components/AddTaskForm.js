import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const AddTaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    date: "",
    client: "",
    issue: "",
    employee: "",
    status: "pending",
    billing: "yes",
  });

  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch client and employee data to populate dropdowns
    const fetchData = async () => {
      try {
        const clientsResponse = await axios.get("https://mern-tasktracking-backend.onrender.com/api/clients");
        const employeesResponse = await axios.get("https://mern-tasktracking-backend.onrender.com/api/employees");
        setClients(clientsResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error("Error fetching clients or employees:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      date: "",
      client: "",
      issue: "",
      employee: "",
      status: "pending",
      billing: "yes",
    }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            name="date"
            value={task.date}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Client</InputLabel>
            <Select
              name="client"
              value={task.client}
              onChange={handleChange}
              fullWidth
              required
            >
              {clients.map((client) => (
                <MenuItem key={client._id} value={client.name}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Issue"
            fullWidth
            name="issue"
            value={task.issue}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Employee</InputLabel>
            <Select
              name="employee"
              value={task.employee}
              onChange={handleChange}
              fullWidth
              required
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee.name}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Billing"
            fullWidth
            select
            name="billing"
            value={task.billing}
            onChange={handleChange}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
            <MenuItem value="maybe">Maybe</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTaskForm;
