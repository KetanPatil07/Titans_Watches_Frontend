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
import Sidebar from "./admin/Sidebar";

import { StoreProvider, useStore } from "./context/StoreContext";

import OrderProduct from "./components/OrderProduct";
import EditProduct from "./components/EditProduct";
import MensWatches from "./components/MensWatches";
import WomensWatches from "./components/WomensWatches";
import FunkyCollection from "./components/FunkyCollection";
import AddMensProduct from "./admin/AddMensProduct";
import AddWomensProduct from "./admin/AddWomensProduct";
import AddFunkyProduct from "./admin/AddFunkyProduct";
import AdminLayout from "./components/AdminLayout";
import MyOrders from "./products/MyOrders";
import Register from "./components/Register";
import Dashboard from "./admin/Dashboard";
import EdItBestSelles from "./admin/EdItBestSelles";
// import UpdateBestSeller from "./admin/UpadateBestSeller";
// import UpdateProductForm from "./admin/UpadateBestSeller";
import EditMen from "./admin/EditMen";
import EditWomen from "./admin/EditWomen";
import EditKids from "./admin/EditKids";
import UpdateBestSeller from "./admin/UpdateBestSeller";
import UpdateMen from "./admin/UpdateMen";
import UpdateWomen from "./admin/UpdateWomen";
import UpdateKids from "./admin/UpdateKids";

function AppWrapper() {
  const { user } = useStore();

  return (
    <Router>
      {/* Conditionally show navbar/sidebar based on user role */}
      {user?.role === "admin" ? <Sidebar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/orderproduct" element={<OrderProduct />} />
        <Route path="/update" element={<EdItBestSelles />} />
        <Route path="/MensUpdate" element={<EditMen />} />
        <Route path="/WomensUpdate" element={<EditWomen />} />
        <Route path="/childUpdate" element={<EditKids />} />
        <Route path={`/update-bestseller/:id`} element={<UpdateBestSeller />} />
        <Route path={`/update-men/:id`} element={<UpdateMen />} />
        <Route path={`/update-women/:id`} element={<UpdateWomen />} />
        <Route path={`/update-kids/:id`} element={<UpdateKids />} />

        <Route path="/Mens" element={<AdminLayout><AddMensProduct /></AdminLayout>} />
        <Route path="/Womens" element={<AdminLayout><AddWomensProduct /></AdminLayout>} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<AdminLayout><Addproduct /></AdminLayout>} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/men" element={<MensWatches />} />
        <Route path="/women" element={<WomensWatches />} />
        <Route path="/funky" element={<FunkyCollection />} />
        <Route path="/myorders" element={<MyOrders />} />

        <Route path="/kids" element={<AddFunkyProduct />} />
        <Route path="/child" element={<AdminLayout><AddFunkyProduct /></AdminLayout>} />
        
        <Route path="/admin/dashboard" element={<Sidebar><Dashboard /></Sidebar>} />
      </Routes>

      {/* ✅ Show Footer only if not on login/register page */}
      {(user?.role !== 'admin') && <Footer />}

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppWrapper />
    </StoreProvider>
  );
}

export default App;
