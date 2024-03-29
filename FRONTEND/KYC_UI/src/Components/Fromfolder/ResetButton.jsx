import { Button } from "@mui/material";
import React from 'react'

const ResetButton=({resetForm}) =>{
    return(
        <div>
            <Button variant='contained' type='reset'
            style={{
            height:34,
            width:250,}}
            onClick={resetForm}><b className='reset'>Reset</b> </Button>

        </div>
    )

}
export default ResetButton
