import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
function JoinButton() {
    
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
    const [styleState, setStyleState] = useState(true);
    
    const toggle = () => {
        setButtonText((state) => (state ==="Join" ? "Leave" : "Join"))
        setStyleState(!styleState)
    };

    

    
    return( 
        <Button variant='outlined' disableElevation onClick={() => toggle()} style = {styleState ? joinStyle : leaveStyle}>{buttonText}</Button>

    );
}

export default JoinButton;