// components/AdminLayout.jsx
import React from 'react';


import Sidebar from '../admin/Sidebar';
import Navbar from './Navbar';
import { useStore } from '../context/StoreContext';
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const { user } = useStore();

  // Redirect to home if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/adminsidebar" />;
  }

  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: '250px' }}>
        <Navbar />
        <div style={{ padding: '20px' }}>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
