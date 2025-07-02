import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { cart, wishlist, user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="sidebar bg-light p-3 border-end vh-100"
        style={{ width: '250px', position: 'fixed', top: 0, left: 0 }}
      >
        <h4 className="mb-4">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            MyStore
          </Link>
        </h4>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {user?.role === 'admin' && (
            <>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  Add Products
                </span>
                <ul className="dropdown-menu show-static">
                  <li>
                    <Link className="dropdown-item" to="/admin">
                      Add All Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Mens">
                      Add Men Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Womens">
                      Add Women Products
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/child">
                      Add Children Products
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orderproduct">
                  Order Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update">
                  Edit Product
                </Link>
              </li>
            </>
          )}

          {user?.role === 'user' && (
            <>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/myorders">
                  My Orders
                </Link>
              </li> */}
              <li className="nav-item">
                <form className="d-flex mt-3" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </li>
            </>
          )}
        </ul>

        {/* Footer actions in sidebar */}
        <div className="mt-auto pt-4">
          <div className="d-flex flex-column gap-3">
            <Link to="/cart" className="text-dark position-relative">
              <i className="fa-solid fa-cart-shopping fs-5 me-2"></i>
              Cart ({cart.length})
            </Link>

            <Link to="/wishlist" className="text-dark position-relative">
              <i className="fa-regular fa-heart fs-5 me-2"></i>
              Wishlist ({wishlist.length})
            </Link>

            {!user ? (
              <Link to="/login" className="text-dark">
                <i className="fa-regular fa-user fs-5 me-2"></i> Login
              </Link>
            ) : (
              <>
                <span className="fw-bold text-secondary">Welcome: {user.name}</span>
                <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Page Content next to sidebar */}
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        {/* Render main page content here */}
        <h2>Welcome to MyStore</h2>
      </div>
    </div>
  );
};

export default Sidebar;
