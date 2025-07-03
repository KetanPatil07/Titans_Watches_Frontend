import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';

function Sidebar({ children }) {
  const { user, setUser } = useStore();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully', { autoClose: 1000 });
    navigate('/login'); // ✅ redirect to login
  };

  if (user?.role !== 'admin') return <>{children}</>; // ✅ Don't render sidebar if not admin

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-light p-3 vh-100 position-fixed ${isOpen ? '' : 'd-none'}`}
        style={{ width: '250px', zIndex: 100 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>MyStore Admin</h4>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <div className="mb-3 p-3 bg-primary text-white rounded">
          <h5>Dashboard</h5>
          <p>Total Orders: <strong>120</strong></p>
          <p>Pending: <strong>24</strong></p>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              ⭐ Best Seller
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/admin">Add Product</Link></li>
              <li><Link className="dropdown-item" to="/update">Edit Product</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              👔 Men
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/Mens">Add Men Product</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              👗 Women
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/Womens">Add Women Product</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              🎉 Funky
            </span>
            <ul className="dropdown-menu show-static">
              <li><Link className="dropdown-item" to="/child">Add Funky Product</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orderproduct">📦 Order Product</Link>
          </li>
        </ul>

        <div className="mt-4">
          <span className="fw-bold text-secondary">Welcome: {user.name}</span>
          <button className="btn btn-outline-danger btn-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar reopen button */}
      {!isOpen && (
        <button
          className="btn btn-primary position-fixed top-0 start-0 m-2"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Main Content */}
      <div style={{ marginLeft: isOpen ? '250px' : '0px', padding: '20px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
