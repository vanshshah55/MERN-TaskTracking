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
  Paper,
  Card,
  Collapse,
  CardContent,
  Divider,
} from "@mui/material";
import TaskTable from "../components/TaskTable";
import * as XLSX from "xlsx";

const OwnerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [filters, setFilters] = useState({
    employee: "",
    client: "",
    billing: "",
    date: "",
    month: "",
  });


  const [newTask, setNewTask] = useState({
    client: "",
    issue: "",
    employee: "",
    status: "pending",
    billing: "yes",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await axios.get("https://mern-tasktracking-backend.onrender.com/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(taskResponse.data);
        setFilteredTasks(taskResponse.data);

        const clientResponse = await axios.get("https://mern-tasktracking-backend.onrender.com/clients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClients(clientResponse.data);

        const employeeResponse = await axios.get("https://mern-tasktracking-backend.onrender.com/employees", {
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

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://mern-tasktracking-backend.onrender.com/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      setFilteredTasks(filteredTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mern-tasktracking-backend.onrender.com/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks([...tasks, response.data]);
      setFilteredTasks([...tasks, response.data]);
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

  const handleDownloadExcel = () => {
    const tasksToExport = tasks.map((task) => ({
      Date: new Date(task.date).toDateString(),
      Client: task.client,
      Issue: task.issue,
      Employee: task.employee,
      Status: task.status,
      Billing: task.billing,
      CompletionDate: task.completionDate
        ? new Date(task.completionDate).toDateString()
        : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(tasksToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
    XLSX.writeFile(workbook, "Tasks.xlsx");
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  useEffect(() => {
    const filterTasks = () => {
      let filtered = tasks;

      if (filters.employee) {
        filtered = filtered.filter((task) => task.employee === filters.employee);
      }
      if (filters.client) {
        filtered = filtered.filter((task) => task.client === filters.client);
      }
      if (filters.billing) {
        filtered = filtered.filter((task) => task.billing === filters.billing);
      }
      if (filters.date) {
        filtered = filtered.filter((task) => task.date === filters.date);
      }
      if (filters.month) {
        filtered = filtered.filter(
          (task) =>
            new Date(task.date).getMonth() + 1 === parseInt(filters.month, 10)
        );
      }

      setFilteredTasks(filtered);
    };

    filterTasks();
  }, [filters, tasks]);


  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#1e88e5",
          fontSize: { xs: "1.8rem", sm: "2.5rem" },
        }}
      >
        Vipul Dashboard
      </Typography>
  
      
      {/* Add Task Form */}
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          marginBottom: 4,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#0d47a1", fontWeight: "bold" }}
        >
          Add New Task
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <form onSubmit={handleAddTask}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Issue"
                name="issue"
                value={newTask.issue}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Client</InputLabel>
                <Select
                  name="client"
                  value={newTask.client}
                  onChange={handleInputChange}
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                  }}
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
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                  }}
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
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                  }}
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
                label="Task Date"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  textTransform: "none",
                  paddingY: 1.5,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>


      {/* Filters Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 4,
          borderRadius: 3,
          backgroundColor: "#f1f1f1",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ color: "#0d47a1" }}>
            Filters
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleFilters}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              paddingX: 2,
              fontWeight: "bold",
            }}
          >
            {isFiltersOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </Box>
        <Collapse in={isFiltersOpen}>
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  name="employee"
                  value={filters.employee}
                  onChange={handleFilterChange}
                  sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                >
                  <MenuItem value="">All</MenuItem>
                {employees.map((employee) => (
                  <MenuItem key={employee._id} value={employee.name}>
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              <Select
                name="client"
                value={filters.client}
                onChange={handleFilterChange}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
                }}
              >
                <MenuItem value="">All</MenuItem>
                {clients.map((client) => (
                  <MenuItem key={client._id} value={client.name}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Billing</InputLabel>
              <Select
                name="billing"
                value={filters.billing}
                onChange={handleFilterChange}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="maybe">Maybe</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="date"
              label="Date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="number"
              label="Month"
              name="month"
              value={filters.month}
              onChange={handleFilterChange}
              fullWidth
              InputProps={{ inputProps: { min: 1, max: 12 } }}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
        </Collapse>
      </Paper>
  
  
      {/* Download Tasks as Excel */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownloadExcel}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Download Tasks as Excel
        </Button>
      </Box>
  
      {/* Task Table */}
      <Card
        elevation={3}
        sx={{
          overflowX: "auto",
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <TaskTable
            tasks={filteredTasks}
            setTasks={setTasks}
            userType="owner"
            deleteTask={deleteTask}
          />
        </CardContent>
      </Card>
    </Box>
 
  
  );
};

export default OwnerDashboard;
