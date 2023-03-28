import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { Grid } from '@mui/material';
import {TextField} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import "./login.css"
import { Link, Outlet, useNavigate} from "react-router-dom";
import httpClient from 'react-http-client';

function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    console.log(user, password);
    try {
        const resp = await httpClient.post("//localhost:5000/register", {
        user,
        password
      });
      console.log(resp.data);
    }
    catch(error) {
      alert("User already exists")
    }
    
    
  }
  


  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2} style={{minHeight:"100vh"}}>
      <Grid item>
        <Typography variant="h5" color="primary">Register Here</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <TextField 
              variant="outlined" 
              label="Username" 
              fullwidth style={{marginBottom: "1em"}}
              onChange={(e) => setUser(e.target.value)}
              />
            <TextField 
              variant="outlined" 
              type="password" 
              label="Password"
              fullwidth style={{marginBottom: "1em"}}
              onChange={(e) => setPassword(e.target.value)}
              />
            <Button variant="outlined" onClick={()=> logInUser()}>Register</Button>
          </Grid>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>

  )

}
export default Register;