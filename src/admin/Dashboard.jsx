// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaThumbsUp,
  FaBoxOpen,
} from 'react-icons/fa';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/orders/getall')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  const countByStatus = (status) =>
    orders.filter((o) => o.status.toLowerCase() === status.toLowerCase()).length;

  const totalOrders = orders.length;
  const pending = countByStatus('pending');
  const confirmed = countByStatus('confirmed');
  const shipped = countByStatus('shipped');
  const delivered = countByStatus('delivered');
  const cancelled = countByStatus('cancelled');

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-primary">📊 Admin Dashboard</h2>

      <div className="row g-4">
        {/* Total Orders */}
        <Card icon={<FaShoppingCart />} bg="primary" label="Total Orders" count={totalOrders} />
        {/* Pending */}
        <Card icon={<FaClock />} bg="warning" text="dark" label="Pending" count={pending} />
        {/* Confirmed */}
        <Card icon={<FaBoxOpen />} bg="info" label="Confirmed" count={confirmed} />
        {/* Shipped */}
        <Card icon={<FaTruck />} bg="secondary" label="Shipped" count={shipped} />
        {/* Delivered */}
        <Card icon={<FaThumbsUp />} bg="success" label="Delivered" count={delivered} />
        {/* Cancelled */}
        <Card icon={<FaTimesCircle />} bg="danger" label="Cancelled" count={cancelled} />
      </div>
    </div>
  );
}

function Card({ icon, bg, label, count, text = 'white' }) {
  return (
    <div className="col-md-4 col-lg-3">
      <div className={`card text-${text} bg-${bg} shadow`}>
        <div className="card-body d-flex align-items-center">
          <div className="me-3">{icon}</div>
          <div>
            <h6>{label}</h6>
            <h4>{count}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
