// ImageList.jsx
import React, { useState, useEffect } from 'react';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/getImages');
        if (response.ok) {
          const imageUrls = await response.json();
          setImages(imageUrls);
        } else {
          console.error('Failed to fetch images');
        }
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index + 1}`} style={{ maxWidth: '300px', maxHeight: '300px', margin: '10px' }} />
      ))}
    </div>
  );
};

export default ImageList;
