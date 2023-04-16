import React from 'react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import {TextField} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {useNavigate, useLocation} from "react-router";

function JoinProject() {
  let navigate = useNavigate();
  let location = useLocation();
  const [projectId, setProjectId] = useState("");
  const userId = location.state.userid;

  const joinProject = async () => {
    const url = 'http://localhost:5000/join';
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId:projectId, userId:userId })
    }
    const res = await fetch(url, options);
    const data = await res.json();
    if(data.project_id === undefined){
        alert(data.error);
    }
    else{
        alert("Successfully joined project with ID " + data.project_id + " as " + data.user_id);
        navigate('/home', {state:{userid:data.user_id}});
    }
  };

  const cancel = async() => {
    navigate('/home',{state:{userid:userId}});
  }

  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2} style={{minHeight:"100vh"}}>
      <Grid item>
        <Typography variant="h5" color="primary">Join Project</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" justifyContent="center">
              <TextField 
              variant="outlined" 
              label="Project ID"
              fullwidth style={{marginBottom: "1em"}}
              onChange={(e) => setProjectId(e.target.value)}
              />
            <Button variant="outlined" onClick={()=> joinProject()}>Join</Button>
          </Grid>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={() => cancel()}>Cancel and Return</Button>
      </Grid>
    </Grid>

  )

}

export default JoinProject;