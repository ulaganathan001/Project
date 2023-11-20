import React from 'react'
import { Navbar } from './Components'
import Footer from './Components/Footer'
import Hero from './Components/Hero';
import Delivery from './Components/Delivery';
import Healthy from './Components/Healthy';
import Bestseller from './Components/Bestseller';
import Reviews from './Components/Reviews';
export default function Ladinpage() {
    return (
        <div>
            <Navbar></Navbar>
            <Hero />
                <Delivery />
                <Healthy />
                <Bestseller />
                <Reviews />
                <Footer></Footer>
        </div>
    )
}
