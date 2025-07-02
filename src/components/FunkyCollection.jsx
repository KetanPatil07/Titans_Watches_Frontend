
import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useStore } from "../context/StoreContext";

const FunkyCollection = () => {
  const [products, setProducts] = useState([]);
  const { wishlist, toggleWishlist, cart, addToCart } = useStore();

  useEffect(() => {
    axios.get("http://localhost:8080/Kids/AllProduct")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-bold">Childerns watch</h1>

      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4 col-lg-3" key={product.id}>
            <div className="card h-100 shadow">
              <img
                src={`http://localhost:8080/${product.photo}`}
                className="card-img-top"
                alt={product.name}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.dis}</p>
                <p className="card-text fw-bold">₹{product.pprice}</p>

                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart className="me-1" /> Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`btn btn-sm ${wishlist.find((item) => item.id === product.id)
                      ? "btn-danger"
                      : "btn-outline-danger"
                      }`}
                  >
                    <FaHeart
                      className="me-1"
                      color={wishlist.find((item) => item.id === product.id) ? "white" : "red"}
                    />
                    {wishlist.find((item) => item.id === product.id) ? "Remove" : "Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default FunkyCollection






