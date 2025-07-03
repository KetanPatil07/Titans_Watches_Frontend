// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useStore } from '../context/StoreContext';

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const [credentials, setCredentials] = useState({ mobile: '', password: '' });

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 👉 Admin check
    if (credentials.mobile === '1234567891' && credentials.password === 'admin123') {
      setUser({ role: 'admin', name: 'Admin' });
      Swal.fire({
        title: 'Success',
        text: 'Admin logged in',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate('/admin'), 1000);
      return;
    }

    try {
      const res = await axios.get('http://localhost:8080/User/Getuser');
      const users = res.data;

      const matchedUser = users.find(
        (u) => u.phnumber === credentials.mobile && u.password === credentials.password
      );

      if (matchedUser) {
        setUser({ role: 'user', name: matchedUser.name, id: matchedUser.id });
        Swal.fire({
          title: 'Success',
          text: 'User logged in',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate('/'), 1000);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Invalid credentials',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Login failed',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container mt-5 col-md-6 offset-md-3">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            value={credentials.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <div className="text-center mt-3">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
