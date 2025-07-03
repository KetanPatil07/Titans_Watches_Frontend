import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function OrderProduct() {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch orders from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/orders/getall')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  // ✅ Update order status
  const handleStatusChange = async (id, newStatus) => {
    const selectedOrder = orders.find(order => order.id === id);
    if (!selectedOrder) return;

    if (newStatus === 'Cancelled') {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: `Cancel order for ${selectedOrder.productName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No'
      });

      if (!confirm.isConfirmed) return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );

        Swal.fire({
          title: 'Success',
          text: `Status updated to ${newStatus}`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire('Error', 'Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      Swal.fire('Error', 'Server error', 'error');
    }
  };

  return (
    <div className="container ms-5">
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
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
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
