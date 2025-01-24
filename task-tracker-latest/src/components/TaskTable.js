import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Checkbox,
} from "@mui/material";
import axios from "axios";

const TaskTable = ({ tasks, setTasks, userType, deleteTask }) => {
  // Format dates to be more readable
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  

  // Handle status toggle and set completion date
  const handleStatusChange = async (taskId, currentStatus) => {
    const updatedStatus = currentStatus === "pending" ? "completed" : "pending";
    const updatedTask = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            status: updatedStatus,
            completionDate:
              updatedStatus === "completed" ? new Date().toISOString() : null,
          }
        : task
    );

    setTasks(updatedTask); // Update state

    // Send update request to backend
    try {
      await axios.put(`http://192.168.1.5:5000/tasks/${taskId}`, {
        status: updatedStatus,
        completionDate:
          updatedStatus === "completed" ? new Date().toISOString() : null, // Ensure ISO format
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Client</TableCell>
          <TableCell>Issue</TableCell>
          <TableCell>Employee</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Billing</TableCell>
          <TableCell>Completion Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task._id}
            style={{
              textDecoration: task.status === "completed" ? "line-through" : "none",
            }}
          >
            <TableCell>{formatDate(task.date)}</TableCell>
            <TableCell>{task.client}</TableCell>
            <TableCell>{task.issue}</TableCell>
            <TableCell>{task.employee}</TableCell>
            <TableCell>
              <Checkbox
                checked={task.status === "completed"}
                onChange={() => handleStatusChange(task._id, task.status)}
              />
            </TableCell>
            <TableCell>{task.billing}</TableCell>
            <TableCell>{formatDate(task.completionDate)}</TableCell>
            <TableCell>
              {userType === "owner" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
