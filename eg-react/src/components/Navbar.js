import {ShoppingCart } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Shopping.css";

const Navbar = () => {
    return (
        <div className="container">
            <div className="right">
                <h3><NavLink to="/cart" className="cart-link"><ShoppingCart style={{marginLeft:"1500px",fontSize:"34px",color:"black"}}/></NavLink></h3>
            </div>
        </div>
    )
}

export default Navbar;