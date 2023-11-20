import React from 'react'
import BSimage1 from '../assets/Images/productImg/Honey_Amla.jpg';
import BSimage2 from '../assets/Images/productImg/Honey_Nuts.jpg';
import BSimage3 from '../assets/Images/productImg/Idly_podi.jpg';
import BSimage4 from '../assets/Images/productImg/jaggery-powder.jpg';
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

const PCatagory3 = () => {
    return (
        <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        <Card
          imageSrc={BSimage1}
          title="Honey Amla"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹410 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        
        <Card
          imageSrc={BSimage2}
          title="Honey Nuts"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹230 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        <Card
          imageSrc={BSimage3}
          title="Idly podi"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹347 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
       
        <Card
          imageSrc={BSimage4}
          title="jaggery powder"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹441 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
      </div>
      </div>
    )
}

export default PCatagory3
