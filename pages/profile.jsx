/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { AppContext } from "../components/ContextProvider";
import { CircularProgress, Box, Container,Grid,Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import {useRouter} from 'next/router'
import AddProduct from '../components/AddProduct'
export default function Profile() {
  const { user,setUser } = useContext(AppContext);

  const router = useRouter()

  const logOut = () =>{
    
    signOut(auth).then(() => {
        
        setUser(null)

        router.push('/')
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <Container>
      {user ? (
        <Grid container>
        <Grid item xs={12} md={6} sx={{ mt: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center",my:5 }}>
            <img
              src={user.photoURL}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              alt={user.displayName}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              
              my:2
            }}
          >
            <p>User Name</p> <h4>{user.displayName}</h4>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              
              my:2
            }}
          >
            <p>User ID</p> <h4>{user.uid}</h4>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              
              my:2
            }}
          >
            <p>User Email</p> <h4>{user.email}</h4>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              
              my:2
            }}
          >
            <p>Email Verified</p> <h4>{user.emailVerified.toString()}</h4>
          </Box>
          <Box sx={{mt:5}}>
            <Button variant="contained" onClick={logOut}>
                Logout
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 5 }}>
          <Container>
                <AddProduct/>
          </Container>
        </Grid>
        {/* <Grid item xs={12} sx={{ mt: 5 }}>
          <Container>
                here are list of your products
                
          </Container>
        </Grid> */}
        </Grid>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}
