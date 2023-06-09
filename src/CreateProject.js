import React from 'react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import {TextField} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {useNavigate, useLocation} from "react-router";

function CreateProject() {
  let navigate = useNavigate();
  let location = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const userId = location.state.userid;

  const createProject = async () => {
    const url = 'http://localhost:5000/createproject';
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, projectId, userId:userId })
    }
    const res = await fetch(url, options);
    const data = await res.json();
    if(data.project_id === undefined){
        alert(data.error);
    }
    else{
        alert("Successfully created project with ID " + data.project_id + " as " + data.user_id);
        navigate('/home', {state:{userid:data.user_id}});
    }
  };

  const cancel = async() => {
    navigate('/home',{state:{userid:userId}});
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




export default CreateProject;
