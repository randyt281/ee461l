import React from 'react';
import Project from './Project.js';
import Container from '@mui/material/Container';
import './Project.css'
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import {useNavigate} from "react-router";
import httpClient from 'react-http-client';
function Projects() {
    
    
    
    
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/projects").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                getProjectNames(data)
            })
        );
    }, []);

    const getProjectNames = (data) => {
        let projectList = []
        for (i in projectList) {
            projectList.push(<Project projectName={i}/>)
        }

    };
   

    let navigate = useNavigate();
    const createProject = async() => {
        navigate('/create-project')
      }
    


    return (
        <Container>
            <Project projectName="Project 1"  hwSet1={{availability:"49", capacity:"100"}} hwSet2={{availability:"79", capacity:"100"}}/> <br/>
            <Project projectName="Project 2"  hwSet1={{availability:"23", capacity:"100"}} hwSet2={{availability:"56", capacity:"100"}}/> <br/>
            <Project projectName="Project 3"  hwSet1={{availability:"42", capacity:"100"}} hwSet2={{availability:"22", capacity:"100"}}/> <br/>
            <Button variant="contained" onClick={() => createProject()}>Create New Project</Button>
        </Container>
        
        );

}
export default Projects;
