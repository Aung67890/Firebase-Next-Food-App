import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React from "react";
import ContextProvider from "./ContextProvider";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }) {
  return (
    <AnimatePresence>
      <ContextProvider>
        <Box
          sx={{
            maxWidth: "100vw",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
        <ToastContainer position="top-right"
              autoClose={15000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              draggable
              pauseOnHover/>
          <Header />
          {children}
        
        </Box>
      </ContextProvider>
    </AnimatePresence>
  );
}
