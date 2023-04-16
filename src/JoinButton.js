import React from "react";
import { Button } from "@mui/material";


function JoinButton(props) {
    const projectId = props.projectId
    const userId = props.userid
    
    const leaveStyle = {
        maxWidth:"60px",
        maxHeight:"40px",
        color:"white",
        backgroundColor:"red",
        size:"large",
        borderColor:"red"
    }

    const leaveProject = async () => {
        const url = 'http://localhost:5000/leave';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId:projectId, userId:userId })
        }
        const res = await fetch(url, options);
        const data = await res.json();
        alert("Successfully removed " + data.user_id + " from project " + data.project_id);
        props.onChange(1);
    }


    return( 
        <Button variant='outlined' disableElevation onClick={() => leaveProject()} style = {leaveStyle}>Leave</Button>
    );
}

export default JoinButton;