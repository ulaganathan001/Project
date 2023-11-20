import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <h2>welcome</h2>
            <Link to="dash" className='btn btn-warning btn-lg px-4 me-md-2'>DashBoard</Link>{" "}
            <Link to="cus" className='btn btn-warning btn-lg px-4 me-md-2'>customer</Link>{" "}
            <Link to="pro" className='btn btn-warning btn-lg px-4 me-md-2'>products</Link>{" "}
            <Link to="ser" className='btn btn-warning btn-lg px-4 me-md-2'>service</Link>{" "}
            <Link to="sup" className='btn btn-warning btn-lg px-4 me-md-2'>support</Link>{" "}
            
        </div>
    )
}

export default Nav
