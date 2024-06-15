import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { TextField, Button, Container, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

import { clearTaskError, createTask } from "../../features/Tasks/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth?.user?._id);
  const { isTaskCreating } = useSelector((store) => store.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("in progress");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(clearTaskError());

    if (!title) {
      toast.warn("Please Enter the Title");
      return;
    }

    if (!description) {
      toast.warn("Please Enter the Description");
      return;
    }

    dispatch(createTask({ userId, taskData: { title, description, status } }));
  };

  return (
    <Paper elevation={8} style={{ borderRadius: "8px" }}>
      <Container
        maxWidth="sm"
        style={{ marginBottom: "20px", padding: "20px" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              name="title"
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              style={{ borderRadius: "8px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              size="small"
              name="description"
              label="Description"
              fullWidth
              margin="normal"
              value={description}
              style={{ borderRadius: "8px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={{ marginTop: "10px", borderRadius: "8px" }}
              disabled={isTaskCreating}
            >
              Add Task
            </Button>
          </form>
        </Box>
      </Container>
    </Paper>
  );
};

export default TaskForm;
