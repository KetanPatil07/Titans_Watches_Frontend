import React from 'react';
import { useStore } from '../context/StoreContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Wishlist() {
  const { wishlist, addToCart, setWishlist } = useStore();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Add to cart
    setWishlist((prev) => prev.filter((item) => item.id !== product.id)); // ✅ Remove from wishlist
    toast.success(`${product.name} moved to cart`); // ✅ Optional toast
    navigate('/cart'); // ✅ Redirect to cart
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
                  <button
                    className="btn btn-sm btn-primary mt-3"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </button>
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
