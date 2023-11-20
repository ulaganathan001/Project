import React from 'react'
import BSimage1 from '../assets/Images/productImg/OatFlakes.jpg';
import BSimage2 from '../assets/Images/productImg/Red_Rice_Noodles.jpg';
import BSimage3 from '../assets/Images/productImg/Wheat_Flour.jpg';
import BSimage4 from '../assets/Images/productImg/Himalayan_Rock_Salt.jpg';

const Card = ({ imageSrc, title, text, price }) => (
    <div className="card">
      <img src={imageSrc} alt="..." className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <h5 className="card-title">{price}</h5>
        <button className='btn btn-warning btn-lg px-4 me-md-2'>Add to Cart</button>
      </div>
    </div>
  );

const PCatagory5 = () => {
    return (
        <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        <Card
          imageSrc={BSimage1}
          title="Oat Flakes"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹235 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        
        <Card
          imageSrc={BSimage2}
          title="Red Rice Noodles"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹135 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        <Card
          imageSrc={BSimage3}
          title="Wheat Flour"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹230 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
       
        <Card
          imageSrc={BSimage4}
          title="Himalayan Rock Salt"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹85 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
      </div>
      </div>
    )
}

export default PCatagory5
