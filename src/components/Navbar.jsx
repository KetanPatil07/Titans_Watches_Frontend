import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';

function Navbar() {
  const { cart, wishlist, user, setUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border container-fluid card p-2 sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">MyStore</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* Admin Dropdown */}
            {user?.role === 'admin' && (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add Products
                </span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/admin">Add All Products</Link></li>
                  <li><Link className="dropdown-item" to="/Mens">Add Men Products</Link></li>
                  <li><Link className="dropdown-item" to="/Womens">Add Women Products</Link></li>
                  <li><Link className="dropdown-item" to="/child">Add Children Products</Link></li>
                </ul>
              </li>
            )}

            {/* Admin-only actions */}
            {user?.role === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/orderproduct">Order Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/update">Edit Product</Link>
                </li>
              </>
            )}

            {/* User-only My Orders */}
            {user?.role === 'user' && (
              <li className="nav-item">
                <Link className="nav-link" to="/myorders">My Orders</Link>
              </li>
            )}
          </ul>

          {/* Search box for users */}
          {user?.role === 'user' && (
            <form className="d-flex me-5" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          )}

          {/* Right-side icons */}
          <div className="d-flex align-items-center gap-4">
            <Link to="/cart" className="text-dark position-relative">
              <i className="fa-solid fa-cart-shopping fs-4"></i>
              {cart.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/wishlist" className="text-dark position-relative">
              <i className="fa-regular fa-heart fs-4"></i>
              {wishlist.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {!user ? (
              <Link to="/login" className="text-dark">
                <i className="fa-regular fa-user fs-4"></i>
              </Link>
            ) : (
              <>
                <span className="fw-bold text-secondary">
                  Welcome: {user.name}
                </span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
