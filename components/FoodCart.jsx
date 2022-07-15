/* eslint-disable @next/next/no-img-element */
import { Card,CardContent,Box,Chip,IconButton } from '@mui/material'
import React, { useContext } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AppContext } from './ContextProvider';

export default function FoodCart({item}) {

    
  const {dispatch} = useContext(AppContext)

  return (
    <Card sx={{ width: "100%" }}>
              <CardContent>
                <img style={{width:"100px",height:"100px",margin:"20px 0"}} alt={item.title} src={item.photoUrl}/>
                <h3>{item.title}</h3>
                <p>{item.price} $</p>
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <Chip sx={{mt:1}} label={item.category} variant="outlined" />
                  <IconButton onClick={()=>dispatch({type:"add",payload:item})}>
                    <AddShoppingCartIcon fontSize="small"/>
                  </IconButton>
                </Box>
              </CardContent>
              </Card>
  )
}
