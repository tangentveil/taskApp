import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/Auth/authSlice";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
      <ListAltIcon sx={{marginRight:"8px"}}/>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
          }}
        >
          TASKS
        </Typography>

        <Button
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "inherit",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
