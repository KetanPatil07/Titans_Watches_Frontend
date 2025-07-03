import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch product by ID
  useEffect(() => {
    axios.get(`http://localhost:8080/titan/product/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to fetch product');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckbox = (e) => {
    setProduct(prev => ({
      ...prev,
      bestSeller: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/titan/updateproduct/${id}`, product);
      toast.success('Product updated successfully');
      navigate('/admin/edit-products'); // change route if different
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  if (loading) return <div className="p-4">Loading product...</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-primary">✏️ Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea name="dis" value={product.dis} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Price (₹)</label>
          <input type="number" name="pprice" value={product.pprice} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Image Path</label>
          <input type="text" name="photo" value={product.photo} onChange={handleChange} className="form-control" />
          <img
            src={`http://localhost:8080/${product.photo}`}
            alt="Preview"
            className="mt-2"
            style={{ width: '100px', borderRadius: '8px' }}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={product.bestSeller}
            onChange={handleCheckbox}
            id="bestSeller"
          />
          <label className="form-check-label" htmlFor="bestSeller">
            Mark as Best Seller
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProductForm;
