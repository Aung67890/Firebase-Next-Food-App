import { Box, Container, CardContent, Card, Button } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import FoodCart from "../components/CardItem";
import { AppContext } from "../components/ContextProvider";
import { getSingleItemWithId } from "../utils/firebaseFunctions";
import NotFound from "../public/img/emptyCart.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart } = useContext(AppContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.items.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price.toFixed(2));
  }, [cart, setTotalPrice, setTotalItems]);

  const router = useRouter()

  const handleClick = () =>{
    
    router.push('/')
    toast.success("Payment done !!")
  }

  return (
    <>
      {cart.items.length > 0 ? (
        <Container>
          <Card sx={{ my: 3, p: 2 }}>
            <CardContent>
              <h3>Cart Summary</h3>
              <p style={{ margin: "20px 0" }}>TOTAL items : {totalItems}</p>
              <p style={{ margin: "20px 0" }}>TOTAL Price : {totalPrice} $ </p>
              <Button onClick={handleClick} sx={{ mt: 1 }} variant="contained">
                Checkout
              </Button>
            </CardContent>
          </Card>
          {cart?.items.map((item) => (
            <FoodCart key={item.id} item={item} />
          ))}
        </Container>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "92vh",
            flexDirection:"column"
          }}
        >
          <Image src={NotFound} alt="" width={200} height={200} />
          <h3 style={{marginTop:"40px"}}>No Cart Item</h3>
          <Button sx={{mt:5}} variant="contained" onClick={()=>router.push('/')}>
            Go Back Home
          </Button>
        </Box>
      )}
    </>
  );
}
