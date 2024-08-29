import { Button } from "@mui/material";
import React from "react";

const SignInButton=({handleFormSubmit})=>{
    return(
        <div>
            <Button variant="contained" onClick={handleFormSubmit}
             style={{height:34,
                width:250,}}>Sign In</Button>
        </div>
    )
}
export default SignInButton