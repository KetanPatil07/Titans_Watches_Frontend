// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';
import {
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaUserTie,
  FaFemale,
  FaChild,
  FaCrown,
  FaSignOutAlt,
  FaTachometerAlt,
  FaPlus,
  FaEdit,
} from 'react-icons/fa';
import '../assets/css/admin.css';

function Sidebar({ children }) {
  const { user, setUser, orders = [] } = useStore();
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully', { autoClose: 1000 });
    navigate('/login');
  };

  if (user?.role !== 'admin') return <>{children}</>;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h4 className="text-primary fw-bold">MyStore Admin</h4>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>



        <ul className="nav flex-column">
          {/* Dashboard */}
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
              to="/admin/dashboard"
            >
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>

          {/* Best Seller */}
          <li className="nav-item">
            <span className="nav-link menu-toggle" onClick={() => toggleMenu('bestseller')}>
              <FaCrown className="me-2" /> Best Seller
            </span>
            {openMenu === 'bestseller' && (
              <ul className="submenu">
                <li>
                  <Link className="nav-link" to="/admin">
                    <FaPlus className="me-2" /> Add Product
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/update">
                    <FaEdit className="me-2" /> Edit Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Men */}
          <li className="nav-item">
            <span className="nav-link menu-toggle" onClick={() => toggleMenu('men')}>
              <FaUserTie className="me-2" /> Men
            </span>
            {openMenu === 'men' && (
              <ul className="submenu">
                <li>
                  <Link className="nav-link" to="/Mens">
                    <FaPlus className="me-2" /> Add Men Product
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/MensUpdate">
                    <FaEdit className="me-2" /> Edit Men Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Women */}
          <li className="nav-item">
            <span className="nav-link menu-toggle" onClick={() => toggleMenu('women')}>
              <FaFemale className="me-2" /> Women
            </span>
            {openMenu === 'women' && (
              <ul className="submenu">
                <li>
                  <Link className="nav-link" to="/Womens">
                    <FaPlus className="me-2" /> Add Women Product
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/WomensUpdate">
                    <FaEdit className="me-2" /> Edit Women Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Funky */}
          <li className="nav-item">
            <span className="nav-link menu-toggle" onClick={() => toggleMenu('funky')}>
              <FaChild className="me-2" /> Funky
            </span>
            {openMenu === 'funky' && (
              <ul className="submenu">
                <li>
                  <Link className="nav-link" to="/child">
                    <FaPlus className="me-2" /> Add Funky Product
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/childUpdate">
                    <FaEdit className="me-2" /> Edit Funky Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Orders */}
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/orderproduct' ? 'active' : ''}`}
              to="/orderproduct"
            >
              <FaBoxOpen className="me-2" /> Order Product
            </Link>
          </li>
        </ul>

        {/* Logout */}
        <div className="sidebar-footer">
          <div className="fw-bold text-secondary">Welcome: {user.name}</div>
          <button className="btn btn-danger btn-sm mt-2 w-100" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      {!isOpen && (
        <button
          className="btn btn-primary position-fixed top-0 start-0 m-2"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Main Content */}
      <div className="admin-content" style={{ marginLeft: isOpen ? '250px' : '0' }}>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
