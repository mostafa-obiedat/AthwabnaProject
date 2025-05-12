// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductForm from './ProductForm';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:5000/api/admin/products', { withCredentials: true });
//     setProducts(res.data.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/admin/products/${id}`, { withCredentials: true });
//     fetchProducts();
//   };
//   const handleSubmit = async (formData) => {
//     try {
//       if (editing) {
//         await axios.put(
//           `http://localhost:5000/api/admin/products/${editing._id}`,
//           formData,
//           {
//             withCredentials: true,
//             headers: { 'Content-Type': 'multipart/form-data' },
//           }
//         );
//       } else {
//         await axios.post(
//           `http://localhost:5000/api/admin/products`,
//           formData,
//           {
//             withCredentials: true,
//             headers: { 'Content-Type': 'multipart/form-data' },
//           }
//         );
//       }
  
//       setEditing(null);
//       setShowForm(false);
//       fetchProducts();
//     } catch (error) {
//       console.error('Error saving product:', error.response?.data || error.message);
//     }
//   };
  
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">📦 Products</h2>
//       <button onClick={() => { setShowForm(true); setEditing(null); }} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Product</button>

//       {showForm && (
//         <ProductForm
//           initialData={editing}
//           onSubmit={handleSubmit}
//           onCancel={() => { setShowForm(false); setEditing(null); }}
//         />
//       )}

//       <ul className="space-y-4">
//         {products.map(product => (
//           <li key={product._id} className="bg-white p-4 rounded shadow">
//               {product.images && (
//               <img
//                 src={`http://localhost:5000${product.images[0]}`}
//                 alt={product.name}
//                 className="w-full max-h-64 object-cover object-center rounded mb-2"
//               />
//             )}
//             <h4 className="text-lg font-bold">{product.name}</h4>
//             <p>Price: JD {product.price}</p>
//             <p>Stock: {product.stock} | Sold: {product.sold}</p>
//             <p>Category: {product.category}</p>
//             <p>Sizes: {product.size.join(', ')}</p>
//             <p>Colors: {product.color.join(', ')}</p>
//             <div className="flex gap-2 mt-2">
//               <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => { setEditing(product); setShowForm(true); }}>Edit</button>
//               <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(product._id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Products;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/products', { withCredentials: true });
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/products/${id}`, { withCredentials: true });
    fetchProducts();
  };

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await axios.put(
          `http://localhost:5000/api/admin/products/${editing._id}`,
          formData,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/admin/products`,
          formData,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
      }

      setEditing(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Products</h2>

      <button
        onClick={() => {
          setShowForm(true);
          setEditing(null);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
      >
        ➕ Add Product
      </button>

      {showForm && (
        <ProductForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            {/* Product Image */}
            {product.images && product.images[0] && (
              <div className="h-48 w-full object-cover w-4 aspect-h-3 mb-4">
                <img
                  src={`http://localhost:5000${product.images[0]}`}
                  alt={product.name}
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            )}

            {/* Product Info */}
            <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-1">💰 JD {product.price}</p>
            <p className="text-sm text-gray-600 mb-1">📦 Stock: {product.stock} | Sold: {product.sold}</p>
            <p className="text-sm text-gray-600 mb-1">📂 Category: {product.category}</p>
            <p className="text-sm text-gray-600 mb-1">📏 Sizes: {product.size.join(', ')}</p>
            <p className="text-sm text-gray-600 mb-3">🎨 Colors: {product.color.join(', ')}</p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
                onClick={() => {
                  setEditing(product);
                  setShowForm(true);
                }}
              >
                ✏️ Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                onClick={() => handleDelete(product._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
