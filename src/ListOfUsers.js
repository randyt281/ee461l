import { spacing } from "@mui/system";
import React from "react";
import './ListOfUsers.css'
function ListOfUsers (props) {
    const list = props.listOfUsers;
    return ( 
        <span className="list-users">{list}</span>
    );
        
    
}

export default ListOfUsers;