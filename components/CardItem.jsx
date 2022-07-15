/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, Box, Chip, IconButton } from "@mui/material";
import React, { useContext,useEffect } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AppContext } from "./ContextProvider";
import DeleteIcon from '@mui/icons-material/Delete';
export default function FoodCart({ item,setTotal,total }) {
  const { dispatch } = useContext(AppContext);


  return (
    <Card sx={{ width: "100%",mt:2,p:2 }}>
      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "100px", height: "100px",margin:"20px 0" }}
            alt={item.title}
            src={item.photoUrl}
          />
          <h3>Quantity - {item.qty} </h3>
          {/* <Chip sx={{ mt: 1 }} label={item.category} variant="outlined" /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <h3>{item.title}</h3>
            <Box sx={{display:"flex",alignItems:"center"}}>
            <p>{(item.price * item.qty).toFixed(1)} $</p>
            <Chip sx={{ mt: 1,ml:5 }} label={item.category} variant="outlined" />
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <IconButton
              onClick={() => dispatch({ type: "remove", payload: item })}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => dispatch({ type: "add", payload: item })}
            >
              <AddShoppingCartIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
