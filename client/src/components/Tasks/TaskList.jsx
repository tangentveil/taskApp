import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";

import Task from "./Task";

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const loading = useSelector((store) => store.tasks?.isLoading);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;

    return task.status === filter;
  });

  const handleChange = (status) => {
    setFilter(status);
  };

  if (loading) {
    return (
      <Paper elevation={8}>
        <Container maxWidth="md" style={{ padding: "20px" }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4">Loading...</Typography>
          </Box>
        </Container>
      </Paper>
    );
  }

  return (
    <Paper elevation={8} style={{ borderRadius: "8px" }}>
      <Container maxWidth="md" style={{ padding: "20px" }}>
        <Box mb={1}>
          <Button
            variant="text"
            color="primary"
            style={{
              backgroundColor: filter === "all" ? "#e0f7fa" : "transparent",
            }}
            onClick={() => handleChange("all")}
          >
            All
          </Button>
          <Button
            variant="text"
            color="warning"
            style={{
              backgroundColor:
                filter === "in progress" ? "#ffecb3" : "transparent",
            }}
            onClick={() => handleChange("in progress")}
          >
            In Progress
          </Button>
          <Button
            variant="text"
            color="success"
            style={{
              backgroundColor:
                filter === "completed" ? "#c8e6c9" : "transparent",
            }}
            onClick={() => handleChange("completed")}
          >
            Completed
          </Button>
        </Box>

        {filteredTasks.length < 1 && (
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              {filter === "all" && "Create Your First Task"}
            </Typography>

            <Typography variant="h5">
              {filter === "in progress" && "No Task In Progress"}
            </Typography>

            <Typography variant="h5">
              {filter === "completed" && "No Task Completed!"}
            </Typography>
          </Box>
        )}

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            overflowY: "auto",
            maxHeight: "480px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none" /* IE and Edge */,
            "scrollbar-width": "none" /* Firefox */,
          }}
        >
          {filteredTasks.map((task) => (
            <Task key={task._id} {...task} />
          ))}
        </Box>
      </Container>
    </Paper>
  );
};

export default TaskList;
