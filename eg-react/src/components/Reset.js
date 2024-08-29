import { Button } from "@mui/material";
import React from "react";
const Reset=({resetForm})=>{
    return(
        <div>
            <Button variant="contained"  type='reset' onClick={resetForm} 
            style={{height:34,
                width:250,}}> Reset  </Button>
        </div>
    )
}
export default Reset;