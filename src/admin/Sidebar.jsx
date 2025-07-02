import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';

function Sidebar() {
  const { cart, wishlist, user, setUser } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Show only for admin
  if (user?.role !== 'admin') return null;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-light p-3 border-end vh-100 ${
          isOpen ? '' : 'd-none'
        }`}
        style={{
          width: '250px',
          position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'auto',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Toggle close button */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">MyStore Admin</h4>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Count placeholder */}
        <div className="mb-4 p-3 bg-primary text-white rounded">
          <h5>Dashboard</h5>
          <p>Total Orders: <strong>120</strong></p>
          <p>Pending: <strong>24</strong></p>
        </div>

        <ul className="nav flex-column">
          {/* Best Seller dropdown */}
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              ⭐ Best Seller
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/admin">Add Product</Link></li>
              <li><Link className="dropdown-item" to="/update">Edit Product</Link></li>
            </ul>
          </li>

          {/* Men dropdown */}
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              👔 Men
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/Mens">Add Men Product</Link></li>
            </ul>
          </li>

          {/* Women dropdown */}
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              👗 Women
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/Womens">Add Women Product</Link></li>
            </ul>
          </li>

          {/* Funky dropdown */}
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              🎉 Funky
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/child">Add Funky Product</Link></li>
            </ul>
          </li>

          {/* Orders Page */}
          <li className="nav-item">
            <Link className="nav-link" to="/orderproduct">
              📦 Order Product
            </Link>
          </li>
        </ul>

        {/* Footer actions */}
        <div className="mt-auto pt-4">
          <div className="d-flex flex-column gap-3">
            

            <span className="fw-bold text-secondary">Welcome: {user.name}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Reopen toggle button if sidebar is closed */}
      {!isOpen && (
        <button
          className="btn btn-primary position-fixed top-0 start-0 m-2"
          onClick={() => setIsOpen(true)}
          style={{ zIndex: 1000 }}
        >
          ☰
        </button>
      )}

      {/* Page content wrapper */}
      <div style={{ marginLeft: isOpen ? '250px' : '250px', padding: '20px', width: '100%' }}>
        <h2>Admin Dashboard</h2>
        {/* Your routed content will render outside this sidebar */}
      </div>
    </div>
  );
}

export default Sidebar;
