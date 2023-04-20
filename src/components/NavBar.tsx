import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../static/images/twitter-logo.png";
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} width={40} height={40} alt="Kitty Katty!" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            ChelShit
          </Typography>
          <Button
            id="basic-button"
            color="inherit"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            User
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        justifyContent="center"
        display="flex"
        gap={10}
        sx={{
          backgroundColor: "white",
          // "&:hover": {
          //   backgroundColor: "primary.main",
          //   opacity: [0.9, 0.8, 0.7],
          // },
        }}
      >
        <Button startIcon={<HomeIcon />}>Trang Chủ</Button>
        <Button startIcon={<HomeIcon />}>Thống Kê</Button>
        <Button startIcon={<HomeIcon />}>Lịch Sử</Button>
        <Button startIcon={<HomeIcon />}>Trang Chủ</Button>
      </Box>
    </Box>
  );
}
