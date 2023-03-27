import React from "react";
import './HWSet.css'
function HWSet (props) {
    
    const hwSet1 = props.hwSet1;
    const hwSet2 = props.hwSet2;

    return ( 
    <span>
        <p className="hw-set">HWSet1: {hwSet1.Availability}/{hwSet1.Capacity}</p>
        <p className="hw-set">HWSet2: {hwSet2.Availability}/{hwSet2.Capacity}</p>
    </span>
    );
  
}

export default HWSet;