import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleWishlist = () => setWishlisted(!wishlisted);

  const handleAddToCart = () => {
    navigate('/order', { state: product });
  };

  return (
    <div className="product-card">
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.name} className="product-img" />
        <button className={`wishlist-btn ${wishlisted ? 'active' : ''}`} onClick={handleWishlist}>♥</button>
      </div>
      <div className="card-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">₹{product.price}</p>
        <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
