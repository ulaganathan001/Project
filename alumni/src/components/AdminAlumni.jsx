import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
export const AdminAlumni = () => {
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/delete/${id}`);
      setImages((prevData) => prevData.filter((data) => data.id !== id));
    } catch (error) {
      console.error('Error deleting book data:', error);
    }
  };

  

  return (
    <div className='container' style={{ backgroundColor: ' #e8f4f9', textAlign: 'center' }}>
      <h2>Show Alumni</h2>
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-md-3 mb-4 " >
             
            <div className="card alumni-card" style={{ width: '80%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', backgroundColor: '' }}>
            <button onClick={() => handleDelete(image.id)} className="btn btn-danger">
                      Delete
                    </button>
              {image.base64Image && (
                <img
                  src={`data:image/jpeg;base64,${image.base64Image}`}
                  alt={`Alumni ${image.id}`}
                  className="card-img-top img-fluid rounded-circle mb-3 p-4 alumni-image"
                  style={{ width: '100%', height: '350px' }}
                />
              )}
              <div className="card-body text-center">
                <h5 className="card-title">Name: {image.name}</h5>
                <textarea class="form-control z-depth-1"  rows="3" placeholder="Write something here..."> {image.comments}</textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


};