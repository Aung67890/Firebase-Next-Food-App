import { Container } from '@mui/material'
import React from 'react'

export default function Map() {
  return (
    <Container sx={{my:5,py:5}} maxWidth="xl">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8208947944718!2d98.48315551534773!3d16.685843727048457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30dd9e2a16dc1e3f%3A0x5cf7a5ce1226195a!2sGood%20To%20Go%20restaurant!5e0!3m2!1smy!2smm!4v1658115052116!5m2!1smy!2smm"  style={{border:0,width:"100%",height:450}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </Container>
  )
}
