/* eslint-disable @next/next/no-img-element */
import { Container, Grid, Card, Box,CardMedia,Chip, CardContent, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { getItemsWithCategory } from "../utils/firebaseFunctions";
import SelectForm from "./SelectForm";
import FoodCart from "./FoodCart";


export default function FoodRow({}) {
  const [category, setCategory] = useState("Chicken");

  const [menuItems, setMenuItems] = useState([]);


  useEffect(() => {
    const fetchItem = async () => {
      const itemFetched = await getItemsWithCategory(category);
      setMenuItems(itemFetched);
    };

    fetchItem();
  }, [category]);

  return (
    <Container sx={{ mb: 5,minHeight:"25vh" }} maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>{category}</h3>
        <SelectForm category={category} setCategory={setCategory} />
      </Box>
      <Grid sx={{ my: 2 }} spacing={2} container>
        
        {menuItems ? (
          menuItems.map((item) => (
            <Grid key={item.id} item xs={6} md={4} lg={2}>
              <FoodCart item={item}/>
            </Grid>
          ))
        ) : (
          <Box>
            <h2>Loading...</h2>
          </Box>
        )}
      </Grid>
    </Container>
  );
}
