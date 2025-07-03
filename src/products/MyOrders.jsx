import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function MyOrders() {
  const { orders, fetchOrders, cancelOrder, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // 🚫 Redirect if not logged in
      return;
    }

    fetchOrders(); // 📦 Get all orders
  }, [user, navigate]);

  const myOrders = orders.filter(order => order.userId === user?.id);

  const statusColor = {
    Pending: 'warning',
    Shipped: 'info',
    Delivered: 'success',
    Cancelled: 'danger',
    Confirm: 'primary',
  };

  const handleCancel = async (orderId, productName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to cancel "${productName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      cancelOrder(orderId); // 🗑️ Cancel logic
      toast.success('Order cancelled successfully', { autoClose: 1000 });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">My Orders</h2>

      {myOrders.length === 0 ? (
        <p className="text-center text-muted">You have no orders yet.</p>
      ) : (
        <div className="row g-4">
          {myOrders.map((order, index) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={order.productImage}
                  className="card-img-top"
                  alt={order.productName}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{order.productName}</h5>
                  <p className="mb-1"><strong>Quantity:</strong> {order.quantity}</p>
                  <p className="mb-1"><strong>Total:</strong> ₹{order.totalPrice}</p>
                  <p className="mb-1"><strong>Payment:</strong> {order.paymentMethod}</p>
                  <p className="mb-1"><strong>Ordered On:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                  <p className="mb-2">
                    <strong>Status:</strong>{' '}
                    <span className={`badge bg-${statusColor[order.status] || 'secondary'}`}>
                      {order.status}
                    </span>
                  </p>

                  {order.status === 'Pending' && (
                    <button
                      className="btn btn-outline-danger btn-sm mt-auto"
                      onClick={() => handleCancel(order.id, order.productName)}
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
