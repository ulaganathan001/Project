import React from "react";

const Home=({userName})=>{
       
    return(
        <div style={{height:'500px'}}>
            <h1 style={{color:"black"}} className="heading">Welcome {userName} !!</h1>
        </div>
    )
}

export default Home;  
