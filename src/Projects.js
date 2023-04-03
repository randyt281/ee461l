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
    
    
    const [projectList, setProjectList] = useState([])

    const names = ['1', '2', '3']
    useEffect(() => {

        fetch("//localhost:5000/projects").then((res) =>
            res.json().then((data) => {

                setProjectList(data['data']);
               
               
            })
        );
    }, []);


    const nameList = projectList.map((name) => <h2>{name}</h2>)
//
    let navigate = useNavigate();
    const createProject = async() => {
        navigate('/create-project')
      }
    
    return (
        <Container>
            {projectList.map((d) => <Project key={d.id} projectName={d.Name} projectId={d.ID} userid={uid}/>)}
            <Button variant="contained" onClick={() => createProject()}>Create New Project</Button>
        </Container>
        
        );

}
export default Projects;
