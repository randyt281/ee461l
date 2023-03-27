import React from 'react';
import Project from './Project.js';
import Container from '@mui/material/Container';
import './Project.css'
import { useState, useEffect } from 'react';
function Projects() {
    
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/projects").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setProjectData(() => (projectData = data));
            })
        );
    }, []);
   


    return (
        <Container>
            <Project projectName="Project 1" listOfUsers="list of users" hwSet1={{availability:"49", capacity:"100"}} hwSet2={{availability:"79", capacity:"100"}}/> <br/>
            <Project projectName="Project 2" listOfUsers="list of users" hwSet1={{availability:"23", capacity:"100"}} hwSet2={{availability:"56", capacity:"100"}}/> <br/>
            <Project projectName="Project 3" listOfUsers="list of users" hwSet1={{availability:"42", capacity:"100"}} hwSet2={{availability:"22", capacity:"100"}}/> <br/>
        </Container>
        );

}
export default Projects;
