// src/products/Addtocart.jsx

import React from 'react';
import { useStore } from '../context/StoreContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Addtocart() {
  const { cart, setCart, buyNow } = useStore();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    Swal.fire("Removed", "Product removed from cart", "info");
  };

  const handleBuyNow = (product) => {
    buyNow(product);
    navigate('/order', { state: product });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Add To Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          {cart.map((product) => (
            <div className="col-md-4 col-lg-3" key={product.id || product.name}>
              <div className="card h-100 shadow">
                <img
                  src={`http://localhost:8080/${product.photo}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.dis}</p>
                  <p className="card-text fw-bold">₹{product.pprice}</p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(product.id)}
                    >
                      Remove
                    </button>

                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Addtocart;
