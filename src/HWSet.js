import React from "react";
import './HWSet.css'
function HWSet (props) {
    
    const hwSet1Used = props.hwSet1Used;
    const hwSet2Used = props.hwSet2Used;
    const hwSet1Availability = props.hwSet1Availability;
    const hwSet2Availability = props.hwSet2Availability;

    return ( 
    <span>
        <p className="hw-set">HWSet1: {hwSet1Used}  Available: {hwSet1Availability}</p>
        <p className="hw-set">HWSet2: {hwSet2Used}  Available: {hwSet2Availability}</p>
    </span>
    );
  
}

export default HWSet;