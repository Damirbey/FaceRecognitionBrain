import React from "react";

const Navigation = ()=>{
/*Styling the navigation button*/
    const navigationStyle = {
        display:"flex",
        justifyContent:"flex-end"
    }

    return(
    <nav style={navigationStyle}>
        <p className="f3 link dim black underline pa3 pointer">Sign Out</p>
    </nav>    
    )
}

export default Navigation;