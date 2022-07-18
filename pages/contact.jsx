import {
  Box,
  Container,
  Grid,
  TextField,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import welcome from "../public/img/welcome.svg";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


export default function Contact() {
  const IconArr = [
    {
      icon: <FacebookIcon/>,
    },
    {
      icon: <InstagramIcon/>,
    },

    {
      icon: <YouTubeIcon/>,
    }
  ];

  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_cosd1a9",
          "template_cfpymzs",
          form.current,
          "Ppo1gfs3nYPZy5eQU"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }

    form.current.reset();
  };

  return (
    <Box
      id="about"
      sx={{
        width: "100%",
        minHeight: "88vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 5, md: 0 },
      }}
    >
      <Container>
        <Box sx={{ mb: { xs: 5, md: 0 } }}>
          <h1>Get in Touch</h1>
        </Box>
        <Grid container spacing={1} sx={{ minHeight: "60vh" }}>
          <Grid item xs={12} md={6} sx={{}}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <h3>Send us an email</h3>

                <Box
                  component="form"
                  ref={form}
                  onSubmit={sendEmail}
                  sx={{ width: "100%" }}
                  noValidate
                  autoComplete="off"
                >
                  <Box>
                    <TextField
                      sx={{ width: "70%", my: 2, minWidth: "300px" }}
                      id="standard-basic"
                      label="Name"
                      variant="standard"
                      type="text"
                      name="from_name"
                    />
                  </Box>
                  <Box>
                    <TextField
                      sx={{ width: "70%", my: 2, minWidth: "300px" }}
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      type="email"
                      name="user_email"
                    />
                  </Box>
                  <Box>
                    <TextField
                      sx={{ width: "70%", my: 2, minWidth: "300px" }}
                      id="standard-basic"
                      label="Message"
                      variant="standard"
                      name="message"
                      type="text"
                    />
                  </Box>
                  <Button
                    type="submit"
                    value="Send"
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              {IconArr.map((item) => (
                <IconButton key={item.id}>{item.icon}</IconButton>
              ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "80%" }}>
              <Image src={welcome} alt="map" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
