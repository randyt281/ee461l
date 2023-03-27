import React from "react";
import "./Projects";
import "./ProjectName";
import ProjectName from "./ProjectName";
import ListOfUsers from "./ListOfUsers";
import HWSet from "./HWSet";
import { List } from "@mui/material";
import { Hardware } from "@mui/icons-material";
import { Box } from "@mui/system";
import './Project.css'
import Grid from '@mui/material/Grid'; // Grid version 1
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import JoinButton from "./JoinButton";
import { useState } from "react";
import { useEffect } from "react";

function Project (props){
    const pName = props.projectName;
    const listUsers = props.listOfUsers;
    const hw1 = props.hwSet1; 
    const hw2 = props.hwSet2;

    const buttonStyle = {
        borderColor:"black",
        "&:hover":{borderColor:"gray"},
        color:"black",
        mt:"8px",
        mb:"8px",
        mx:"4px"
        
    };

    const [HWSet1Data, setHWSet1Data] = useState({"Capacity":"0", "Availability":"0"});
    const [HWSet2Data, setHWSet2Data] = useState({"Capacity":"0", "Availability":"0"});


    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/hardware").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setHWSet1Data({
                    Capacity:data.HWSet1.Capacity,
                    Availability:data.HWSet1.Availability
                })
                setHWSet2Data({
                    Capacity:data.HWSet2.Capacity,
                    Availability:data.HWSet2.Availability
                })

            })
        );
    }, []);


    return (

        <Box className="project-container" justifyContent="center" alignItems="center" align-self="center" sx= {{
            align:"center",
            maxWidth:"850px",
            maxHeight:"400px",
            border: "3px solid grey",
            borderRadius: "8px",

        }}>
            <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item xs="auto">
                    <ProjectName projectName= {pName}/>
                </Grid>
                <Grid item xs="auto">
                    <ListOfUsers listOfUsers={listUsers}/>    
                </Grid>
                <Grid item xs="auto">
                    <HWSet hwSet1={HWSet1Data} hwSet2={HWSet2Data}/>
                </Grid>
                <Grid item xs="auto">
                    <TextField size="small" label="Enter qty" margin="dense" style={{width:"90px"}}/> <br/>
                    <TextField size="small" label="Enter qty" margin="dense" style={{width:"90px"}}/>
                </Grid>
                <Grid item xs="auto">
                    <Button variant='outlined' disableElevation  sx={buttonStyle}>Check In</Button>
                    <Button variant='outlined' disableElevation  sx={buttonStyle}>Check Out</Button> <br/>
                    <Button variant='outlined' disableElevation  sx={buttonStyle}>Check In</Button>
                    <Button variant='outlined' disableElevation  sx={buttonStyle}>Check Out</Button>
                </Grid>
                <Grid item xs="auto">
                    <JoinButton/>
                </Grid>

            </Grid>
     
        </Box>
        
    
      

      
     
    );
    
}
export default Project;