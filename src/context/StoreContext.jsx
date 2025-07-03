// src/context/StoreContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Update user state + localStorage
  const setUser = (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(newUser);
  };

  // 🔐 Login user (custom backend)
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
      throw err;
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
      throw err;
    }
  };

  // 🔓 Logout
  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
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
      return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
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

  // 📦 Fetch All Orders (admin or user)
const fetchOrders = async () => {
  try {
    if (!user?.id) return;
    const res = await fetch(`http://localhost:8080/api/orders/user/${user.id}`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    setOrders(data);
  } catch (err) {
    console.error("Error fetching user orders:", err);
  }
};

  // ❌ Cancel Order
  // StoreContext.js

const cancelOrder = async (orderId) => {
  try {
    const res = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Cancelled' }),
    });

    if (!res.ok) {
      throw new Error('Failed to cancel order');
    }

    // Re-fetch updated orders
    fetchOrders();
  } catch (error) {
    console.error('Cancel error:', error);
    toast.error('Failed to cancel order');
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
