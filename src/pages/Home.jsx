import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Layout/Navbar";
import TaskForm from "../components/Tasks/TaskForm";
import TaskList from "../components/Tasks/TaskList";

import {
  clearTaskError,
  getTasks,
  statusChange,
} from "../features/Tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EditFormModal from "../components/Layout/EditFormModal";
import { currentUser, logout } from "../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((store) => store.auth?.user?._id);
  const isAuthenticated = useSelector((store) => store.auth?.token);
  const taskError = useSelector((store) => store.tasks.error);
  const { isTaskCreated, isTaskCompleted, isTaskDeleted, taskProgress } =
    useSelector((store) => store.tasks);

  // console.log(taskError?.error.message);

  const tasks = useSelector((store) => store.tasks.tasks);
  const { isOpen } = useSelector((store) => store.modal);

  // console.log(taskProgress)

  useEffect(() => {
    const token = isAuthenticated;

    if (token) {
      const decodeToken = jwtDecode(token);

      console.log(decodeToken.exp * 1000);
      console.log(new Date().getTime());

      if (decodeToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        navigate("/");
      } else {
        dispatch(currentUser());
      }
    }
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (isTaskCreated) {
      toast.success("Task Created!");
    }

    if (isTaskCompleted) {
      if (taskProgress === "completed") {
        toast.success("Task Completed!");
        dispatch(statusChange(null));
      } else if (taskProgress === "in progress") {
        toast.warn("Task In Progress...");
        dispatch(statusChange(null));
      }
    }

    if (isTaskDeleted) {
      toast.error("Task Deleted!");
    }
  }, [isTaskCreated, isTaskCompleted, isTaskDeleted, taskProgress, dispatch]);

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getTasks(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(currentUser());
      dispatch(getTasks(userId));
    }
  }, [userId, isAuthenticated, navigate, dispatch]);

  // console.log(tasks)

  return (
    <div className="home-container">
      <Navbar />
      {isOpen && <EditFormModal />}
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={5}
        ></Box>

        <Box>
          <TaskForm />
          <TaskList tasks={tasks} />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
