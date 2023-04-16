import React from 'react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import {TextField} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const url = 'http://localhost:5000/register';
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password })
    }
    const res = await fetch(url, options);
    const data = await res.json();
    if(data.user === undefined){
        alert(data.error);
    }
    else{
        alert("Successfully registered user " + data.user);
        navigate('/');
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
            <Button variant="outlined" onClick={()=> registerUser()}>Register</Button>
          </Grid>
      </Grid>
      <Grid item>
      </Grid>
    </Grid>

  )

}
export default Register;