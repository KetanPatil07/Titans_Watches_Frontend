import React from 'react';


import '../assets/css/PhotoGallery.css';

// import carousal from '../assets/images/carousal.jpg'



import { Link } from 'react-router-dom';


const watchData = [
  
  { label: '', image: '../assets/images/carousal.jpg', link: '/mens' },
  { label: '', image: '../assets/images/carousal2.jpg', link: '/womens' },
  { label: '', image: '../assets/images/carousal3.jpg', link: '/funky' },
];

const WatchCategoryCarousel = () => {
  return (
    <div className="carousel-container">
      {watchData.map((item, index) => (
        <Link to={item.link} key={index} className="circle-card-link">
          <div className="circle-card">
            <img src={item.image} alt={item.label || 'Watch'} />
            {item.label && <span className="label">{item.label}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WatchCategoryCarousel;
