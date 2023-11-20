import React from 'react';
import HeroImage from '../assets/Images/Hero.png'
import Certificate from '../assets/Images/certificate.png'
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="container-fluid  px-4 py-5 hero-container">
            <div className="row flex-lg-row-reverse align-items-center g-5 ">
                <div className="col-10 col-sm-8 col-lg-5">
                    <img src={HeroImage} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                </div>
                <div className="col-lg-6 py-5 hero-text">
                    <h1 className="display-1 fw-bold lh-1 mb-3">
                        <span>Green Cart</span>
                    </h1>
                    <div className="d-flex align-items-center mb-5">
                        <img src={Certificate} alt="ISO Certified" height='100px' width='130px' className="me-3"/>
                        <p className='fw-bold'>
                            We deliver organic fresh vegetables from 
                            Our fields <br/> to your doorstep.
                        </p>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                       <Link to='/product'> <button type="button" className="btn btn-warning btn-lg px-4 me-md-2" rounded-0>Shop Your Veg</button></Link>
                       <Link to='/product'> <button type="button" className="btn btn-light btn-lg px-4" rounded-0>Shop All Products</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
