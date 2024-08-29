import React from 'react'

const UserName=({inputChange, user_name})=>{
    return(
        <div>
            <label className="ip-label">User Name:</label> &nbsp; &nbsp;<br/>
            <input type="text" name="user_name" onChange={inputChange} value={user_name}
     
            style={{
                fontSize:"15px",
                height:25,
                width:270,
            }}/> 
            
        </div>

    )

}

export default UserName