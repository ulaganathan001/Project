import React from "react";
import SideMenu from "./SideMenu.js";
const Exercises=({authToken,setAuthToken,setIsSignedIn})=>{
     
    return(
        <div>
            <SideMenu authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>
        </div>
        
    )
}

export default Exercises;