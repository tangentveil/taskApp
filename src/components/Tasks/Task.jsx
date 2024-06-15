import { Box, Button, Checkbox, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearTaskError, deleteTask, statusChange, updateTask } from "../../features/Tasks/taskSlice";
import { openModal } from "../../features/modal/modalSlice.js";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const Task = ({ _id, title, description, status }) => {
  const dispatch = useDispatch();
  const {isTaskCompleted, isTaskDeleted} = useSelector((store) => store.tasks);
  const taskId = _id;

  const handleStatusChange = () => {
    dispatch(clearTaskError());

    const updatedStatus = status === "completed" ? "in progress" : "completed";
    dispatch(
      updateTask({
        taskId,
        updateData: { title, description, status: updatedStatus },
      })
    );

    dispatch(statusChange(updatedStatus));
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
              onClick={() => dispatch(openModal({ _id, title, description }))}
              sx={{ color: "green", paddingRight: "12px", cursor: "pointer" }}
            />
          )}

          <DeleteIcon
            onClick={() => {
              dispatch(deleteTask(taskId))
              dispatch(clearTaskError());
            }}
            sx={{ color: "red", cursor: "pointer" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Task;
