import React from 'react'

import {  Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import ShowAlumni from './components/ShowAlumni'
import AlumniForm from './components/AlumniForm'
import Navbar from './components/Navbar'
import Footer from './components/Footer'



export default function Routing() {
    return (
        <div>
         <Navbar></Navbar>
        
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="add" element={<AlumniForm/>} />
        {/* <Route path="show" element={<ShowAlumni/>} /> */}
        <Route path='alumni' element={<ShowAlumni></ShowAlumni>}></Route>
      </Routes>
    
        {/* <Footer></Footer> */}
        
        </div>
    )
}
