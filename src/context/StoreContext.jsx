import React, { createContext, useContext, useState } from 'react';
// import { toast } from 'react-toastify'; // ✅ Make sure this is not commented out

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.info(`${product.name} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart`);
    } else {
      toast.info(`${product.name} is already in cart`);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        wishlist,
        setWishlist,
        user,
        setUser,
        toggleWishlist,  // ✅ Export function
        addToCart        // ✅ Export function
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
