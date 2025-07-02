// src/pages/MyOrders.jsx
import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';

function MyOrders() {
  const { orders, fetchOrders, cancelOrder } = useStore();

  useEffect(() => {
  fetchOrders();
}, []);

  const statusColor = {
    Pending: 'warning',
    Shipped: 'info',
    Delivered: 'success',
    Cancelled: 'danger'
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders yet.</p>
      ) : (
        <div className="row g-4">
          {orders.map((order, index) => (
            <div className="col-md-4 col-lg-3" key={index}>
              <div className="card h-100 shadow">
                <img
                  src={order.productImage}
                  className="card-img-top"
                  alt={order.productName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{order.productName}</h5>
                  <p className="card-text"><strong>Quantity:</strong> {order.quantity}</p>
                  <p className="card-text"><strong>Total:</strong> ₹{order.totalPrice}</p>
                  <p className="card-text"><strong>Payment:</strong> {order.paymentMethod}</p>
                  <p className="card-text"><strong>Ordered On:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Status:</strong>
                    <span className={`badge bg-${statusColor[order.status] || 'secondary'} ms-2`}>
                      {order.status}
                    </span>
                  </p>
                  {order.status === 'Pending' && (
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
