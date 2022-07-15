import { Box, MenuItem, Select } from '@mui/material'
import React from 'react'

export default function SelectForm({category,setCategory}) {
  return (
    <Box>
        <Select
            sx={{width: "100%"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            variant='filled'
            onChange={e=>setCategory(e.target.value)}
            size="small"
          >
            
            <MenuItem value={"Chicken"}>Chicken</MenuItem>
            <MenuItem value={"Curry"}>Curry</MenuItem>
            <MenuItem value={"Rice"}>Rice</MenuItem>
            <MenuItem value={"Fish"}>Fish</MenuItem>
            <MenuItem value={"Fruits"}>Fruits</MenuItem>
            <MenuItem value={"IceCreams"}>IceCreams</MenuItem>
            <MenuItem value={"Deserts"}>Deserts</MenuItem>
            <MenuItem value={"SoftDrinks"}>SoftDrinks</MenuItem>
          </Select>
    </Box>
   
  )
}