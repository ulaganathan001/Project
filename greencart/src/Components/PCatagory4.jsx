import React from 'react'
import BSimage1 from '../assets/Images/productImg/Carrot.jpg';
import BSimage2 from '../assets/Images/productImg/Tomato.jpg';
import BSimage3 from '../assets/Images/productImg/Tulsi_Cleanse.jpg';
import BSimage4 from '../assets/Images/productImg/Water_melon.jpg';

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

const PCatagory4 = () => {
    return (
        <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        <Card
          imageSrc={BSimage1}
          title="Carrot"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹65 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        
        <Card
          imageSrc={BSimage2}
          title="Tomato"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹187 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
        <Card
          imageSrc={BSimage3}
          title="Tulsi Cleanse"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          price="₹410 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
       
        <Card
          imageSrc={BSimage4}
          title="Water melon"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          price="₹180 / Kg"
          updatedAt="Last updated 3 mins ago"
        />
      </div>
      </div>
    )
}

export default PCatagory4
