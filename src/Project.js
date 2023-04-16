import React from "react";
import { Box } from "@mui/system";
import './Project.css'
import ListOfUsers from "./ListOfUsers";
import ProjectName from "./ProjectName";
import HWSet from "./HWSet";
import Grid from '@mui/material/Grid'; // Grid version 1
import JoinButton from "./JoinButton";
import {TextField} from '@mui/material'
import { useState } from 'react';
import { Button } from '@mui/material';

function Project (props){
    const buttonStyle = {
        borderColor:"black",
        "&:hover":{borderColor:"gray"},
        color:"black",
        mt:"8px",
        mb:"8px",
        mx:"4px"
        
    };

    const [check1, setCheck1] = useState(0);
    const [check2, setCheck2] = useState(0);
    const projectId = props.project_id;

    function handleChange(){
        props.onChange(1)
    }

    const checkIn = async (hw) => {
        if(hw === 1){
            const url = 'http://localhost:5000/checkin';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId:projectId, hw1:check1, hw2:0 })
            }
            const res = await fetch(url, options);
            const data = await res.json();
            if(data.hw1_amount === undefined){
                alert(data.error);
            }
            else{
                alert("Successfully checked in " + data.hw1_amount + " to HWSet1 and " + data.hw2_amount + " to HWSet2");
                props.onChange(1);
            }
        }
        else if(hw === 2){
            const url = 'http://localhost:5000/checkin';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId:projectId, hw1:0, hw2:check2 })
            }
            const res = await fetch(url, options);
            const data = await res.json();
            if(data.hw2_amount === undefined){
                alert(data.error);
            }
            else{
                alert("Successfully checked in " + data.hw1_amount + " to HWSet1 and " + data.hw2_amount + " to HWSet2");
                props.onChange(1);
            }
        }
    }

    const checkOut = async (hw) => {
        if(hw === 1){
            const url = 'http://localhost:5000/checkout';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId:projectId, hw1:check1, hw2:0 })
            }
            const res = await fetch(url, options);
            const data = await res.json();
            if(data.hw1_amount === undefined){
                alert(data.error);
            }
            else{
                alert("Successfully checked out " + data.hw1_amount + " from HWSet1 and " + data.hw2_amount + " from HWSet2");
                props.onChange(1);
            }
        }
        else if(hw === 2){
            const url = 'http://localhost:5000/checkout';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId:projectId, hw1:0, hw2:check2 })
            }
            const res = await fetch(url, options);
            const data = await res.json();
            if(data.hw2_amount === undefined){
                alert(data.error);
            }
            else{
                alert("Successfully checked out " + data.hw1_amount + " from HWSet1 and " + data.hw2_amount + " from HWSet2");
                props.onChange(1);
            }
        }
    }


    return (

        <Box className="project-container" justifyContent="center" alignItems="center" align-self="center" sx= {{
            align:"center",
            maxWidth:"1000px",
            maxHeight:"400px",
            border: "3px solid grey",
            borderRadius: "8px",

        }}>
            <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item xs="auto">
                    <ProjectName projectName= {props.project_name}/>
                </Grid>
                <Grid item xs="auto">
                    <ListOfUsers listOfUsers={props.list_of_users}/>    
                </Grid>
                <Grid item xs="auto">
                    <HWSet hwSet1Used={props.hwset1_used} hwSet2Used={props.hwset2_used} hwSet1Availability={props.hwset1_availability} hwSet2Availability={props.hwset2_availability}/>
                </Grid>
                <Grid item xs="auto">
                    <TextField size="small" label="Enter qty" margin="dense" style={{width:"90px"}} onChange={(e) => setCheck1(e.target.value)}/> <br/>
                    <TextField size="small" label="Enter qty" margin="dense" style={{width:"90px"}} onChange={(e) => setCheck2(e.target.value)}/>
                </Grid>
                <Grid item xs="auto">
                    <Button variant='outlined' disableElevation  sx={buttonStyle} onClick={()=> checkIn(1)}>Check In</Button>
                    <Button variant='outlined' disableElevation  sx={buttonStyle} onClick={()=> checkOut(1)}>Check Out</Button> <br/>
                    <Button variant='outlined' disableElevation  sx={buttonStyle} onClick={()=> checkIn(2)}>Check In</Button>
                    <Button variant='outlined' disableElevation  sx={buttonStyle} onClick={()=> checkOut(2)}>Check Out</Button>
                </Grid>
                <Grid item xs="auto">
                    <JoinButton projectId={props.project_id} userid={props.user_id} onChange={handleChange}/>
                </Grid>

            </Grid>
     
        </Box>
     
    );

    
}
export default Project;