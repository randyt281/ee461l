import React from "react";
import './HWSet.css'
function HWSet (props) {
    
    const hwSet1 = props.hwSet1;
    const hwSet2 = props.hwSet2;

    return ( 
    <span>
        <p className="hw-set">HWSet1: {hwSet1.availability}/{hwSet1.capacity}</p>
        <p className="hw-set">HWSet2: {hwSet2.availability}/{hwSet2.capacity}</p>
    </span>
    );
  
}

export default HWSet;