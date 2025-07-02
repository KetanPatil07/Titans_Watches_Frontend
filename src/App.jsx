

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



import { StoreProvider } from "./context/StoreContext";
import OrderProduct from "./components/OrderProduct";
import EditProduct from "./components/EditProduct";
import MensWatches from "./components/MensWatches";
import WomensWatches from "./components/WomensWatches";
import FunkyCollection from "./components/FunkyCollection";
import AddMensProduct from "./admin/AddMensProduct";
import AddWomensProduct from "./admin/AddWomensProduct";
import AddFunkyProduct from "./admin/AddFunkyProduct";


import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Addtocart />} />
          <Route path="/orderproduct" element={<OrderProduct />} />
          <Route path="/update" element={<EditProduct />} />
          <Route path="/Mens" element={<AddMensProduct />} />
          <Route path="/Womens" element={<AddWomensProduct />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Addproduct />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/men" element={<MensWatches />} />
          <Route path="/women" element={<WomensWatches />} />
          <Route path="/funky" element={<FunkyCollection />} />
          {/* <Route path="/myorders" element={<MyOrders />} /> */}
          <Route path="/kids" element={<AddFunkyProduct/>}/>
          <Route path="/adminsidebar" element={<AdminLayout/>}/>


          <Route
          path="/admin"
          element={
            <AdminLayout>
             <Addproduct />
            </AdminLayout>
          }
        />


<Route
          path="/Mens"
          element={
            <AdminLayout>
              <AddMensProduct />
            </AdminLayout>
          }
        />
        <Route
          path="/Womens"
          element={
            <AdminLayout>
              <AddWomensProduct />
            </AdminLayout>
          }
        />
        <Route
          path="/child"
          element={
            <AdminLayout>
             <AddFunkyProduct/>
            </AdminLayout>
          }
        />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </StoreProvider>
  );
}

export default App;
