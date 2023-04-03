import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { Grid } from '@mui/material';
import {TextField} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import "./CreateProject.css"
import { Link, Outlet } from "react-router-dom";
import httpClient from 'react-http-client';
import {useNavigate} from "react-router";

function Login() {
        let navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");

  const createProject = async () => {

    try {
      const resp = await httpClient.post("//localhost:5000/create-project", {
        Name,
        Description,
        projectId,
      });
      console.log(resp.data)
        alert("Created new project")
                navigate('/');

    }
    catch(error) {
      alert("Project ID already exists");
    }
   
  };

  const cancel = async() => {
    navigate('/')
  }

  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2} style={{minHeight:"100vh"}}>
      <Grid item>
        <Typography variant="h5" color="primary">Create new project</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <TextField 
              variant="outlined" 
              label="Project Name" 
              fullwidth style={{marginBottom: "1em"}}
              onChange={(e) => setName(e.target.value)}
              />
            <TextField 
              variant="outlined" 
              label="Description"
              fullwidth style={{marginBottom: "1em"}}
              onChange={(e) => setDescription(e.target.value)}
              />
              <TextField 
              variant="outlined" 
              label="ProjectID"
              fullwidth style={{marginBottom: "1em"}}
              onChange={(e) => setProjectId(e.target.value)}
              />
            <Button variant="outlined" onClick={()=> createProject()}>Submit</Button>
          </Grid>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={() => cancel()}>Cancel and Return</Button>
      </Grid>
    </Grid>

  )

}




export default Login;
