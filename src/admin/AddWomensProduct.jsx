import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

const AddWomensProduct = () => {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [dis, setDis] = useState('');
    const [pprice, setPprice] = useState('');
  
    const onImageChange = (e) => {
      setPhoto(e.target.files[0]);
    };
  
    const onSubmitHandle = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("name", name);
      formData.append("dis", dis);
      formData.append("pprice", pprice);
  
      try {
        const res = await axios.post("http://localhost:8080/Women/AddProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
  
        Swal.fire("Success!", `Product added with ID: ${res.data.id}`, "success");
  
        // Reset form
        setPhoto(null);
        setName('');
        setDis('');
        setPprice('');
        document.getElementById("photo").value = ''; // Reset file input
      } catch (err) {
        console.error("Error:", err);
        Swal.fire("Error", "Failed to add product", "error");
      }
    };
  
    return (
      <div className="container ">
        <h2 className="">Add Women Product</h2>
        <form onSubmit={onSubmitHandle} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Product Image:</label>
            <input type="file" className="form-control" id="photo" name="photo" onChange={onImageChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Name:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea className="form-control" value={dis} onChange={(e) => setDis(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input type="number" className="form-control" value={pprice} onChange={(e) => setPprice(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
}

export default AddWomensProduct
