import { Button } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Project from './Project';

function HomePage(){
    const navigate = useNavigate();
    const location = useLocation();
    const [projectList, setProjectList] = useState(null);
    const userId = location.state.userid;
    const [eventHandler, notifyEvent] = useState(0);

    function handleChange(){
        notifyEvent(eventHandler + 1);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/getprojectlist/${userId}`)
        .then(response => response.json())
        .then(data => setProjectList(data.project_list))
    },[eventHandler]);


    const createProject = async () => {
        navigate('/createproject',{state:{userid:userId}});
    }

    const joinProject = async () => {
        navigate('/joinproject',{state:{userid:userId}})
    }

    return (
        <Container>
            {projectList && projectList.map((project) => <Project project_id={project[0]} project_name={project[1]} list_of_users={project[2]} hwset1_used={project[3]} hwset2_used={project[4]} hwset1_availability={project[5]} hwset2_availability={project[6]} user_id={project[7]} onChange={handleChange}/>)}
            <Button variant="contained" onClick={() => createProject()}>Create New Project</Button>
            <Button variant="contained" onClick={() => joinProject()}>Join Project</Button>
        </Container>
    );
}

export default HomePage;