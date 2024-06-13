import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice.js";
import { getTasks, updateTask } from "../../features/Tasks/taskSlice.js";
import { useState } from "react";
import { toast } from "react-toastify";

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

  // const userData = localStorage.getItem("user");
  // const userId = JSON.parse(userData).user._id;

  const [title, setTitle] = useState(taskData?.title);
  const [description, setDescription] = useState(taskData?.description);
  const taskId = taskData._id;
  const loading = useSelector((store) => store.tasks?.isLoading);

  console.log(taskId)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === taskData.title) {
      toast.warn("Please Update the Title");
      return;
    }

    if (description === taskData.description) {
      toast.warn("Please Update the Description");
      return;
    }

    if (!title) {
      toast.warn("Please Enter the Title");
      return;
    }

    if (!description) {
      toast.warn("Please Enter the Description");
      return;
    }

    dispatch(updateTask({ taskId, updateData: { title, description } }));
     if(!loading) dispatch(closeModal());
    // dispatch(getTasks(userId));
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
                disabled={loading}
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
