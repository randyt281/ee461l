import React from 'react';
import Project from './Project.js';
import Container from '@mui/material/Container';
import './Project.css'
class Projects extends React.Component {
    

    render() {
        return (
        <Container>
            <Project projectName="Project 1" listOfUsers="list of users" hwSet1={{availability:"49", capacity:"100"}} hwSet2={{availability:"79", capacity:"100"}}/> <br/>
            <Project projectName="Project 2" listOfUsers="list of users" hwSet1={{availability:"23", capacity:"100"}} hwSet2={{availability:"56", capacity:"100"}}/> <br/>
            <Project projectName="Project 3" listOfUsers="list of users" hwSet1={{availability:"42", capacity:"100"}} hwSet2={{availability:"22", capacity:"100"}}/> <br/>
        </Container>
        );

    }

}
export default Projects;
