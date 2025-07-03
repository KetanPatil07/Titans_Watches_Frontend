import React from 'react';
import { useStore } from '../context/StoreContext';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Wishlist() {
  const { wishlist, addToCart, setWishlist } = useStore();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    toast.success(`${product.name} moved to cart`);
    navigate('/cart');
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    toast.info('Item removed from wishlist');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-muted">Your wishlist is empty.</p>
      ) : (
        <div className="row g-4">
          {wishlist.map((product) => (
            <div className="col-md-4 col-lg-3" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:8080/${product.photo}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.dis}</p>
                    <p className="card-text fw-bold text-success">₹{product.pprice}</p>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart className="me-2" />
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      <FaTrash />
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

export default Wishlist;
