import React from 'react';
import '../assets/css/PhotoGallery.css';

import gridbg from '../assets/images/gridbg.jpg';
import gridbg2 from '../assets/images/gridbg2.jpg';
import gridbg3 from '../assets/images/gridbg3.jpg';
import gridbg4 from '../assets/images/gridbg4.jpg';
import gridbg5 from '../assets/images/gridbg5.jpg';
import gridbg6 from '../assets/images/gridbg6.jpg';
import gridbg7 from '../assets/images/gridbg7.jpg';
import gridbg8 from '../assets/images/gridbg8.jpg';

const images = [gridbg, gridbg2, gridbg3, gridbg4, gridbg5, gridbg6, gridbg7, gridbg8];

const PhotoGallery = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title  mb-5 fw-bold">Our Watch Collection</h1>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Watch ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
