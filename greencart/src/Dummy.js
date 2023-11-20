import React from 'react'
import Hero from './Components/Hero';
import Delivery from './Components/Delivery';
import Healthy from './Components/Healthy';
import { Bestseller } from './Components';
import { Reviews } from './Components';
import { Outlet } from 'react-bootstrap-icons';
import { Navbar } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import Footer from './Components/Footer';

export default function Adminhomepage() {
    return (
        <div>
               
               
                <Hero />
                <Delivery />
                <Healthy />
                <Bestseller />
                <Reviews />
               
                
        </div>
    )
}
