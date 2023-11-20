import React from 'react';
import Logo from './assets/Images/HeaderLogo.png';

import { Link } from "react-router-dom";

const Afterlog = () => {
    const username = sessionStorage.getItem('username');
    return (
        <div className="container-fluid px-5 header sticky-top">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom ">
                <a className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img src={Logo} alt='Green Cart' classNameName="w-50 h-25" />&nbsp;&nbsp;&nbsp;
                    {username ? (
                            <h5 style={{marginTop:"10px"}}>Welcome {username}</h5>
                        ) : (
                            <p>Please log in to see your personalized content.</p>
                        )}
                </a>
               
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    {/* <li><a href="#" className="nav-link px-2 menu-color">Home</a></li>
                    <li><a href="#" className="nav-link px-2 menu-color">Products</a></li>
                    <li><a href="#" className="nav-link px-2 menu-color">About</a></li>
                    <li><a href="#" className="nav-link px-2 menu-color">Contact</a></li> */}

                    <Link to='home' className='btn'>Home</Link>
                    <Link to='product' className='btn'>Product</Link>
                    <Link to='about' className='btn'>About</Link>
                    <Link to='contact' className='btn'>Contact</Link>

                </ul>

                <div className="col-md-2 text-end ">

                        <Link to='/home' className='btn' style={{marginLeft:"5px", marginTop:"7px"}}><h6>Logout</h6></Link>
                </div>
            </header>
        </div>
    )
}

export default Afterlog
