import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addproduct from "./admin/Addproduct";
import Addtocart from "./products/Addtocart";
import Wishlist from "./products/Wishlist";
import OrderForm from "./components/OrderForm";
import Login from "./components/Login";
import Footer from "./components/Footer";

import { StoreProvider } from "./context/StoreContext";
import OrderProduct from "./components/OrderProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Addtocart />} />
          <Route path="/orderproduct" element={<OrderProduct />} />
          <Route path="/upadate" element={<EditProduct />} />
          
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Addproduct />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* You can add styling class to footer like "bg-dark py-3" */}
        <Footer/>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </StoreProvider>
  );
}

export default App;
