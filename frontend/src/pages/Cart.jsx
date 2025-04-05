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



import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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
          setUser(response.data.user); // تخزين بيانات المستخدم
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
    <div className="bg-rose-50 min-h-screen p-8">
      <h1 className="text-right text-2xl font-bold mb-8">سلة التسوق</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-right">الملخص</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} دينار</span>
                <span>الإجمالي</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold">
                <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} دينار</span>
                <span>الإجمالي النهائي</span>
              </div>
            </div>
            
            {isAuthenticated ? (
              <button 
                className="w-full mt-6 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition"
                onClick={() => navigate("/checkout")}
              >
                التوجه إلى الدفع
              </button>
            ) : (
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2">يجب تسجيل الدخول لإكمال عملية الشراء</p>
                <button
                  className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition"
                  onClick={() => navigate("/login")}
                >
                  سجل الدخول لإكمال الشراء
                </button>
              </div>
            )}
          </div>
        </div>

        {/* باقي الكود كما هو */}
      
       <div className="lg:col-span-2">
          {cart.map((product) => (
            <div key={product.productId} className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex items-start justify-between">
                <button className="text-2xl text-gray-400">&times;</button>
                <div className="flex gap-6">
                  <div className="text-right">
                    <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-1">المقاس: {product.size}</p>
                    <p className="text-gray-600 mb-2">الكمية: {product.quantity}</p>
                    <p className="text-red-500 font-bold">{product.price} دينار</p>
                  </div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                </div>
              </div>
              <button className="mt-4 text-gray-600 flex items-center gap-2 hover:text-gray-800">
                <span>أضف إلى المفضلة</span>
                <span>♡</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Products Carousel Section */}
      <div className="mt-12">
        <h2 className="text-right text-xl font-bold mb-6">قد يعجبك أيضا</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${currentIndex * 25}%)` }}
            >
              {suggestedProducts.map((product) => (
                <div key={product._id} className="flex-none w-1/4 px-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <div className="text-right">
                      <p className="text-sm mb-2">{product.name}</p>
                      <p className="font-bold mb-2">{product.price} دينار</p>
                      <button className="text-gray-600 hover:text-gray-800">
                        أضف للسلة ♡
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;