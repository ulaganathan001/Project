import React from "react"
const SetPassword=({inputChange,password})=>{
    return(
        <div>
            <label className="ip-label"><b>Password:</b></label> &nbsp; &nbsp;<br/>
            <input  type="password" name="password" onChange={inputChange} value={password}
            style={{
                fontSize:"15px",
                height:25,
                width:270,
            }}/>
        </div>

    )
}
export default SetPassword