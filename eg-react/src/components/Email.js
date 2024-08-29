import React from "react";

const Email=({inputEmailChange, email})=>{
    return(
        <div>
            <label><b>Email:</b></label> <br/>
            <input type='email' name="email"  onChange={inputEmailChange} value={email} required 
            style={{
                fontSize: "15px",
                height: 25,
                width: 270,
            }} />
        </div>
    )
}
export default Email