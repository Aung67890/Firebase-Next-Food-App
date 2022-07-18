/* eslint-disable @next/next/no-img-element */
import {
  Container,
  Grid,
  Card,
  Box,
  CardMedia,
  Chip,
  CardContent,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { getItemsWithCategory } from "../utils/firebaseFunctions";
import SelectForm from "./SelectForm";
import FoodCart from "./FoodCart";

export default function FoodRow({ category }) {
  const [loading, setLoading] = useState(true);

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      const itemFetched = await getItemsWithCategory(category);
      setMenuItems(itemFetched);
      setLoading(false)
    };

    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ mb: 5, minHeight: "25vh", pb: 5 }} maxWidth="xl">
      <Box sx={{}}>
        <h3 style={{ marginBottom: "10px" }}>{category}</h3>
      </Box>
      <Grid sx={{ my: 2 }} spacing={2} container>
        {menuItems && !loading ? (
          menuItems.map((item) => (
            <Grid key={item.id} item xs={6} md={4} lg={2}>
              <FoodCart item={item} />
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
