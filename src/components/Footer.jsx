import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">About Us</h5>
            <p style={{ lineHeight: '1.8' }}>
              AK Watches is your trusted destination for premium and stylish watches. We combine craftsmanship, elegance, and affordability in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-white text-decoration-none">Products</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact</h5>
            <p className="mb-1"><strong>Email:</strong> support@akwatches.com</p>
            <p className="mb-1"><strong>Phone:</strong> +91 9130374320</p>
            {/* <p className="mb-1"><strong>Phone:</strong> +91 7499208707</p> */}
            <p><strong>Address:</strong> Pune, Maharashtra, India</p>

            {/* Social Media */}
            <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
              <a href="#" className="text-white fs-5"><FaFacebook /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
              <a href="#" className="text-white fs-5"><FaTwitter /></a>
              <a href="#" className="text-white fs-5"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-center mt-3">
          <h6 className="m-0">&copy; 2025 Created by AK. All Rights Reserved.</h6>
        </div>
      </div>
    </footer>
  );
}

export default Footer;