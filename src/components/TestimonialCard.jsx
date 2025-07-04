// components/TestimonialCard.jsx
import React from 'react';
// import './Testimonials.css';
import '../assets/css/Testimonials.css';

const TestimonialCard = ({ name, message, image, role }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-img-wrapper">
        <img src={image} alt={name} className="testimonial-image" />
      </div>
      <div className="testimonial-content">
        <p className="testimonial-message">"{message}"</p>
        <h3 className="testimonial-name">{name}</h3>
        <p className="testimonial-role">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;