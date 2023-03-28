import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import httpClient from 'react-http-client';


function JoinButton(props) {
    const pid = props.projectId
    const userid = props.userid
    
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
        setStyleState(!styleState);
        if(styleState) {
            joinProject();
        }
        else {
            leaveProject();
        }
        setButtonText((state) => (state ==="Join" ? "Leave" : "Join"));
        
    };

    const leaveProject = async () => {
        console.log(pid);
        const loc = `//localhost:5000/leave`;
        const resp = await httpClient.post(loc, {
            userid:userid,
            pid:pid
        });
        console.log(resp);
        alert("left project " + resp.pid);
    };
    const joinProject = async () => {
        const loc = `//localhost:5000/join`;
        const resp = await httpClient.post(loc, {
            userid:userid,
            pid:pid
        });
        console.log(resp);
        alert("joined project " + resp.pid);
    };


   
    

    
    return( 
        <Button variant='outlined' disableElevation onClick={() => toggle()} style = {styleState ? joinStyle : leaveStyle}>{buttonText}</Button>

    );
}

export default JoinButton;