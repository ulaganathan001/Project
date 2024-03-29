import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Logo from "./Logos/Logo";

const ExampleCarouselImage = ({ src, alt, text }) => (
  <div className="carousel-image-container">
    <img
      className="d-block w-100"
      src={src}
      alt={alt}
      style={{  height: '400px' }}
    />
    <div className="carousel-image-overlay">
      <p className="overlay-text">{text}</p>
    </div>
  </div>
);

const innerStyles = `
    .carousel-image-container {
      position: relative;
    }

    .carousel-image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .carousel-image-container:hover .carousel-image-overlay {
      opacity: 1;
    }

    .overlay-text {
      color: white;
      font-size: 20px;
      text-align: center;
    }
  `;

const HomeShowAd = () => {
  return (
    <div>
        <style>{innerStyles}</style>
      <Carousel>
        <Carousel.Item interval={1000}>
          <ExampleCarouselImage 
            src="https://assets-global.website-files.com/6063626728ce7dfd0c61a317/61fccc920ea0b5320a4c36bb_What%20is%20KYC.jpeg"
            alt="First slide"
          />
          <Carousel.Caption style={{color:'black'}}>
          
    <Logo></Logo>
      {/* <p style={{backgroundColor:'rgb(228, 222, 222,0.8)',borderRadius:'15px'}}><br></br>
        KYC (Know Your Customer) is a process that financial institutions and other businesses use to verify the identity of their customers. It involves collecting and verifying information such as name, address, date of birth, and other relevant details.
      </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <ExampleCarouselImage 
            src="https://surepass.io/wp-content/uploads/2022/07/Artboard-49-100.jpg"
            alt="Second slide"
          />
          <Carousel.Caption style={{color:'black'}}>
          <Logo></Logo>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage
            src="https://forexsuggest.com/wp-content/uploads/2021/11/Best-forex-brokers-without-KYC_Ban.gif"
            alt="Third slide"
          />
          <Carousel.Caption style={{color:'black'}}>
          <Logo></Logo>
            {/* <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeShowAd;
