import { Box } from '@mui/material'
import React from 'react'
import FoodRow from '../components/FoodRow'

export default function Menu() {
  return (
    <Box sx={{minHeight:"85vh",mt:5}}>
         <FoodRow category="Chicken"/>
         <FoodRow category="Curry"/>
         <FoodRow category="Rice"/>
         <FoodRow category="Fish"/>
         <FoodRow category="Fruits"/>
         <FoodRow category="IceCreams"/>
         <FoodRow category="Deserts"/>
         <FoodRow category="SoftDrinks"/>
    </Box>
  )
}
