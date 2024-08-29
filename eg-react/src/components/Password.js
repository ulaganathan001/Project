import React from "react"
const password=({inputPasswordChange,password})=>{
    return(
        <div>
            <label><b>Password:</b></label> <br/>
            <input type="password" name="password" onChange={inputPasswordChange} value={password} required
             style={{
                fontSize: "15px",
                height: 25,
                width: 270,
            }}/>
        </div>
    )

}

export default password