import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/WatchCategoryCarousel.css';

import carousal1 from '../assets/images/carousal.jpg';
import carousal2 from '../assets/images/carousal2.jpg';
import carousal3 from '../assets/images/carousal3.jpg';

const WatchCategoryCarousel = () => {
  const watchData = [
    { label: 'Men', image: carousal1, link: '/mens' },
    { label: 'Women', image: carousal2, link: '/womens' },
    { label: 'Funky', image: carousal3, link: '/funky' },
  ];

  return (
    <div className="carousel-container">
      {watchData.map((item, index) => (
        <Link to={item.link} key={index} className="circle-card-link">
          <div className="circle-card">
            <img src={item.image} alt={item.label || 'Watch'} />
            
          </div>
          <div className="label text-center mt-2">{item.label}</div>
        </Link>
      ))}
    </div>
  );
};

export default WatchCategoryCarousel;
