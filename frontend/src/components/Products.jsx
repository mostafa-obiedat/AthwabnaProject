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
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">📦 Products</h2>

//       <button
//         onClick={() => {
//           setShowForm(true);
//           setEditing(null);
//         }}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
//       >
//         ➕ Add Product
//       </button>

//       {showForm && (
//         <ProductForm
//           initialData={editing}
//           onSubmit={handleSubmit}
//           onCancel={() => {
//             setShowForm(false);
//             setEditing(null);
//           }}
//         />
//       )}

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
//             {/* Product Image */}
//             {product.images && product.images[0] && (
//               <div className="h-48 w-full object-cover w-4 aspect-h-3 mb-4">
//                 <img
//                   src={`http://localhost:5000${product.images[0]}`}
//                   alt={product.name}
//                   className="object-cover object-center w-full h-full rounded-lg"
//                 />
//               </div>
//             )}

//             {/* Product Info */}
//             <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
//             <p className="text-sm text-gray-600 mb-1">💰 JD {product.price}</p>
//             <p className="text-sm text-gray-600 mb-1">📦 Stock: {product.stock} | Sold: {product.sold}</p>
//             <p className="text-sm text-gray-600 mb-1">📂 Category: {product.category}</p>
//             <p className="text-sm text-gray-600 mb-1">📏 Sizes: {product.size.join(', ')}</p>
//             <p className="text-sm text-gray-600 mb-3">🎨 Colors: {product.color.join(', ')}</p>

//             {/* Actions */}
//             <div className="flex gap-2">
//               <button
//                 className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
//                 onClick={() => {
//                   setEditing(product);
//                   setShowForm(true);
//                 }}
//               >
//                 ✏️ Edit
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
//                 onClick={() => handleDelete(product._id)}
//               >
//                 🗑️ Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductForm from './ProductForm';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Debounce timer
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchProducts();
//     }, 500); // تأخير نصف ثانية بعد توقف المستخدم عن الكتابة

//     return () => clearTimeout(delayDebounce);
//   }, [search, page]);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/admin/products', {
//         params: { search, page, limit: 6 },
//         withCredentials: true,
//       });
//       setProducts(res.data.data);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error('Failed to fetch products:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
//       withCredentials: true,
//     });
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

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1); // لما المستخدم يغير البحث نرجعه لأول صفحة
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">📦 Products</h2>
//       <button
//         onClick={() => {
//           setShowForm(true);
//           setEditing(null);
//         }}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Add Product
//       </button>

//       <input
//         type="text"
//         placeholder="Search by name..."
//         className="border px-3 py-2 rounded mb-6 w-full sm:w-1/3"
//         value={search}
//         onChange={handleSearchChange}
//       />

//       {showForm && (
//         <ProductForm
//           initialData={editing}
//           onSubmit={handleSubmit}
//           onCancel={() => {
//             setShowForm(false);
//             setEditing(null);
//           }}
//         />
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
//             {product.images?.length > 0 && (
//               <img
//                 src={`http://localhost:5000${product.images[0]}`}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded mb-3"
//               />
//             )}
//             <h4 className="text-lg font-semibold">{product.name}</h4>
//             <p className="text-gray-600">Price: JD {product.price}</p>
//             <p className="text-gray-600">
//               Stock: {product.stock} | Sold: {product.sold}
//             </p>
//             <p className="text-gray-600">Category: {product.category}</p>
//             <p className="text-gray-600">Sizes: {product.size.join(', ')}</p>
//             <p className="text-gray-600">Colors: {product.color.join(', ')}</p>
//             <div className="flex gap-2 mt-3">
//               <button
//                 className="bg-yellow-500 text-white px-3 py-1 rounded"
//                 onClick={() => {
//                   setEditing(product);
//                   setShowForm(true);
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//                 onClick={() => handleDelete(product._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 gap-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 rounded border ${
//                 page === i + 1
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-gray-700'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import ProductForm from './ProductForm';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);

//   // توقيف مؤقت عند الكتابة
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchProducts();
//     }, 500); // تأخير نصف ثانية بعد توقف المستخدم عن الكتابة

//     return () => clearTimeout(delayDebounce);
//   }, [search, page]);

//   const fetchProducts = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/admin/products', {
//         params: { search, page, limit: 6 },
//         withCredentials: true,
//       });
//       setProducts(res.data.data);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error('فشل في جلب المنتجات:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'هل أنت متأكد؟',
//       text: "لن تتمكن من التراجع عن هذا الإجراء!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#AA1313',
//       cancelButtonColor: '#2B2B2B',
//       confirmButtonText: 'نعم، احذفه!',
//       cancelButtonText: 'إلغاء',
//     });
  
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
//           withCredentials: true,
//         });
//         fetchProducts();
//         Swal.fire({
//           title: 'تم الحذف!',
//           text: 'تم حذف المنتج بنجاح.',
//           icon: 'success',
//           confirmButtonColor: '#AA1313'
//       });
//       } catch (error) {
//         Swal.fire(
//           'خطأ!',
//           'فشل في حذف المنتج.',
//           'error'
//         );
//       }
//     }
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
//         Swal.fire({
//           title: 'تم التحديث!',
//           text: 'تم تحديث المنتج بنجاح.',
//           icon: 'success',
//           confirmButtonColor: '#AA1313'
//       });
//       } else {
//         await axios.post(
//           `http://localhost:5000/api/admin/products`,
//           formData,
//           {
//             withCredentials: true,
//             headers: { 'Content-Type': 'multipart/form-data' },
//           }
//         );
//         Swal.fire({
//           title: 'تم الإضافة!',
//           text: 'تم إضافة المنتج بنجاح.',
//           icon: 'success',
//           confirmButtonColor: '#AA1313'
//       });
//       }
  
//       setEditing(null);
//       setShowForm(false);
//       fetchProducts();
//     } catch (error) {
//       Swal.fire(
//         'خطأ!',
//         error.response?.data?.message || 'حدث خطأ أثناء الحفظ.',
//         'error'
//       );
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1); // عندما يغير المستخدم البحث، نرجعه لأول صفحة
//   };

//   return (
//     <div className="p-6 bg-[#FFF7F2]">
//       <div className="max-w-6xl mx-auto px-2">
//       <div className="flex items-center mb-6">
//         <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
//         <h2 className="text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">إدارة المنتجات</h2>
//       </div>

//       <div className="mb-6 flex justify-between flex-wrap gap-4 bg-white p-4 rounded-lg shadow-md">
//         <div className="relative w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="ابحث بالاسم..."
//             className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//         </div>
//         <button
//           onClick={() => {
//             setShowForm(true);
//             setEditing(null);
//           }}
//           className="bg-[#AA1313] text-white px-6 py-3 rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 flex items-center gap-2 cursor-pointer"
//         >
//           <span>+</span>
//           <span>إضافة منتج جديد</span>
//         </button>

//       </div>

//       {showForm && (
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-bold text-[#2B2B2B]">
//               {editing ? 'تعديل منتج' : 'إضافة منتج جديد'}
//             </h3>
//             <button 
//               onClick={() => {
//                 setShowForm(false);
//                 setEditing(null);
//               }}
//               className="text-gray-500 hover:text-[#AA1313] cursor-pointer"
//             >
//               ✕
//             </button>
//           </div>
//           <ProductForm
//             initialData={editing}
//             onSubmit={handleSubmit}
//             onCancel={() => {
//               setShowForm(false);
//               setEditing(null);
//             }}
//           />
//         </div>
//       )}

//       {isLoading ? (
//         <div className="flex items-center justify-center my-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA1313]"></div>
//         </div>
//       ) : products.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-6 text-center">
//           <p className="text-gray-600 text-lg">لا توجد منتجات متطابقة مع البحث</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
//               {product.images?.length > 0 ? (
//                 <div className="relative h-52 overflow-hidden">
//                   <img
//                     src={`http://localhost:5000${product.images[0]}`}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                   />
//                   {product.sold > 0 && (
//                     <span className="absolute top-3 right-3 bg-[#AA1313] text-white text-xs px-2 py-1 rounded-full">
//                       تم بيع {product.sold}
//                     </span>
//                   )}
//                 </div>
//               ) : (
//                 <div className="h-52 bg-gray-200 flex items-center justify-center text-gray-400">
//                   لا توجد صورة
//                 </div>
//               )}
              
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h4 className="text-lg font-semibold text-[#2B2B2B]">{product.name}</h4>
//                   <span className="text-[#AA1313] font-bold">{product.price} د.أ</span>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
//                   <div className="flex items-center">
//                     <span className="ml-1">المخزون:</span>
//                     <span className="font-medium">{product.stock}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="ml-1">الفئة:</span>
//                     <span className="font-medium">{product.category}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="ml-1">المقاسات:</span>
//                     <span className="font-medium">{product.size.join(', ')}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="ml-1">الألوان:</span>
//                     <span className="font-medium">{product.color.join(', ')}</span>
//                   </div>
//                 </div>
                
//                 <div className="flex gap-2 mt-3">
//                   <button
//                     className="bg-[#2B2B2B] hover:bg-[#262626] text-white px-4 py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer"
//                     onClick={() => {
//                       setEditing(product);
//                       setShowForm(true);
//                     }}
//                   >
//                     تعديل
//                   </button>
//                   <button
//                     className="bg-[#AA1313] hover:bg-[#8a0f0f] text-white px-4 py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer"
//                     onClick={() => handleDelete(product._id)}
//                   >
//                     حذف
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* الترقيم */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8">
//           <div className="bg-white rounded-lg shadow-md inline-flex p-1">
//           <button 
//             onClick={() => setPage(prev => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//             className={`px-5 py-2 rounded-lg flex items-center gap-1 ${page === 1
//               ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//               : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
//               } transition-colors duration-300`}
//           >
//             السابق
//           </button>
          
//           <span className="px-5 py-2 flex items-center">
//               <span className="text-[#AA1313] font-bold">{page}</span>
//               <span className="mx-1">من</span>
//               <span className="text-[#2B2B2B]">{totalPages}</span>
//             </span>
          
//           <button 
//             onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={page === totalPages}
//             className={`px-5 py-2 rounded-lg flex items-center gap-1 ${page === totalPages
//               ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//               : 'bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer'
//               } transition-colors duration-300`}
//           >
//             التالي
//           </button>
//           </div>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }

// export default Products;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductForm from './ProductForm';

function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // توقيف مؤقت عند الكتابة
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 500); // تأخير نصف ثانية بعد توقف المستخدم عن الكتابة

    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/products', {
        params: { search, page, limit: 6 },
        withCredentials: true,
      });
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('فشل في جلب المنتجات:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AA1313',
      cancelButtonColor: '#2B2B2B',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
          withCredentials: true,
        });
        fetchProducts();
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تم حذف المنتج بنجاح.',
          icon: 'success',
          confirmButtonColor: '#AA1313'
      });
      } catch (error) {
        Swal.fire(
          'خطأ!',
          'فشل في حذف المنتج.',
          'error'
        );
      }
    }
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
        Swal.fire({
          title: 'تم التحديث!',
          text: 'تم تحديث المنتج بنجاح.',
          icon: 'success',
          confirmButtonColor: '#AA1313'
      });
      } else {
        await axios.post(
          `http://localhost:5000/api/admin/products`,
          formData,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        Swal.fire({
          title: 'تم الإضافة!',
          text: 'تم إضافة المنتج بنجاح.',
          icon: 'success',
          confirmButtonColor: '#AA1313'
      });
      }
  
      setEditing(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      Swal.fire(
        'خطأ!',
        error.response?.data?.message || 'حدث خطأ أثناء الحفظ.',
        'error'
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // عندما يغير المستخدم البحث، نرجعه لأول صفحة
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-[#FFF7F2]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-1 h-8 bg-[#AA1313] ml-2 sm:ml-3"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">إدارة المنتجات</h2>
        </div>

        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg shadow-md">
          <div className="relative w-full sm:w-1/2 md:w-1/3">
            <input
              type="text"
              placeholder="ابحث بالاسم..."
              className="w-full p-2 sm:p-3 pl-8 sm:pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
              value={search}
              onChange={handleSearchChange}
            />
            <span className="absolute left-2 sm:left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
            }}
            className="bg-[#AA1313] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>+</span>
            <span>إضافة منتج جديد</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 mb-6 sm:mb-8 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#2B2B2B]">
                {editing ? 'تعديل منتج' : 'إضافة منتج جديد'}
              </h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="text-gray-500 hover:text-[#AA1313] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <ProductForm
              initialData={editing}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center my-8 sm:my-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#AA1313]"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
            <p className="text-gray-600 text-base sm:text-lg">لا توجد منتجات متطابقة مع البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
                {product.images?.length > 0 ? (
                  <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                    <img
                      src={`http://localhost:5000${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {product.sold > 0 && (
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#AA1313] text-white text-xs px-2 py-1 rounded-full">
                        تم بيع {product.sold}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="h-40 sm:h-48 md:h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                    لا توجد صورة
                  </div>
                )}
                
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-base sm:text-lg font-semibold text-[#2B2B2B] line-clamp-1">{product.name}</h4>
                    <span className="text-[#AA1313] font-bold">{product.price} د.أ</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                    <div className="flex items-center">
                      <span className="ml-1">المخزون:</span>
                      <span className="font-medium">{product.stock}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-1">الفئة:</span>
                      <span className="font-medium truncate max-w-full">{product.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-1">المقاسات:</span>
                      <span className="font-medium truncate max-w-full">{product.size.join(', ')}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-1">الألوان:</span>
                      <span className="font-medium truncate max-w-full">{product.color.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2 sm:mt-3">
                    <button
                      className="bg-[#2B2B2B] hover:bg-[#262626] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                      onClick={() => {
                        setEditing(product);
                        setShowForm(true);
                      }}
                    >
                      تعديل
                    </button>
                    <button
                      className="bg-[#AA1313] hover:bg-[#8a0f0f] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                      onClick={() => handleDelete(product._id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* الترقيم */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="bg-white rounded-lg shadow-md inline-flex p-1">
              <button 
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 text-sm sm:text-base ${page === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
                  } transition-colors duration-300`}
              >
                السابق
              </button>
              
              <span className="px-3 sm:px-5 py-1.5 sm:py-2 flex items-center text-sm sm:text-base">
                <span className="text-[#AA1313] font-bold">{page}</span>
                <span className="mx-1">من</span>
                <span className="text-[#2B2B2B]">{totalPages}</span>
              </span>
              
              <button 
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 text-sm sm:text-base ${page === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer'
                  } transition-colors duration-300`}
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;