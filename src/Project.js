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
import httpClient from 'react-http-client';
import httpHandler from "react-http-client";

function Project (props){
    const pName = "Project Test";
    const pid =  "test123";
    const userid = "randyt281";
    

    //TODO: How to pass userid to project after logging in?
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

    const [check1, setCheck1] = useState(0);
    const [check2, setCheck2] = useState(0);

    const [joinState, setJoinState] = useState(true);

    
    const [listUsers, setlistUsers] = useState("");

    useEffect(() => {
        //fetch initial data on refresh
        fetch("//localhost:5000/hardware").then((res) =>
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
        const loc = `//localhost:5000/get-list/${pid}`
        fetch(loc).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setlistUsers(data['Users']);
            })
        );

    
      
        
    }, []);

 



    const checkIn = async (hw) => {
        try {
            if(hw === 1) {
                const resp = await httpClient.post("//localhost:5000/check-in", {
                    qty:check1,
                    hw     
                    })
                window.location.reload(false);

            }
            else if (hw === 2) {
                const resp = await httpClient.post("//localhost:5000/check-in", {
                    qty:check2,
                    hw   
                    })
                window.location.reload(false);

               
            }
            }
            catch(error) {
            alert("Invalid Quantity");
            }
    }
   
      const checkOut = async (hw) => {
      
        try {
            if(hw === 1) {
                const resp = await httpClient.post("//localhost:5000/check-out", {
                    qty:check1,
                    hw     
                    })
                window.location.reload(false);

            }
            else if (hw === 2) {
                const resp = await httpClient.post("//localhost:5000/check-out", {
                    qty:check2,
                    hw   
                    })
                    window.location.reload(false);

            }
            }
            catch(error) {
            alert("Invalid Quantity");
            }

       
      };


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
                    <JoinButton projectId={pid} userid={userid}/>
                </Grid>

            </Grid>
     
        </Box>
        
    
      

      
     
    );
    
}
export default Project;