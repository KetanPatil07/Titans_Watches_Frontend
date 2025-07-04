import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditKids() {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/Kids/AllProduct');
      setProducts(res.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      await axios.delete(`http://localhost:8080/Kids/deleteproduct/${id}`);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
     <div className="container mt-5" style={{ marginLeft: '250px', minHeight: '100vh' }}>
          <h2 className="mb-4 fw-bold text-primary">🛍️ Manage Kids Products</h2>
    
          {loading ? (
            <div>Loading products...</div>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <>
              <p className="text-muted">Showing {products.length} products</p>
    
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
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
                            src={`http://localhost:8080/${p.photo}`}
                            alt={p.name}
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                              borderRadius: '5px'
                            }}
                            onError={(e) =>
                              (e.target.src = 'https://via.placeholder.com/60x60?text=No+Image')
                            }
                          />
                        </td>
                        <td>
                          {p.name}{' '}
                          {p.bestSeller && (
                            <span className="badge bg-success ms-2">Kids</span>
                          )}
                        </td>
                        <td>{p.dis}</td>
                        <td>₹{p.pprice}</td>
                        <td>
                          <Link
                            to={`/update-kids/${p.id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(p.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
    </>
  )
}

export default EditKids