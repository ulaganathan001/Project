import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topstyle from './Topstyle.css';

const Top3 = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/top3Images')
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);
  return (
    <>
      <div className='container-fluid' style={{  padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 className='text-center mt-4 mb-4' style={{ color: 'blue', fontFamily: 'Arial, sans-serif',  fontWeight: 'bold', padding: '10px', borderRadius: '5px', width: '700px' }}>
            Our Alumni
          </h2>
        </div>
        <br />
        <div className="row">
          {images.map(image => (
            <div key={image.id} className="col-md-4 mb-4">
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
                    style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                  />
                )}
                <div className="card-body text-center">
                  <h5 className="card-title mb-1" style={{ fontWeight: 'bold', fontSize: '20px' }}>{image.name}</h5>
                 
                  <p className="card-text mb-1"><h6>Course : {image.course} </h6></p>
                  <p className="card-text">
                    <i className="bi bi-chat-square-quote-fill"></i>
                    {image.comments}
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
};

export default Top3;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Top3 = () => {
//   const [alumniData, setAlumniData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8081/top3Images')
//       .then(response => setAlumniData(response.data))
//       .catch(error => console.error('Error fetching alumni data:', error));
//   }, []);

//   return (
//     <div className='container-fluid px-4 py-5 testimonial'>
     
//       <div className="row testimonial">
//         {alumniData.map(alumni => (
//           <div key={alumni.id} className="col-md-4 mb-4 text-center">
//              <div className=" bd-placeholder-img " >
//             {/* <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
//               <title>Placeholder</title>
//               <rect width="100%" height="100%" fill="#777" />
//               <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
//             </svg> */}

// {alumni.base64Image && (
//                 <img
//                    src={`data:image/jpeg;base64,${alumni.base64Image}`}
//                    alt={alumni.name}
//                    className="card-img-top img-fluid  mb-3 p-4 alumni-image"
//                    style={{ width: '50%', height: '250px' }}
//                  />
//                )}


//             <h2>{alumni.name}</h2>
//             <h2>{alumni.mobile}</h2>
//             <div className=''><p>{alumni.comments}</p></div>
//             <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
//           </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Top3;

