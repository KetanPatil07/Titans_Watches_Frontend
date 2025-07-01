// import React, { useState } from 'react';
// import OrderForm from './OrderForm';
// //import './ProductPage.css'; // Optional styling
// import ProductCard from './ProductCard';
// import './ProductPage.css';

// const ProductPage = () => {
//   const [showForm, setShowForm] = useState(false);

//   const product = {
//     id: 1,
//     name: 'Blue T-Shirt',
//     image: 'https://via.placeholder.com/150',
//     price: 599,
//   };

//   return (
//     <div className="product-page">
//       <h2>{product.name}</h2>
//       <img src={product.image} alt={product.name} className="product-img" />
//       <p>Price: ₹{product.price}</p>
//       <button className="add-to-cart-btn" onClick={() => setShowForm(true)}>
//         Add to Cart
//       </button>

//       {showForm && (
//         <OrderForm product={product} onClose={() => setShowForm(false)} />
//       )}
//     </div>
//   );
// };

// export default ProductPage;



import React, { useState } from 'react';
import ProductCard from './ProductCard';
import OrderForm from './OrderForm';
import './ProductPage.css';

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const products = [
    {
      id: 1,
      name: 'Classic Watch',
      image: 'https://via.placeholder.com/300x200.png?text=Watch+1',
      description: 'Stylish men’s wrist watch with leather strap.',
      price: 1499,
    },
    {
      id: 2,
      name: 'Elegant Watch',
      image: 'https://via.placeholder.com/300x200.png?text=Watch+2',
      description: 'Elegant women’s wrist watch with gold finish.',
      price: 1999,
    }
  ];

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
      ))}

      {selectedProduct && (
        <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductPage;
