import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Auth from "./components/Auth/Auth";
import { currentUser } from "./features/Auth/authSlice";

function App() {
  const isAuthenticated = useSelector((store) => store.auth?.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Auth />} />
        {isAuthenticated && <Route path="/home" element={<Home />} />}
      </Routes>
    </main>
  );
}

export default App;
