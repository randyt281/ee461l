import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import "./Login.css";

function Login(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const logInUser = async () => {
        const url = 'http://localhost:5000/login';
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
            alert("Successfully logged in as " + data.user);
            navigate('/home',{state:{userid:user}});
        }
    };

    const registerUser = async () => {
        navigate('/register');
    }

    return (
        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2} style={{minHeight:"100vh"}}>
          <Grid item>
            <Typography variant="h5" color="primary">Welcome</Typography>
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
                <Button variant="outlined" onClick={()=> logInUser()}>Login</Button>
              </Grid>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={()=> registerUser()}>Register Here</Button>
          </Grid>
        </Grid>
      );
}

export default Login;