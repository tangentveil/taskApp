import { Box, Button, Checkbox, Container, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getTasks,
  updateTask,
} from "../../features/Tasks/taskSlice";
import { openModal } from "../../features/modal/modalSlice.js";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({ _id, title, description, status }) => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.tasks?.isLoading);
  const taskId = _id;

  const handleStatusChange = () => {
    const updatedStatus = status === "completed" ? "in progress" : "completed";
    dispatch(
      updateTask({
        taskId,
        updateData: { title, description, status: updatedStatus },
      })
    );
  };

  return (
    <Container
      sx={{
        margin: "5px 0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        borderLeft:
          status === "in progress"
            ? "8px solid orange"
            : status === "completed"
            ? "8px solid green"
            : "8px solid #ccc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={status === "completed"}
          onChange={handleStatusChange}
        />
        <Box
          sx={{
            flexGrow: 1,
            textDecoration: status === "completed" ? "line-through" : "none",
            color: status === "completed" ? "gray" : "inherit",
          }}
        >
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            marginLeft: "auto",
            marginRight: "0px",
            textTransform: "uppercase",
            color: status === "in progress" ? "orange" : "green",
          }}
        >
          {status}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        // mt={1}
      >
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            textDecoration: status === "completed" ? "line-through" : "none",
            color: status === "completed" ? "gray" : "inherit",
            marginLeft: 5,
          }}
        >
          {description}
        </Typography>

        <Box>
          {status !== "completed" && (
            <EditNoteIcon
              onClick={() => dispatch(openModal({_id, title, description }))}
              sx={{ color: "green", paddingRight: "12px", cursor: "pointer" }}
            />
          )}

          <DeleteIcon
            onClick={() => dispatch(deleteTask(taskId))}
            sx={{ color: "red", cursor: "pointer" }}
            disabled={loading}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Task;
