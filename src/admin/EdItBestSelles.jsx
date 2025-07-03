// src/pages/EditBestSellers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function EditBestSellers() {
  const [products, setProducts] = useState([]);

  // 🔄 Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/titan/AllProduct');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑️ Delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the product permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/titan/deleteproduct/${id}`);
      setProducts(products.filter(p => p.id !== id));
      Swal.fire('Deleted!', 'Product has been deleted.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete product.', 'error');
    }
  };

  return (
    <div className="container mt-5" style={{ marginLeft: '250px', minHeight: '100vh' }}>
      <h2 className="mb-4 fw-bold text-primary">🛍️ Manage Best Seller Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={p.photo}
                      alt={p.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.dis}</td>
                  <td>₹{p.pprice}</td>
                  <td>
                    {/* 🔧 Link to update page (you can create that route separately) */}
                    <Link to={`/update-product/${p.id}`} className="btn btn-sm btn-warning me-2">
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EditBestSellers;
