import React from 'react';
import Slider from 'react-slick';
// import TestimonialCard from './TestimonialCard';

import TestimonialCard from './TestimonialCard';
// import './Testimonials.css';
import '../assets/css/Testimonials.css';

const testimonialsData = [
  {
    name: 'Akanksha Nalawade',
    message: 'This product completely changed the way I manage my work!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    role: 'Frontend Developer',
  },
  {
    name: 'Ketan Patil',
    message: 'Amazing support and fast response from the team.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'Backend Developer',
  },
  {
    name: 'Ayesha Gadwal',
    message: 'Great customer support and beautiful product design. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    role: 'UX Designer',
  },
  {
    name: 'Aditya Tapdiya',
     message: 'Shopping on this website was seamless. The interface is intuitive and fast!',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    role: 'Full Stack Developer',
  },
];

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What Our Users Say</h2>
      <Slider {...settings}>
        {testimonialsData.map((testimonial, index) => (
          <div key={index}>
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialsCarousel;