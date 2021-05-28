import React from "react";

const Navigation = ({onRouteChange,isSignedIn})=>{
/*Styling the navigation button*/
    const navigationStyle = {
        display:"flex",
        justifyContent:"flex-end"
    }
       
    if(isSignedIn)
    {
        return(<nav style={navigationStyle}><p onClick={()=>onRouteChange("signIn")} className="f3 link dim black underline pa3 pointer">Sign Out</p></nav>)
    }else{
        return(
            <nav style={navigationStyle}>
                <p onClick={()=>onRouteChange("signIn")} className="f3 link dim black underline pa3 pointer">Sign In</p>
                <p onClick={()=>onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
            </nav> 
        )
    }     
    
}

export default Navigation;