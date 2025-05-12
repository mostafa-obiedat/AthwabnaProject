// import React, { useState, useEffect } from 'react';

// function ProductForm({ onSubmit, initialData = {}, onCancel }) {
//   const [files, setFiles] = useState([]);
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     sold: 0,
//     category: 'men',
//     size: [],
//     color: [],
//     images: [],
//     stock: 0,
//     ...initialData,
//   });

//   useEffect(() => {
//     setProduct(prev => ({ ...prev, ...initialData }));
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleArrayChange = (name, value) => {
//     setProduct({ ...product, [name]: value.split(',').map(item => item.trim()) });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(product);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
//       <h3 className="text-xl font-bold mb-4">{product._id ? 'Edit' : 'Add'} Product</h3>
//       <input name="name" placeholder="Name" value={product.name} onChange={handleChange} className="input" />
//       <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="input" />
//       <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} className="input" />
//       <input name="stock" type="number" placeholder="Stock" value={product.stock} onChange={handleChange} className="input" />
//       <input name="sold" type="number" placeholder="Sold" value={product.sold} onChange={handleChange} className="input" />
//       <select name="category" value={product.category} onChange={handleChange} className="input">
//         <option value="men">Men</option>
//         <option value="women">Women</option>
//         <option value="kids">Kids</option>
//       </select>
//       <input name="size" placeholder="Sizes (comma separated)" value={product.size.join(',')} onChange={(e) => handleArrayChange('size', e.target.value)} className="input" />
//       <input name="color" placeholder="Colors (comma separated)" value={product.color.join(',')} onChange={(e) => handleArrayChange('color', e.target.value)} className="input" />
//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         onChange={(e) => setFiles(Array.from(e.target.files))}
//         className="input"
//       />
//       <div className="flex gap-2 mt-4">
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//         {onCancel && <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onCancel}>Cancel</button>}
//       </div>
//     </form>
//   );
// }

// export default ProductForm;
import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, initialData = {}, onCancel }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    sold: 0,
    category: 'men',
    size: [],
    color: [],
    stock: 0,
    ...initialData,
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    setProduct(prev => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setProduct({ ...product, [name]: value.split(',').map(item => item.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('sold', product.sold);
    formData.append('category', product.category);
    formData.append('size', product.size.join(','));
    formData.append('color', product.color.join(','));

    files.forEach((file) => {
      formData.append('images', file);
    });

    onSubmit(formData); // أرسل الـ FormData للباك إند
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-4">{product._id ? 'Edit' : 'Add'} Product</h3>

      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        className="input"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="input"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="input"
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        className="input"
      />

      <input
        name="sold"
        type="number"
        placeholder="Sold"
        value={product.sold}
        onChange={handleChange}
        className="input"
      />

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="input"
      >
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
      </select>

      <input
        name="size"
        placeholder="Sizes (comma separated)"
        value={product.size.join(',')}
        onChange={(e) => handleArrayChange('size', e.target.value)}
        className="input"
      />

      <input
        name="color"
        placeholder="Colors (comma separated)"
        value={product.color.join(',')}
        onChange={(e) => handleArrayChange('color', e.target.value)}
        className="input"
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setFiles(Array.from(e.target.files))}
        className="input"
      />

      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
