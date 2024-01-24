import React, { useState, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Button } from "react-bootstrap";

import MachineL from "../assets/Images/trending_course/mavhine_learning.jpg";
import JAVA from "../assets/Images/trending_course/java.jpg";
import ArtI from "../assets/Images/trending_course/ai.jpg";
import EthicalH from "../assets/Images/trending_course/EthicalH.jpg";
import NetWorking from "../assets/Images/trending_course/networking.jpg";
import Python from "../assets/Images/trending_course/python.png";
import ReactJS from "../assets/Images/trending_course/reactjs.jpg";
import SpringB from "../assets/Images/trending_course/springboot .jpg";
import ASPdotnet from "../assets/Images/trending_course/aspdotnet.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const items = [
    // slider 1
    <div className="item" key="1" data-value="1">
      <div className="card-header">
        <CardGroup>
          <Card>
            <Card.Img variant="top" src={MachineL} />
            <Card.Body>
              <Card.Title>Artificial Inteligence</Card.Title>

              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className="float-end">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src={ArtI} />
            <Card.Body>
              <Card.Title>Artificial Inteligence</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className="float-end">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src={JAVA} />
            <Card.Body>
              <Card.Title>Java</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className="float-end">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    </div>,
    // slider 2
    <div className="item" key="2" data-value="2">
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={EthicalH} />
          <Card.Body>
            <Card.Title>Ethical Hacking</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="float-end">
              Learn More
            </Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={NetWorking} />
          <Card.Body>
            <Card.Title>Networking</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="float-end">
              Learn More
            </Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={Python} />
          <Card.Body>
            <Card.Title>Python</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="float-end">
              Learn More
            </Button>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>,
    // slider 3
    <div className="item" key="3" data-value="3">
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={ReactJS} />
          <Card.Body>
            <Card.Title>React js</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="float-end">
              Learn More
            </Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={SpringB} />
          <Card.Body>
            <Card.Title>Spring boot</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="float-end">
              Learn More
            </Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src={ASPdotnet} />
          <Card.Body>
            <Card.Title>Asp DotNet</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="float-end">
              Learn More
            </Button>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>,
    // <div className="item" key="4" data-value="4">4</div>,
    // <div className="item" key="5" data-value="5">5</div>,
  ];

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <ReactCarousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        dynamicHeight={false}
        stopOnHover={false}
        emulateTouch
        swipeable={false}
        transitionTime={1000}
        selectedItem={currentIndex}
        onChange={handleChange}
        ref={carouselRef}
      >
        {items}
      </ReactCarousel>
    </div>
  );
};

const HCourse = () => {
  return (
    <div className="container-fluid px-4 py-5 healthy">
      <h5 className="text-center display-4 mt-4 fw-bold">
        <center>Trending Courses</center>
      </h5>
      <Carousel />
    </div>
  );
};

export default HCourse;
