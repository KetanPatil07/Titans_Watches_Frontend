import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/OrderForm.css';
import Swal from 'sweetalert2';

const OrderForm = () => {
  const { state: product } = useLocation(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    quantity: 1,
    paymentMethod: 'Cash on Delivery',
  });

  if (!product) {
    return <div style={{ padding: '40px' }}>No product data found. Go back to home.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleBuyNow = (product) => {
    Swal.fire({
      title: 'Purchase Successful!',
      text: `You have bought ${product.name} for ₹${totalPrice.toFixed(2)}`,
      icon: 'success',
    });


    setCart(cart.filter(item => item.id !== product.id));
  };

  const totalPrice = formData.quantity * parseFloat(product.pprice);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      productName: product.name,
      productImage: `http://localhost:8080/${product.photo}`,
      price: product.pprice,
      totalPrice
    };

    navigate('/order-confirmation', { state: orderData });
  };

  return (
    <div className="order-form-container">
      <h2>Order: {product.name}</h2>
      <img
        src={`http://localhost:8080/${product.photo}`}
        alt={product.name}
        className="order-product-img"
      />

      <p><strong>Price per unit:</strong> ₹{product.pprice}</p>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea name="address" required onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>

        <div className="form-group">
          <p className="fw-bold fs-5 text-dark">Total Price: ₹{totalPrice.toFixed(2)}</p>
        </div>

        <button type="submit" onClick={() => handleBuyNow(product)} className="submit-btn">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
