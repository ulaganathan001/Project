import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Topstyle from './Topstyle.css';

const ShowAlumni = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/displayAllData');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching alumni data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='container-fluid' style={{ backgroundColor: '#003060', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 className='text-center mt-4 mb-4' style={{ color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', padding: '10px', borderRadius: '5px' }}>
            Our Alumni
          </h2>
        </div>
        <br />
        <div className="row">
          {images.map(image => (
            <div key={image.id} className="col-md-3 mb-4">
              <div
                key={image.id}
                className="card alumni-card"
                style={{
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#e8f4f9',
                  transition: 'transform 0.3s ease',
                  height: '100%', // Set a fixed height for the card
                }}
              >
                {image.base64Image && (
                  <img
                    src={`data:image/jpeg;base64,${image.base64Image}`}
                    alt={`Alumni - ${image.name}`}
                    className="card-img-top alumni-image"
                    style={{  height:'100%',objectFit: 'cover', width: '100%' }}
                  />
                )}
                <div className="card-body text-center">
                  <h5 className="card-title mb-1" style={{ fontWeight: 'bold', fontSize: '20px' }}>{image.name}</h5>
                  <p className="card-text mb-1" style={{ fontWeight: 'bold', fontSize: '12px' }}>Course : {image.course}</p>
                  <div className="card-text" >
                    <i className="bi bi-chat-square-quote-fill"></i>
                    {image.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowAlumni;
