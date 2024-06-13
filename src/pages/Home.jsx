import { Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Layout/Navbar";
import TaskForm from "../components/Tasks/TaskForm";
import TaskList from "../components/Tasks/TaskList";

import { getTasks } from "../features/Tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EditFormModal from "../components/Layout/EditFormModal";
import { currentUser } from "../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((store) => store.auth?.user?._id);
  const isAuthenticated = useSelector((store) => store.auth?.token);

  const tasks = useSelector((store) => store.tasks.tasks);
  const { isOpen } = useSelector((store) => store.modal);
  // const tasks = [];

  // console.log(userId)

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getTasks(userId));
  }, [userId, dispatch]);

  // const tasks = useSelector((store) => store.tasks);

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
