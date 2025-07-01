import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useStore } from '../context/StoreContext';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [role, setRole] = useState('user');
  const [credentials, setCredentials] = useState({ mobile: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'admin' && credentials.mobile === '1234567891' && credentials.password === 'admin123') {
      setUser({ role: 'admin', name: 'Admin' });
      Swal.fire('Success', 'Admin logged in', 'success');
      navigate('/admin');
    } else if (role === 'user' && credentials.mobile === '1234567890' && credentials.password === 'user123') {
      setUser({ role: 'user', name: 'Ketan' });
      Swal.fire('Success', 'success');
      navigate('/');
    } else {
      Swal.fire('Error', 'Invalid credentials', 'error');
    }
  };

  return (
    <div className="container mt-5 col-md-6 offset-md-3">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Role:</label>
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Mobile:</label>
          <input type="text" name="mobile" className="form-control" value={credentials.mobile} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" name="password" className="form-control" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
