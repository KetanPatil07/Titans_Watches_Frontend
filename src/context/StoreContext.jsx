// ✅ Full StoreContext.js with User Auth, Orders, Cart, Wishlist, and Add to Cart

import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔐 User login
  const login = async (mobile, password) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // 📝 Register user
  const register = async (userData) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  // 🔓 Logout
  const logout = () => {
    setUser(null);
  };

  // ➕ Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 💖 Toggle Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // 🛒 Place Order
  const placeOrder = async (orderData) => {
    try {
      const response = await fetch("http://localhost:8080/api/orders/AddOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderData, userId: user?.id }),
      });
      if (!response.ok) throw new Error("Failed to place order");
      const savedOrder = await response.json();
      setOrders(prev => [...prev, savedOrder]);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // 📦 Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/orders/getall");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // ❌ Cancel Order
  const cancelOrder = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${id}/status?status=Cancelled`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error("Failed to cancel order");
      fetchOrders();
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  // 🔁 Admin: Update Order Status
  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${id}/status?status=${status}`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        user, setUser, login, register, logout,
        wishlist, setWishlist, toggleWishlist,
        cart, setCart, addToCart,
        orders, setOrders,
        placeOrder,
        fetchOrders,
        cancelOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
