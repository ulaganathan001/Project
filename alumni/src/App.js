import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import AlumniForm from './components/AlumniForm';
import ShowAlumni from './components/ShowAlumni';
import Home from './components/Home';
import Routing from './Routing';
import Top3 from './components/Top3';
import Navbar from './components/Navbar';
import NavbarAdmin from './components/NavbarAdmin';
import AdmSideNavRoute from './components/AdminConsole/AdmSideNavRoute';
import NavbarStudent from './components/NavbarStudent';
import StdSideNavRoute from './components/StudentConsole/StdSideNavRoute';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Testimonial from './components/Testimonial';


const App = () => {
  return (
        
  <div>
   
      <BrowserRouter>
    <Routing></Routing>
    </BrowserRouter>
  
     {/* <Navbar></Navbar> 
    <NavbarAdmin></NavbarAdmin>
    <AdmSideNavRoute></AdmSideNavRoute>  */}

  
  {/* <Navbar></Navbar> */}
 
  <Hero></Hero>
  <Top3></Top3> 
   
   <Footer></Footer>  
  </div>
  );
};

export default App;
