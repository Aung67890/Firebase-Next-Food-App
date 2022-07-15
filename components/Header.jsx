/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import logo from "../public/img/appLogo.png";
import google from "../public/img/google.png";
import {
  IconButton,
  Fade,
  Fab,
  Box,
  CssBaseline,
  useScrollTrigger,
  Typography,
  Toolbar,
  AppBar,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerCom from "./Drawer";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import { AppContext } from "./ContextProvider";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../configs/firebase";
import { saveUser } from "../utils/firebaseFunctions";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function AppBarComponent(props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { user, setUser, cart } = useContext(AppContext);

  useEffect(() => {
    // console.log(cart.items.length)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("error");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const provider = new GoogleAuthProvider();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };

  const Links = [
    {
      id: 1,
      ren: "Home",
      href: "/",
    },

    {
      id: 4,
      ren: "Contact",
      href: "/contact",
    },
  ];

  return (
    <Box>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="inherit" sx={{}}>
          <DrawerCom open={open} handleClose={() => setOpen(false)} />
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image width={50} height={50} src={logo} alt="logo" />
              <Typography sx={{ ml: 2, fontWeight: "bold" }} variant="h5">
                Food Master
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex", alignItems: "center" },
                }}
              >
                {Links.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <a style={{ margin: "0 16px" }}>{item.ren}</a>
                  </Link>
                ))}
              </Box>

              {user && (
                <IconButton onClick={() => router.push("/cart")} sx={{ mr: 1 }}>
                  <Badge
                    badgeContent={
                      cart.items.length > 0 ? cart.items.length : null
                    }
                    color="primary"
                  >
                    <ShoppingCartIcon sx={{ color: "text.primary" }} />
                  </Badge>
                </IconButton>
              )}
              {!user && (
                <IconButton onClick={googleLogin} sx={{ mr: 1 }}>
                  <Image src={google} width={25} height={25} alt={"apk"} />
                </IconButton>
              )}
              {user && (
                <IconButton
                  onClick={() => {
                    router.push("/profile");
                  }}
                  sx={{ mr: 1 }}
                >
                  <img
                    src={user.photoURL}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                    }}
                    alt={""}
                  />
                </IconButton>
              )}
              <Box sx={{ display: { xs: "block", md: "none", mr: 2 } }}>
                <IconButton onClick={() => setOpen(true)}>
                  <MenuIcon sx={{ color: "text.primary" }} />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <Box sx={{}}>{props.children}</Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
