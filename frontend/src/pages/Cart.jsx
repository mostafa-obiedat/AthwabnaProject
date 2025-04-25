// import React, { useState, useEffect } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [suggestedProducts, setSuggestedProducts] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // جلب تفاصيل السلة
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/cart", { withCredentials: true });
//         setCart(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   // التحقق من حالة المصادقة
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/auth/check", { withCredentials: true });
//         setIsAuthenticated(response.data.isAuthenticated);
//       } catch (err) {
//         console.error("فشل التحقق من المصادقة:", err);
//       }
//     };

//     checkAuth();
//   }, []);

//   // جلب المنتجات المقترحة
//   useEffect(() => {
//     const fetchSuggestedProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products/related/men");
//         setSuggestedProducts(response.data);
//       } catch (err) {
//         console.error("فشل جلب المنتجات المقترحة:", err);
//       }
//     };

//     fetchSuggestedProducts();
//   }, []);

//   // Auto scroll effect
//   useEffect(() => {
//     if (suggestedProducts.length > 0) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//         );
//       }, 3000);

//       return () => clearInterval(timer);
//     }
//   }, [suggestedProducts]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? suggestedProducts.length - 4 : prevIndex - 1
//     );
//   };

//   if (loading) {
//     return <div className="text-center py-5">جاري التحميل...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;
//   }

//   if (!cart) {
//     return <div className="text-center py-5">السلة فارغة</div>;
//   }

//   return (
//     <div className="bg-rose-50 min-h-screen p-8">
//       <h1 className="text-right text-2xl font-bold mb-8">سلة التسوق</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Summary Section */}
//         <div className="lg:col-span-1">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-6 text-right">الملخص</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span>{cart.totalAmount} دينار</span>
//                 <span>الإجمالي</span>
//               </div>
//               <hr className="my-4" />
//               <div className="flex justify-between font-bold">
//                 <span>{cart.totalAmount} دينار</span>
//                 <span>الإجمالي النهائي</span>
//               </div>
//             </div>
//             {isAuthenticated ? (
//               <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition">
//                 التوجه إلى الدفع
//               </button>
//             ) : (
//               <button
//                 className="w-full mt-6 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition"
//                 onClick={() => navigate("/login")}
//               >
//                 سجل الدخول لإكمال الشراء
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className="lg:col-span-2">
//           {cart.products.map((product) => (
//             <div key={product._id} className="bg-white p-6 rounded-lg shadow-sm mb-6">
//               <div className="flex items-start justify-between">
//                 <button className="text-2xl text-gray-400">&times;</button>
//                 <div className="flex gap-6">
//                   <div className="text-right">
//                     <h3 className="font-bold text-lg mb-2">{product.name}</h3>
//                     <p className="text-gray-600 mb-1">المقاس: {product.size}</p>
//                     <p className="text-gray-600 mb-2">الكمية: {product.quantity}</p>
//                     <p className="text-red-500 font-bold">{product.price} دينار</p>
//                   </div>
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-24 h-32 object-cover rounded"
//                   />
//                 </div>
//               </div>
//               <button className="mt-4 text-gray-600 flex items-center gap-2 hover:text-gray-800">
//                 <span>أضف إلى المفضلة</span>
//                 <span>♡</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Suggested Products Carousel Section */}
//       <div className="mt-12">
//         <h2 className="text-right text-xl font-bold mb-6">قد يعجبك أيضا</h2>
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(${currentIndex * 25}%)` }}
//             >
//               {suggestedProducts.map((product) => (
//                 <div key={product._id} className="flex-none w-1/4 px-2">
//                   <div className="bg-white p-4 rounded-lg shadow-sm">
//                     <img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="w-full h-40 object-cover rounded-lg mb-3"
//                     />
//                     <div className="text-right">
//                       <p className="text-sm mb-2">{product.name}</p>
//                       <p className="font-bold mb-2">{product.price} دينار</p>
//                       <button className="text-gray-600 hover:text-gray-800">
//                         أضف للسلة ♡
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={prevSlide}
//             className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



// import React, { useState, useEffect } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [suggestedProducts, setSuggestedProducts] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // جلب السلة من localStorage
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//     setLoading(false);
//   }, []);

//   // التحقق من حالة المصادقة
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/auth/check", { withCredentials: true });
//         setIsAuthenticated(response.data.isAuthenticated);
//       } catch (err) {
//         console.error("فشل التحقق من المصادقة:", err);
//       }
//     };

//     checkAuth();
//   }, []);

//   // جلب المنتجات المقترحة من MongoDB
//   useEffect(() => {
//     const fetchSuggestedProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products/related/men"); // تعديل الـ API هنا
//         setSuggestedProducts(response.data);
//       } catch (err) {
//         console.error("فشل جلب المنتجات المقترحة:", err);
//       }
//     };

//     fetchSuggestedProducts();
//   }, []);

//   // Auto scroll effect
//   useEffect(() => {
//     if (suggestedProducts.length > 0) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//         );
//       }, 3000);

//       return () => clearInterval(timer);
//     }
//   }, [suggestedProducts]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? suggestedProducts.length - 4 : prevIndex - 1
//     );
//   };

//   if (loading) {
//     return <div className="text-center py-5">جاري التحميل...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;
//   }

//   if (cart.length === 0) {
//     return <div className="text-center py-5">السلة فارغة</div>;
//   }

//   return (
//     <div className="bg-rose-50 min-h-screen p-8">
//       <h1 className="text-right text-2xl font-bold mb-8">سلة التسوق</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Summary Section */}
//         <div className="lg:col-span-1">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-6 text-right">الملخص</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} دينار</span>
//                 <span>الإجمالي</span>
//               </div>
//               <hr className="my-4" />
//               <div className="flex justify-between font-bold">
//                 <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} دينار</span>
//                 <span>الإجمالي النهائي</span>
//               </div>
//             </div>
//             {isAuthenticated ? (
//               <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition">
//                 التوجه إلى الدفع
//               </button>
//             ) : (
//               <button
//                 className="w-full mt-6 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition"
//                 onClick={() => navigate("/login")}
//               >
//                 سجل الدخول لإكمال الشراء
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className="lg:col-span-2">
//           {cart.map((product) => (
//             <div key={product.productId} className="bg-white p-6 rounded-lg shadow-sm mb-6">
//               <div className="flex items-start justify-between">
//                 <button className="text-2xl text-gray-400">&times;</button>
//                 <div className="flex gap-6">
//                   <div className="text-right">
//                     <h3 className="font-bold text-lg mb-2">{product.title}</h3>
//                     <p className="text-gray-600 mb-1">المقاس: {product.size}</p>
//                     <p className="text-gray-600 mb-2">الكمية: {product.quantity}</p>
//                     <p className="text-red-500 font-bold">{product.price} دينار</p>
//                   </div>
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="w-24 h-32 object-cover rounded"
//                   />
//                 </div>
//               </div>
//               <button className="mt-4 text-gray-600 flex items-center gap-2 hover:text-gray-800">
//                 <span>أضف إلى المفضلة</span>
//                 <span>♡</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Suggested Products Carousel Section */}
//       <div className="mt-12">
//         <h2 className="text-right text-xl font-bold mb-6">قد يعجبك أيضا</h2>
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(${currentIndex * 25}%)` }}
//             >
//               {suggestedProducts.map((product) => (
//                 <div key={product._id} className="flex-none w-1/4 px-2">
//                   <div className="bg-white p-4 rounded-lg shadow-sm">
//                     <img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="w-full h-40 object-cover rounded-lg mb-3"
//                     />
//                     <div className="text-right">
//                       <p className="text-sm mb-2">{product.name}</p>
//                       <p className="font-bold mb-2">{product.price} دينار</p>
//                       <button className="text-gray-600 hover:text-gray-800">
//                         أضف للسلة ♡
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={prevSlide}
//             className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useState, useEffect } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [suggestedProducts, setSuggestedProducts] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [editingSize, setEditingSize] = useState(null);
// const [tempSize, setTempSize] = useState('');
// const [editingQuantity, setEditingQuantity] = useState(null);
// const [tempQuantity, setTempQuantity] = useState(1);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users/check", {
//           withCredentials: true
//         });

//         if (response.data.isAuthenticated) {
//           setIsAuthenticated(true);
//         }
//       } catch (err) {
//         if (err.response?.status === 401) {
//           setIsAuthenticated(false);
//         }
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     const fetchSuggestedProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products/related/men");
//         setSuggestedProducts(response.data);
//       } catch (err) {
//         console.error("فشل جلب المنتجات المقترحة:", err);
//       }
//     };

//     fetchSuggestedProducts();
//   }, []);

//   useEffect(() => {
//     if (suggestedProducts.length > 0) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//         );
//       }, 3000);

//       return () => clearInterval(timer);
//     }
//   }, [suggestedProducts]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? suggestedProducts.length - 4 : prevIndex - 1
//     );
//   };

//   const handleRemoveFromCart = (productId, size) => {
//     const updatedCart = cart.filter(
//       (item) => !(item.productId === productId && item.size === size)
//     );
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

// // دوال جديدة لتعديل المقاس
// const startEditingSize = (productId, size) => {
//   setEditingSize(productId);
//   setTempSize(size);
// };

// const saveSize = (productId, oldSize) => {
//   const updatedCart = cart.map(item => 
//     item.productId === productId && item.size === oldSize
//       ? { ...item, size: tempSize }
//       : item
//   );
//   setCart(updatedCart);
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   setEditingSize(null);
// };

// // دوال تعديل الكمية (تعديل بسيط على الدوال الحالية)
// const startEditingQuantity = (productId, quantity) => {
//   setEditingQuantity(productId);
//   setTempQuantity(quantity);
// };

// const saveQuantity = (productId) => {
//   const updatedCart = cart.map(item => 
//     item.productId === productId
//       ? { ...item, quantity: tempQuantity }
//       : item
//   );
//   setCart(updatedCart);
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   setEditingQuantity(null);
// };


//   if (loading) {
//     return <div className="text-center py-5">جاري التحميل...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;
//   }

//   if (cart.length === 0) {
//     return <div className="text-center py-5">السلة فارغة</div>;
//   }

//   return (
//     <div className="bg-rose-50 min-h-screen p-8">
//       <h1 className="text-right text-2xl font-bold mb-8">سلة التسوق</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* تفاصيل المنتجات */}
//         <div className="lg:col-span-2">
//           {cart.map((product) => (
//             <div key={`${product.productId}-${product.size}`} className="bg-white p-6 rounded-lg shadow-sm mb-6">
//               <div className="flex items-start gap-4">
//                 {/* صورة المنتج */}
//                 <img
//                   src={`http://localhost:5000${product.image}`}
//                   alt={product.title}
//                   className="w-24 h-32 object-cover rounded"
//                 />

//                 {/* محتوى أفقي */}
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start text-right">
//                     {/* اسم المنتج */}
//                     <div className="flex flex-col">
//                       <p className="text-gray-500 text-sm">اسم المنتج</p>
//                       <h3 className="font-bold">{product.title}</h3>
//                     </div>

//                      {/* قسم المقاس */}
//   <div className="mb-2">
//     <p className="text-gray-500 text-sm">المقاس</p>
//     {editingSize === product.productId ? (
//       <div className="flex items-center justify-end gap-2">
//         <select
//           className="border rounded p-1 text-sm"
//           value={tempSize}
//           onChange={(e) => setTempSize(e.target.value)}
//         >
//           {product.availableSizes?.map(size => (
//             <option key={size} value={size}>{size}</option>
//           ))}
//         </select>
//         <button 
//           className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
//           onClick={() => saveSize(product.productId, product.size)}
//         >
//           حفظ
//         </button>
//         <button 
//           className="px-2 py-1 bg-gray-200 rounded text-sm"
//           onClick={() => setEditingSize(null)}
//         >
//           إلغاء
//         </button>
//       </div>
//     ) : (
//       <div className="flex justify-end items-center">
//         <span>{product.size}</span>
//         <button 
//           className="text-blue-500 text-sm mr-2"
//           onClick={() => startEditingSize(product.productId, product.size)}
//         >
//           تغيير
//         </button>
//       </div>
//     )}
//   </div>

//           {/* السعر */}
//           <div className="flex flex-col">
//             <p className="text-gray-500 text-sm">السعر</p>
//             <div className="flex gap-1">
//               <p className="text-red-500 font-bold">{product.price} دينار</p>
//               {product.discountedPrice && (
//                 <p className="text-gray-700 line-through">دينار {product.discountedPrice}</p>
//               )}
//             </div>
//           </div>
//  {/* قسم الكمية */}
//    <div>
//     <p className="text-gray-500 text-sm">الكمية</p>
//     {editingQuantity === product.productId ? (
//       <div className="flex items-center justify-end gap-2">
//         <button 
//           className="px-2 py-1 bg-gray-200 rounded"
//           onClick={() => setTempQuantity(prev => Math.max(1, prev - 1))}
//         >
//           -
//         </button>
//         <span className="mx-2">{tempQuantity}</span>
//         <button 
//           className="px-2 py-1 bg-gray-200 rounded"
//           onClick={() => setTempQuantity(prev => prev + 1)}
//         >
//           +
//         </button>
//         <button 
//           className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
//           onClick={() => saveQuantity(product.productId)}
//         >
//           حفظ
//         </button>
//         <button 
//           className="px-2 py-1 bg-gray-200 rounded text-sm"
//           onClick={() => setEditingQuantity(null)}
//         >
//           إلغاء
//         </button>
//       </div>
//     ) : (
//       <div className="flex justify-end items-center">
//         <span>{product.quantity}</span>
//         <button 
//           className="text-blue-500 text-sm mr-2"
//           onClick={() => startEditingQuantity(product.productId, product.quantity)}
//         >
//           تغيير
//         </button>
//       </div>
//     )}
//   </div>


//                     {/* زر الحذف */}
//                     <button
//                       className="text-2xl text-gray-400 hover:text-red-600 transition"
//                       onClick={() => handleRemoveFromCart(product.productId, product.size)}
//                     >
//                       &times;
//                     </button>
//                   </div>

//                   {/* إضافة إلى المفضلة */}
//                   <p className="text-blue-500 text-sm text-right mt-2">إضافة الى المفضلة</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ملخص الطلب */}
//         <div className="lg:col-span-1">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-6 text-right">ملخص الطلب</h2>

//             <div className="space-y-3 text-right">
//               {/* 1. السعر */}
//               <div className="flex justify-between">
//                 <span className="text-gray-600">السعر</span>
//                 <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} دينار</span>
//               </div>

//               {/* 2. التوصيل */}
//               <div className="flex justify-between">
//                 <span className="text-gray-600">تكلفة التوصيل</span>
//                 <span className="text-green-600">مجاني</span>
//               </div>

//               {/* 3. التخفيضات */}
//               <div className="flex justify-between">
//                 <span className="text-gray-600">التخفيضات</span>
//                 <span className="text-red-600">-{cart.reduce((total, item) => item.discount ? total + item.discount : total, 0)} دينار</span>
//               </div>

//               {/* الخط الفاصل */}
//               <hr className="my-3 border-gray-200" />

//               {/* 4. الإجمالي */}
//               <div className="flex justify-between font-bold text-lg pt-2">
//                 <span>الإجمالي النهائي</span>
//                 <span>
//                   {cart.reduce((total, item) => {
//                     const itemTotal = item.price * item.quantity;
//                     const discount = item.discount || 0;
//                     return total + itemTotal - discount;
//                   }, 0)} دينار
//                 </span>
//               </div>
//             </div>

//             {/* زر الدفع */}
//             {isAuthenticated ? (
//               <button
//                 className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
//                 onClick={() => navigate("/checkout")}
//               >
//                 إتمام عملية الشراء
//               </button>
//             ) : (
//               <div className="text-right mt-6">
//                 <p className="text-sm text-gray-600 mb-2">يجب تسجيل الدخول لإكمال الشراء</p>
//                 <button
//                   className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
//                   onClick={() => navigate("/login")}
//                 >
//                   تسجيل الدخول
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Suggested Products Carousel Section */}
//       <div className="mt-12">
//         <h2 className="text-right text-xl font-bold mb-6">قد يعجبك أيضا</h2>
//         <div className="relative">
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(${currentIndex * 25}%)` }}
//             >
//               {suggestedProducts.map((product) => (
//                 <div key={product._id} className="flex-none w-1/4 px-2">
//                   <div className="bg-white p-4 rounded-lg shadow-sm">
//                     <img
//                       src={`http://localhost:5000${product.images[0]}`}
//                       alt={product.name}
//                       className="w-full h-40 object-cover rounded-lg mb-3"
//                     />
//                     <div className="text-right">
//                       <p className="text-sm mb-2">{product.name}</p>
//                       <p className="font-bold mb-2">{product.price} دينار</p>
//                       <button className="text-gray-600 hover:text-gray-800">
//                         أضف للسلة ♡
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={prevSlide}
//             className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import {
  FaHeart,
  FaArrowLeft,
  FaStar,
  FaRegStar,
} from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingSize, setEditingSize] = useState(null);
  const [tempSize, setTempSize] = useState("");
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [tempQuantity, setTempQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/check", {
          withCredentials: true
        });
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/related/men");
        setSuggestedProducts(response.data);
      } catch (err) {
        console.error("فشل جلب المنتجات المقترحة:", err);
      }
    };
    fetchSuggestedProducts();
  }, []);

  useEffect(() => {
    if (suggestedProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [suggestedProducts]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? suggestedProducts.length - 4 : prevIndex - 1
    );
  };

  const handleRemoveFromCart = (productId, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(removeFromCart({ productId, size }));
  };

  const startEditingSize = (productId, size) => {
    setEditingSize(productId);
    setTempSize(size);
  };

  const saveSize = (productId, oldSize) => {
    const updatedCart = cart.map(item =>
      item.productId === productId && item.size === oldSize
        ? { ...item, size: tempSize }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setEditingSize(null);
  };

  const startEditingQuantity = (productId, quantity) => {
    setEditingQuantity(productId);
    setTempQuantity(quantity);
  };

  const saveQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: tempQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setEditingQuantity(null);
  };

{/* يجب إضافة دالة renderStars للكود إذا لم تكن موجودة */}

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return stars;
} 


  if (loading) {
    return <div className="text-center py-5">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;
  }

  if (cart.length === 0) {
    return <div className="text-center py-5">السلة فارغة</div>;
  }

  return (
    <div className="min-h-screen p-8 container mx-auto py-8 px-4">
      <h1 className="text-right text-2xl font-bold mb-8">سلة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* تفاصيل المنتجات */}
        <div className="lg:col-span-2">
          {cart.map((product) => (
            <div key={`${product.productId}-${product.size}`} className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex items-start gap-4">
                {/* صورة المنتج */}
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.title}
                  className="w-24 h-32 object-cover rounded"
                />

                {/* محتوى أفقي */}
                <div className="flex-1">
                  <div className="flex justify-between items-start text-right">
                    {/* اسم المنتج */}
                    <div className="flex flex-col">
                      <p className="text-gray-500 text-sm">اسم المنتج</p>
                      <h3 className="font-bold">{product.title}</h3>
                    </div>

                     {/* قسم المقاس */}
  <div className="mb-2">
    <p className="text-gray-500 text-sm">المقاس</p>
    {editingSize === product.productId ? (
      <div className="flex items-center justify-end gap-2">
        <select
          className="border rounded p-1 text-sm"
          value={tempSize}
          onChange={(e) => setTempSize(e.target.value)}
        >
          {product.availableSizes?.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <button 
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
          onClick={() => saveSize(product.productId, product.size)}
        >
          حفظ
        </button>
        <button 
          className="px-2 py-1 bg-gray-200 rounded text-sm"
          onClick={() => setEditingSize(null)}
        >
          إلغاء
        </button>
      </div>
    ) : (
      <div className="flex justify-end items-center">
        <span>{product.size}</span>
        <button 
          className="text-blue-500 text-sm mr-2"
          onClick={() => startEditingSize(product.productId, product.size)}
        >
          تغيير
        </button>
      </div>
    )}
  </div>

          {/* السعر */}
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">السعر</p>
            <div className="flex gap-1">
              <p className="text-red-500 font-bold">{product.price} دينار</p>
              {product.discountedPrice && (
                <p className="text-gray-700 line-through">دينار {product.discountedPrice}</p>
              )}
            </div>
          </div>
 {/* قسم الكمية */}
   <div>
    <p className="text-gray-500 text-sm">الكمية</p>
    {editingQuantity === product.productId ? (
      <div className="flex items-center justify-end gap-2">
        <button 
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => setTempQuantity(prev => Math.max(1, prev - 1))}
        >
          -
        </button>
        <span className="mx-2">{tempQuantity}</span>
        <button 
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => setTempQuantity(prev => prev + 1)}
        >
          +
        </button>
        <button 
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
          onClick={() => saveQuantity(product.productId)}
        >
          حفظ
        </button>
        <button 
          className="px-2 py-1 bg-gray-200 rounded text-sm"
          onClick={() => setEditingQuantity(null)}
        >
          إلغاء
        </button>
      </div>
    ) : (
      <div className="flex justify-end items-center">
        <span>{product.quantity}</span>
        <button 
          className="text-blue-500 text-sm mr-2"
          onClick={() => startEditingQuantity(product.productId, product.quantity)}
        >
          تغيير
        </button>
      </div>
    )}
  </div>


                    {/* زر الحذف */}
                    <button
                      className="text-2xl text-gray-400 hover:text-red-600 transition"
                      onClick={() => handleRemoveFromCart(product.productId, product.size)}
                    >
                      &times;
                    </button>
                  </div>

                  {/* إضافة إلى المفضلة */}
                  <p className="text-blue-500 text-sm text-right mt-2">إضافة الى المفضلة</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ملخص الطلب */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-right">ملخص الطلب</h2>

            <div className="space-y-3 text-right">
              {/* 1. السعر */}
              <div className="flex justify-between">
                <span className="text-gray-600">السعر</span>
                <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} دينار</span>
              </div>

              {/* 2. التوصيل */}
              <div className="flex justify-between">
                <span className="text-gray-600">تكلفة التوصيل</span>
                <span className="text-green-600">مجاني</span>
              </div>

              {/* 3. التخفيضات */}
              <div className="flex justify-between">
                <span className="text-gray-600">التخفيضات</span>
                <span className="text-red-600">-{cart.reduce((total, item) => item.discount ? total + item.discount : total, 0)} دينار</span>
              </div>

              {/* الخط الفاصل */}
              <hr className="my-3 border-gray-200" />

              {/* 4. الإجمالي */}
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>الإجمالي النهائي</span>
                <span>
                  {cart.reduce((total, item) => {
                    const itemTotal = item.price * item.quantity;
                    const discount = item.discount || 0;
                    return total + itemTotal - discount;
                  }, 0)} دينار
                </span>
              </div>
            </div>

            {/* زر الدفع */}
            {isAuthenticated ? (
              <button
                className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                onClick={() => navigate("/checkout")}
              >
                إتمام عملية الشراء
              </button>
            ) : (
              <div className="text-right mt-6">
                <p className="text-sm text-gray-600 mb-2">يجب تسجيل الدخول لإكمال الشراء</p>
                <button
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  onClick={() => navigate("/login")}
                >
                  تسجيل الدخول
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

{/* Suggested Products Carousel Section */}
{suggestedProducts.length > 0 && (
  <div className="mt-16">
    <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
    <h2 className="text-xl">
        قد يعجبك أيضاً
      </h2>
      <div className="custom-next-button  flex items-center space-x-2 rtl:space-x-reverse">
      <button className="w-8 h-8 flex items-center justify-center rounded-full  hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
          <FaArrowLeft size={16} className="transform rotate-180"/>
        </button>
        <button className="custom-prev-button w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
          <FaArrowLeft size={16}/>
        </button>
      </div>
    </div>
    
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={Math.min(4, suggestedProducts.length)}
      breakpoints={{
        640: { slidesPerView: Math.min(2, suggestedProducts.length) },
        768: { slidesPerView: Math.min(3, suggestedProducts.length) },
        1024: { slidesPerView: Math.min(4, suggestedProducts.length) }
      }}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }}
      navigation={{
        prevEl: '.custom-prev-button',
        nextEl: '.custom-next-button',
      }}
      pagination={{ 
        clickable: true,
        el: '.custom-pagination',
        bulletClass: 'swiper-pagination-bullet custom-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
      }}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      className="mySwiper relative"
    >
      {suggestedProducts.map((related) => (
        <SwiperSlide key={related._id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col h-full mx-2 max-w-[300px]">
            <div 
              className="relative h-48 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${related._id}`)}
            >
              <img
                src={`${API_BASE_URL.replace('/api', '')}${related.images[0]}`}
                alt={related.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="font-semibold text-lg mb-1 truncate">
                {related.name}
              </h3>
              <div className="flex items-center mb-2">
                {renderStars(related.averageRating || 0)}
                <span className="text-gray-500 text-xs mr-1">
                  ({related.ratings?.length || 0})
                </span>
              </div>
              <p className="text-gray-800 font-bold mb-4">
                {related.price} د.أ
              </p>
            </div>
            <div className="p-4 pt-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${related._id}`);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition"
              >
                عرض المنتج
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    
    {/* Custom Pagination */}
    <div className="custom-pagination flex justify-center mt-6"></div>
    
    {/* Add CSS to your component or global styles */}
    <style jsx>{`
      .custom-bullet {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
        background: #ccc;
        margin: 0 4px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .custom-bullet-active {
        background: #2B2B2B;
        width: 24px;
        border-radius: 4px;
      }
    `}</style>
  </div>
)}
    </div>
  );
};

export default Cart;



// import React, { useState, useEffect } from "react";
// import { ChevronRight, ChevronLeft, Heart, X, Minus, Plus, ShoppingBag } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [suggestedProducts, setSuggestedProducts] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [tempQuantity, setTempQuantity] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users/check", {
//           withCredentials: true
//         });

//         if (response.data.isAuthenticated) {
//           setIsAuthenticated(true);
//         }
//       } catch (err) {
//         if (err.response?.status === 401) {
//           setIsAuthenticated(false);
//         }
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     const fetchSuggestedProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products/related/men");
//         setSuggestedProducts(response.data);
//       } catch (err) {
//         console.error("فشل جلب المنتجات المقترحة:", err);
//       }
//     };

//     fetchSuggestedProducts();
//   }, []);

//   useEffect(() => {
//     if (suggestedProducts.length > 0) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//         );
//       }, 3000);

//       return () => clearInterval(timer);
//     }
//   }, [suggestedProducts]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? suggestedProducts.length - 4 : prevIndex - 1
//     );
//   };

//   const handleRemoveFromCart = (productId, size) => {
//     const updatedCart = cart.filter(
//       (item) => !(item.productId === productId && item.size === size)
//     );
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const startEditing = (productId, size, currentQuantity) => {
//     setEditingItem({ productId, size });
//     setTempQuantity(currentQuantity);
//   };

//   const cancelEditing = () => {
//     setEditingItem(null);
//   };

//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity > 0 && newQuantity <= 10) {
//       setTempQuantity(newQuantity);
//     }
//   };

//   const saveQuantity = () => {
//     const updatedCart = cart.map(item => 
//       item.productId === editingItem.productId && item.size === editingItem.size
//         ? { ...item, quantity: tempQuantity }
//         : item
//     );
    
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setEditingItem(null);
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const itemTotal = item.price * item.quantity;
//       const discount = item.discount || 0;
//       return total + itemTotal - discount;
//     }, 0);
//   };

//   const calculateSubtotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const calculateDiscount = () => {
//     return cart.reduce((total, item) => item.discount ? total + item.discount : total, 0);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="bg-red-50 text-red-700 p-6 rounded-lg">
//           <p className="text-lg font-semibold">حدث خطأ: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (cart.length === 0) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
//         <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
//         <h2 className="text-2xl font-bold text-gray-700 mb-2">سلة التسوق فارغة</h2>
//         <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
//         <button 
//           className="bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
//           onClick={() => navigate("/")}
//         >
//           تصفح المنتجات
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-white py-6 shadow-sm">
//         <div className="container mx-auto px-4">
//           <h1 className="text-right text-3xl font-bold text-gray-900">سلة التسوق</h1>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Product Details */}
//           <div className="lg:col-span-2">
//             <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//               <h2 className="text-right text-xl font-semibold mb-6 pb-4 border-b border-gray-100">
//                 المنتجات ({cart.length})
//               </h2>

//               {cart.map((product) => (
//                 <div 
//                   key={`${product.productId}-${product.size}`} 
//                   className="py-6 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="flex items-start gap-6">
//                     {/* Product Image */}
//                     <div className="relative">
//                       <img
//                         src={`http://localhost:5000${product.image}`}
//                         alt={product.title}
//                         className="w-28 h-36 object-cover rounded-md shadow-sm"
//                       />
//                     </div>

//                     {/* Product Content */}
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         {/* Title and Details */}
//                         <div className="flex-1">
//                           <div className="text-right">
//                             <h3 className="font-semibold text-lg text-gray-900">{product.title}</h3>
                            
//                             <div className="mt-2 flex justify-end gap-6 text-sm text-gray-600">
//                               <div>
//                                 <span className="font-medium">المقاس: </span>
//                                 <span>{product.size}</span>
//                               </div>
//                             </div>

//                             <div className="mt-4 flex justify-end items-center gap-3">
//                               <button 
//                                 className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
//                                 onClick={() => {/* Add to favorites logic */}}
//                               >
//                                 <Heart className="h-4 w-4" />
//                                 <span>أضف إلى المفضلة</span>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Remove Button */}
//                         <button
//                           className="text-gray-400 hover:text-red-600 transition p-1"
//                           onClick={() => handleRemoveFromCart(product.productId, product.size)}
//                         >
//                           <X className="h-5 w-5" />
//                         </button>
//                       </div>

//                       {/* Price and Quantity */}
//                       <div className="flex justify-between items-end mt-4">
//                         {/* Price */}
//                         <div className="text-right">
//                           <div className="flex items-center gap-2">
//                             <span className="text-lg font-bold text-gray-900">{product.price} دينار</span>
//                             {product.discountedPrice && (
//                               <span className="text-sm text-gray-500 line-through">
//                                 {product.discountedPrice} دينار
//                               </span>
//                             )}
//                           </div>
//                         </div>

//                         {/* Quantity */}
//                         <div>
//                           {editingItem?.productId === product.productId && editingItem?.size === product.size ? (
//                             <div className="flex items-center gap-2">
//                               <button 
//                                 className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
//                                 onClick={() => handleQuantityChange(tempQuantity - 1)}
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </button>
                              
//                               <span className="w-10 text-center font-medium">{tempQuantity}</span>
                              
//                               <button 
//                                 className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"
//                                 onClick={() => handleQuantityChange(tempQuantity + 1)}
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </button>
                              
//                               <div className="ml-4 flex gap-2">
//                                 <button 
//                                   className="px-3 py-1 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
//                                   onClick={saveQuantity}
//                                 >
//                                   حفظ
//                                 </button>
//                                 <button 
//                                   className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
//                                   onClick={cancelEditing}
//                                 >
//                                   إلغاء
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="flex items-center gap-3">
//                               <span className="font-medium">الكمية: {product.quantity}</span>
//                               <button 
//                                 className="text-blue-600 text-sm underline"
//                                 onClick={() => startEditing(product.productId, product.size, product.quantity)}
//                               >
//                                 تعديل
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
//               <h2 className="text-xl font-semibold mb-6 text-right pb-3 border-b border-gray-100">
//                 ملخص الطلب
//               </h2>

//               <div className="space-y-4 text-right">
//                 <div className="flex justify-between text-gray-700">
//                   <span>السعر الإجمالي</span>
//                   <span>{calculateSubtotal()} دينار</span>
//                 </div>

//                 <div className="flex justify-between text-gray-700">
//                   <span>تكلفة التوصيل</span>
//                   <span className="text-green-600 font-medium">مجاني</span>
//                 </div>

//                 {calculateDiscount() > 0 && (
//                   <div className="flex justify-between text-gray-700">
//                     <span>الخصومات</span>
//                     <span className="text-red-600">-{calculateDiscount()} دينار</span>
//                   </div>
//                 )}

//                 <div className="border-t border-gray-100 pt-4 mt-4">
//                   <div className="flex justify-between font-bold text-lg text-gray-900">
//                     <span>الإجمالي النهائي</span>
//                     <span>{calculateTotal()} دينار</span>
//                   </div>
//                 </div>
//               </div>

//               {isAuthenticated ? (
//                 <button
//                   className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
//                   onClick={() => navigate("/checkout")}
//                 >
//                   <ShoppingBag className="h-5 w-5" />
//                   <span>إتمام عملية الشراء</span>
//                 </button>
//               ) : (
//                 <div className="mt-6 space-y-4">
//                   <p className="text-sm text-gray-600 text-right">
//                     يجب تسجيل الدخول لإكمال عملية الشراء
//                   </p>
//                   <button
//                     className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
//                     onClick={() => navigate("/login")}
//                   >
//                     تسجيل الدخول
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Suggested Products Carousel */}
//         {suggestedProducts.length > 0 && (
//           <div className="mt-16">
//             <h2 className="text-right text-2xl font-bold mb-8 text-gray-900">قد يعجبك أيضًا</h2>
//             <div className="relative">
//               <div className="overflow-hidden">
//                 <div
//                   className="flex transition-transform duration-500 ease-in-out"
//                   style={{ transform: `translateX(${currentIndex * 25}%)` }}
//                 >
//                   {suggestedProducts.map((product) => (
//                     <div key={product._id} className="flex-none w-1/4 px-3">
//                       <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
//                         <div className="relative overflow-hidden">
//                           <img
//                             src={`http://localhost:5000${product.images[0]}`}
//                             alt={product.name}
//                             className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                           />
//                           <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                               عرض سريع
//                             </button>
//                           </div>
//                         </div>
//                         <div className="p-4 text-right">
//                           <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
//                           <p className="font-bold text-gray-900 mb-3">{product.price} دينار</p>
//                           <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded transition-colors text-sm font-medium flex items-center justify-center gap-2">
//                             <ShoppingBag className="h-4 w-4" />
//                             <span>أضف للسلة</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {suggestedProducts.length > 4 && (
//                 <>
//                   <button
//                     onClick={prevSlide}
//                     className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
//                   >
//                     <ChevronRight className="w-6 h-6" />
//                   </button>

//                   <button
//                     onClick={nextSlide}
//                     className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
//                   >
//                     <ChevronLeft className="w-6 h-6" />
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;