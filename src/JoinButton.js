import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import httpClient from 'react-http-client';


function JoinButton(props) {
    const pid = props.projectId
    
    const joinStyle = {
        maxWidth:"60px",
        maxHeight:"40px",
        color:"white",
        backgroundColor:"green",
        size:"large",
        borderColor:"green"
    }
    const leaveStyle = {
        maxWidth:"60px",
        maxHeight:"40px",
        color:"white",
        backgroundColor:"red",
        size:"large",
        borderColor:"red"
    }
  
    const [buttonText, setButtonText] = useState("Join");
    const [styleState, setStyleState] = useState(true); //true = join, false = leave
    
    
    const toggle = () => {
        setStyleState(!styleState)
        if(styleState) {
            joinProject()
        }
        else {
            leaveProject()
        }
        setButtonText((state) => (state ==="Join" ? "Leave" : "Join"))
        
    };

    const leaveProject = async () => {
        console.log(pid)
        const loc = `//localhost:5000/leave/${pid}`
        const resp = await httpClient.post(loc)
        console.log(resp)
        alert("left project " + resp.projectId)
    };
    const joinProject = async () => {
        const loc = `//localhost:5000/join/${pid}`
        const resp = await httpClient.post(loc)
        console.log(resp)
        alert("joined project " + resp.projectId)
    };


   
    

    
    return( 
        <Button variant='outlined' disableElevation onClick={() => toggle()} style = {styleState ? joinStyle : leaveStyle}>{buttonText}</Button>

    );
}

export default JoinButton;