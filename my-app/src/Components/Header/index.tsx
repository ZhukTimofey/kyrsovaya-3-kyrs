import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const store = useAppSelector((state) => state.userStore);
  console.log("AWawdasdaw");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            The Halcyon - магазин товаров ручной работы
          </Typography>
          {!store.isAuthorized ? (
            <Button onClick={() => navigate("/login")} color="inherit">
              Login
            </Button>
          ) : (
            <IconButton
              onClick={() => navigate("/home")}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
