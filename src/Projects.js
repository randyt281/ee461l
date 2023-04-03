import React from 'react';
import Project from './Project.js';
import Container from '@mui/material/Container';
import './Project.css'
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import {useNavigate} from "react-router";
import httpClient from 'react-http-client';
function Projects(props) {
    
    let uid = props.username;
    
    const projectList = []

    useEffect(() => {

        fetch("//localhost:5000/projects").then((res) =>
            res.json().then((data) => {
                getProjects(data['projects'], data['IDs'])
            })
        );
    }, []);

    const getProjects = (projects, IDs) => {

       

        for(let i = 0; i < projects.length; i++) {
            projectList.push(
                <Project projectName={projects[i]} projectId={IDs[i]} userid={uid}/>
            )
        }
     
    }

    let navigate = useNavigate();
    const createProject = async() => {
        navigate('/create-project')
      }
    
    return (
        <Container>
            <Project>{projectList}</Project>
            <Button variant="contained" onClick={() => createProject()}>Create New Project</Button>
        </Container>
        
        );

}
export default Projects;
