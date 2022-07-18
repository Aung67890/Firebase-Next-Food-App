import {
  Drawer,
  Box,
  ListItemIcon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import pfImg from "../public/img/avatar.png";
import Image from "next/image";
import { useRouter } from "next/router";
import GridViewIcon from '@mui/icons-material/GridView';

export default function DrawerCom({ open, handleClose }) {

    

  const Links = [
    {
      id: 1,
      ren: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      id: 3,
      ren: "Menu",
      href: "/menu",
      icon: <GridViewIcon />,
    },

    {
      id: 4,
      ren: "Contact",
      href: "/contact",
      icon: <CallIcon />,
    },
  ];

  

  const router = useRouter();

  const handleClick = (navi) => {
    router.push(navi);
    handleClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={handleClose} sx={{ p: 2, m: 2 }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <List>
          {Links.map((item) => (
            <ListItem key={item.id} onClick={() => handleClick(item.href)}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.ren} />
              </ListItemButton>
            </ListItem>
          ))}
          {/* <ListItem onClick={() => {}}>
                <ListItemButton>
                  <ListItemIcon>
                    {true ?  <DarkModeIcon sx={{ color: "text.primary" }} /> :  <LightModeIcon sx={{ color: "text.primary" }} />}
                  </ListItemIcon>
                  <ListItemText primary={true ? "DarkMode" : "LightMode"} />
                </ListItemButton>
              </ListItem> */}
        </List>
      </Box>
    </Drawer>
  );
}
