import React from "react";
import './ProjectName.css'

function ProjectName(props) {
    const name = props.projectName; 
    return ( 
           <span className="project-name">{name}</span> 
    );
}

export default ProjectName;