import React from 'react'
import BSimage1 from '../assets/Images/Sugar.jpg';
import BSimage2 from '../assets/Images/Sesame_oil.jpg';
import BSimage3 from '../assets/Images/rice_thooyamalli.jpg';
import BSimage4 from '../assets/Images/Himalayan_Rock_Salt.jpg';

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

const PCatagory1 = () => {
    return (
        
        <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        <Card
          imageSrc={BSimage1}
          title="Organic Sugar"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹135 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        
        <Card
          imageSrc={BSimage2}
          title="Sesame oil"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹652 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        <Card
          imageSrc={BSimage3}
          title="Sesame oil"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹740 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
       
        <Card
          imageSrc={BSimage4}
          title="Himalayan Rock Salt"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹252 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
      </div>
      </div>
      
    )
}

export default PCatagory1
