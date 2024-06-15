import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, login, signup } from "../../features/Auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import "./Auth.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((store) => store.auth?.token);
  const loading = useSelector((store) => store.auth.isLoading);
  const authError = useSelector((store) => store.auth?.error);

  useEffect(() => {
    if (authError) {
      toast.error(authError?.message);
    }

    if (isAuthenticated) {
      navigate("/home");
    }
  }, [authError, isAuthenticated, navigate, dispatch]);

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please Enter the Email");
      return;
    }

    if (!password) {
      toast.warn("Please Enter the Password");
      return;
    }

    if (isSignup) {
      if (!username) {
        toast.warn("Please Enter the username");
        return;
      }

      dispatch(signup({ username, email, password }));
      dispatch(currentUser());
    } else {
      dispatch(login({ email, password }));
      dispatch(currentUser());
    }
  };

  return (
    <div className="auth-container">
      <Container maxWidth="xs">
        <Paper elevation={8} style={{ padding: "10px", borderRadius: "8px" }}>
          <Container maxWidth="xs">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4">
                {isSignup ? "Sign Up" : "Log In"}
              </Typography>

              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <TextField
                    size="small"
                    name="username"
                    label="Username"
                    id="username"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                )}

                <TextField
                  size="small"
                  name="email"
                  label="Email"
                  id="email"
                  type="email"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  size="small"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  style={{ marginTop: "10px" }}
                  disabled={loading}
                >
                  {isSignup ? "Sign up" : "Log in"}
                </Button>
              </form>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginTop="10px"
              >
                <Typography variant="subtitle1">
                  {isSignup
                    ? "Already have an account?"
                    : "Don't have an account"}
                </Typography>

                <Button
                  style={{ borderRadius: "8px" }}
                  type="button"
                  variant="text"
                  onClick={handleSwitch}
                >
                  {isSignup ? "Log in" : "Sign up"}
                </Button>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default Auth;
