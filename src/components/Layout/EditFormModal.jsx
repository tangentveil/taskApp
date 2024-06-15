import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  Container,
  TextField,
  Typography,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@mui/material";

import { closeModal } from "../../features/modal/modalSlice.js";
import { clearTaskError, updateTask } from "../../features/Tasks/taskSlice.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const EditFormModal = () => {
  const dispatch = useDispatch();
  const { isOpen, taskData } = useSelector((store) => store.modal);

  const [title, setTitle] = useState(taskData?.title);
  const [description, setDescription] = useState(taskData?.description);
  const taskId = taskData._id;
  const { isLoading } = useSelector((store) => store.tasks);

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

    dispatch(updateTask({ taskId, updateData: { title, description } }));
    dispatch(closeModal());
  };

  return (
    <Container maxWidth="xs">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              EDIT TASK
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                size="small"
                name="title"
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                size="small"
                name="description"
                label="Description"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                style={{ marginTop: "10px", borderRadius: "8px" }}
                disabled={isLoading}
              >
                Edit Task
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default EditFormModal;
