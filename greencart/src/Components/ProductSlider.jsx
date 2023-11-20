import React from 'react'
import Slider from "react-slick";
import Slider1 from '../assets/Images/Slider1.jpg';

const ProductSlider = () => {
    var settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <div>
        <h2>Auto Play</h2>
        <Slider {...settings}>
            <Slider>
          <div className='bg-primary' style={{color:"red"}}>
            <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse adipisci vel quia ullam dolor quae ad? Modi quae officiis tempora ratione dolore. Quod laudantium sint tenetur deleniti nostrum, accusantium itaque!</h3>
          </div>
          </Slider>
          <Slider>
          <div className='bg-primary' style={{color:"red"}}>
            <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse adipisci vel quia ullam dolor quae ad? Modi quae officiis tempora ratione dolore. Quod laudantium sint tenetur deleniti nostrum, accusantium itaque!</h3>
          </div>
          </Slider>
         
        </Slider>
      </div>
        // <div className='slider'>
        //     <h5 className='text-center display-4 mt-4 fw-bold text-light'>
        //         Fresh Vegetable Receipes To Bring <br/>
        //         To Your Next Cookout
        //     </h5>
        //     <div className='container'>
        //         <Slider {...settings}>
        //             <div className='p-1'>
        //                 <Slider
        //                     Image={Slider1}
        //                     Description="Celery Vegetables scellion desser resinin made the perfect day vitamin gain as much as better"
        //                 />
        //             </div>
        //             <div className='p-1'>
        //                 <Slider
        //                     Image={Slider1}
        //                     Description="Celery Vegetables scellion desser resinin made the perfect day vitamin gain as much as better"
        //                 />
        //             </div>
        //             <div className='p-1'>
        //                 <Slider
        //                     Image={Slider1}
        //                     Description="Celery Vegetables scellion desser resinin made the perfect day vitamin gain as much as better"
        //                 />
        //             </div>
        //             <div className='p-1'>
        //                 <Slider
        //                     Image={Slider1}
        //                     Description="Celery Vegetables scellion desser resinin made the perfect day vitamin gain as much as better"
        //                 />
        //             </div>
                    
                   
        //         </Slider>
        //     </div>

        // </div>
    )
}

export default ProductSlider
