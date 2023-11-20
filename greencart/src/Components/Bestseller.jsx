import React from 'react'
import BSimage1 from '../assets/Images/Sugar.jpg';
import BSimage2 from '../assets/Images/Sesame_oil.jpg';
import BSimage3 from '../assets/Images/rice_thooyamalli.jpg';
import BSimage4 from '../assets/Images/Himalayan_Rock_Salt.jpg';
import BSimage5 from '../assets/Images/Wheat_Flour.jpg';
import BSimage6 from '../assets/Images/groundnut_oil.jpg';



const Card = ({ imageSrc, title, text, updatedAt }) => (
    <div className="card">
      <img src={imageSrc} alt="..." className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        {/* <p className="card-text">
          <small className="text-muted">{updatedAt}</small>
        </p> */}
        <button className='btn btn-warning btn-lg px-4 me-md-2'>Add to Cart</button>
      </div>
    </div>
  );

const Bestseller = () => {
    return (
        <div className="container-fluid px-4 py-5 healthy">
            <h5 className='text-center display-4 mt-4 fw-bold'>
                Our Best Sellers
            </h5>
        <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        <Card
          imageSrc={BSimage1}
          title="Organic Sugar"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          updatedAt="Last updated 3 mins ago"
        />
        
        <Card
          imageSrc={BSimage2}
          title="Sesame oil"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          updatedAt="Last updated 3 mins ago"
        />
  
        <Card
          imageSrc={BSimage3}
          title="rice thooyamalli';
          "
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than height action."
          updatedAt="Last updated 3 mins ago"
        />
        <Card
          imageSrc={BSimage4}
          title="Himalayan Rock Salt"
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          updatedAt="Last updated 3 mins ago"
        />
        
        {/* <Card
          imageSrc={BSimage5}
          title="Sesame oil"
          text="This is a wider card with supporting text below as a natural lead-in to additional content."
          updatedAt="Last updated 3 mins ago"
        />
  
        <Card
          imageSrc={BSimage6}
          title="rice thooyamalli';
          "
          text="This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
          updatedAt="Last updated 3 mins ago"
        /> */}
      </div>
      </div>
      </div>
    );
};

export default Bestseller;
