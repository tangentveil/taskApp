import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currentUser, logout } from "./features/Auth/authSlice";

function App() {
  const isAuthenticated = useSelector((store) => store.auth?.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    const token = isAuthenticated;

    if (token) {
      const decodeToken = jwtDecode(token);

      if (decodeToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
        navigate("/");
      } else {
        dispatch(currentUser());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // console.log(isAuthenticated)

  return (
    <main className="container">
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Auth />} />
        {isAuthenticated && <Route path="/home" element={<Home />} />}
      </Routes>
    </main>
  );
}

export default App;
