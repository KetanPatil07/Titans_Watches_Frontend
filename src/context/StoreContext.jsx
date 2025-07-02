// src/context/StoreContext.js

import React, { createContext, useContext, useState } from 'react';
// import { toast } from 'react-toastify';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const placeOrder = (orderData) => {
    if (!orderData || !orderData.productName) return;
    setOrders(prev => [...prev, {
      ...orderData,
      status: 'Pending',
      date: new Date().toLocaleString()
    }]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      toast.info(`${product.name} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart`);
    } else {
      toast.info(`${product.name} is already in cart`);
    }
  };

  return (
    <StoreContext.Provider value={{
      cart, setCart,
      wishlist, setWishlist,
      orders, setOrders,
      placeOrder,
      user, setUser,
      addToCart,
      toggleWishlist,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
