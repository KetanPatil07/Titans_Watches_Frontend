import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>No Order Data Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
      <h2>Order Confirmed!</h2>
      <p>Thank you, <strong>{state.name}</strong>, for ordering <strong>{state.productName}</strong>.</p>
      <img src={state.productImage} alt="product" style={{ width: '120px', margin: '20px auto', borderRadius: '10px' }} />
      <p>Quantity: {state.quantity}</p>
      <p>Delivery Address: {state.address}</p>
      <p>Payment Method: {state.paymentMethod}</p>
      <button onClick={() => navigate('/')}>Back to Products</button>
    </div>
  );
};

export default OrderConfirmation;
