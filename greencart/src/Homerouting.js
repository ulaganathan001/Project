import React from 'react'
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Delivery from './Components/Delivery';
import Healthy from './Components/Healthy';
import { Bestseller } from './Components';
import { Reviews } from './Components';
import AdminNavbar from './AdminNavbar';
import Footer from './Components/Footer';
import Appheader from './Appheader';
import Homepage from './Homepage';
import { Outlet } from 'react-bootstrap-icons';
import Contact from './Contact';
import Product from './Product';
import Home from './Home';
import About from './About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
export default function Homerouting() {
    return (
        <div>
            <Navbar />
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='contact' element={<Contact />} />
                <Route path='product' element={<Product />} />
                <Route path='about' element={<About />}></Route>


            </Routes>
            <Footer></Footer>



        </div>
    )
}
