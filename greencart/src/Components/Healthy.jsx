import React from 'react'
import HProduct from './HProduct'
import Healthy1 from '../assets/Images/Healthy1.png'
import Healthy2 from '../assets/Images/Healthy2.png'
import Healthy3 from '../assets/Images/Healthy3.png'
import Health1 from '../assets/Images/Health1.jpg'
import Health2 from '../assets/Images/Health2.jpg'
import Health3 from '../assets/Images/Health3.jpg'

const Healthy = () => {
    return (
        <div className="container-fluid px-4 py-5 healthy">
            <h5 className='text-center display-4 mt-4 fw-bold'>
                It's Healthy Eating Made Easy
            </h5>
            <div className='container mt-5'>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <HProduct
                    Image={Health1}
                    Image2={Healthy1}
                    Title="Delicious"
                    Description="Veggies are always good to health and for life as well"
                />
                <HProduct
                    Image={Health2}
                    Image2={Healthy2}
                    Title="Energytic"
                    Description="Veggies are always good to health and for life as well"
                />
                <HProduct
                    Image={Health3}
                    Image2={Healthy3}
                    Title="Glorious"
                    Description="Veggies are always good to health and for life as well"
                />
            </div>
            </div>
        </div>
    )
}

export default Healthy
