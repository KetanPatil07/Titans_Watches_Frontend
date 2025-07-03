// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    phnumber: '',
    password: '',
    comfirmpass: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.comfirmpass) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/User/Adduser', user);
      Swal.fire('Success', 'Registration successful', 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', 'Mobile number already registered', 'error');
    }
  };

  return (
    <div className="container mt-5 col-md-6 offset-md-3">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" value={user.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mobile Number:</label>
          <input type="text" name="phnumber" className="form-control" value={user.phnumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" name="password" className="form-control" value={user.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Confirm Password:</label>
          <input type="password" name="comfirmpass" className="form-control" value={user.comfirmpass} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
