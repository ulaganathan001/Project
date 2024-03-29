import { Button } from '@mui/material'
import React from 'react'

const SubmitButton=({handleFormSubmit})=>{
    return(
        <div>
            <Button variant='contained' style={{height:34,
            width:250,}}
             onClick={handleFormSubmit}><b className='submit'>Submit</b></Button> 
        </div>

    )
}
export default SubmitButton
