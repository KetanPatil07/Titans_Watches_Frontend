import React, { useEffect, useState } from 'react';

function OrderProduct() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
   
    const dummyOrders = [
      {
        id: 1,
        name: 'Ketan',
        email: 'ketan@example.com',
        address: 'Kolhapur, India',
        productName: 'Titan Watch',
        productImage: 'http://localhost:8080/img/titan.jpg',
        quantity: 2,
        price: '1499.50',
        totalPrice: '2999.00',
        paymentMethod: 'UPI',
        orderDate: '2025-06-30',
        status: 'Pending',
      },
      {
        id: 2,
        name: 'Akanksha',
        email: 'akanksha@example.com',
        address: 'Mumbai, India',
        productName: 'Noise Smartwatch',
        productImage: 'http://localhost:8080/img/noise.jpg',
        quantity: 1,
        price: '1999.00',
        totalPrice: '1999.00',
        paymentMethod: 'Cash on Delivery',
        orderDate: '2025-06-29',
        status: 'Delivered',
      }
    ];

    setOrders(dummyOrders);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Address</th>
                <th>Product</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.address}</td>
                  <td>{order.productName}</td>
                  <td>
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{order.quantity}</td>
                  <td>₹{parseFloat(order.price).toFixed(2)}</td>
                  <td>₹{parseFloat(order.totalPrice).toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderProduct;
