import { spacing } from "@mui/system";
import React from "react";
import './ListOfUsers.css'
function ListOfUsers (props) {
    const list = props.listOfUsers;
    return ( 
        <span className="list-users">{list && list.map((user) => <div>{user}</div>)}</span>
    );
        
    
}

export default ListOfUsers;