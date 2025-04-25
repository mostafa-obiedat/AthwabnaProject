// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa';
// import axios from 'axios';

// const Men = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('');
//   const [region, setRegion] = useState('');
//   const [addedToCart, setAddedToCart] = useState(null); // حالة لتأكيد الإضافة
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:5000/api/products/men', {
//         params: {
//           sortBy: sortBy !== '' ? sortBy : undefined,
//           region: region !== '' ? region : undefined,
//         },
//       });
//       setProducts(response.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [sortBy, region]);

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const addToCart = (e, product) => {
//     e.stopPropagation();

//     const newItem = {
//       productId: product._id,
//       title: product.name,
//       price: product.price,
//       image: product.images[0],
//       quantity: 1,
//       size: product.size[0], // أخذ أول حجم تلقائيًا
//     };

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(
//       (item) => item.productId === product._id && item.size === newItem.size
//     );

//     if (existingIndex !== -1) {
//       cart[existingIndex].quantity += 1;
//     } else {
//       cart.push(newItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     setAddedToCart(product._id);
//     setTimeout(() => setAddedToCart(null), 2000);
//   };

//   const addToFavorites = async (e, productId) => {
//     e.stopPropagation();
  
//     try {
//       await axios.post(
//         "http://localhost:5000/api/favorites/add",
//         { productId },
//         { withCredentials: true }
//       );
//       alert("تمت الإضافة إلى المفضلة بنجاح!");
//     } catch (err) {
//       console.error("خطأ أثناء إضافة المفضلة:", err);
//       alert("يجب تسجيل الدخول أولًا لإضافة إلى المفضلة");
//     }
//   };
  

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen">
//       <div className="container mx-auto py-5">
//         <h2 className="text-2xl font-bold mt-5 mb-4">قسم الملابس الرجالية</h2>

//         <div className="filter flex gap-4 flex-wrap items-center mb-4">
//           <div>
//             <label htmlFor="sort" className="form-label block mb-1">ترتيب حسب:</label>
//             <select
//               id="sort"
//               className="form-select w-full px-2 py-1 rounded border"
//               onChange={(e) => setSortBy(e.target.value)}
//               value={sortBy}
//             >
//               <option value="">الافتراضي</option>
//               <option value="price">حسب السعر</option>
//               <option value="popularity">حسب الشعبية</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="region" className="form-label block mb-1">حسب المنطقة:</label>
//             <select
//               id="region"
//               className="form-select w-full px-2 py-1 rounded border"
//               onChange={(e) => setRegion(e.target.value)}
//               value={region}
//             >
//               <option value="">الكل</option>
//               <option value="Amman">عمان</option>
//               <option value="Irbid">اربد</option>
//               <option value="Zarqa">الزرقاء</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-5">جاري التحميل...</div>
//         ) : error ? (
//           <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {products.map(product => (
//               <div
//                 key={product._id}
//                 className="card text-center p-3 bg-white rounded-lg shadow-md flex flex-col h-full cursor-pointer relative"
//                 onClick={() => handleProductClick(product._id)}
//               >
//                 <img
//                   src={`http://localhost:5000${product.images[0]}`}
//                   alt={product.name}
//                   className="w-full h-48 object-cover mb-3 rounded-lg"
//                 />
//                 <h6 className="card-title font-semibold">{product.name}</h6>
//                 <p className="card-text text-gray-600">{product.price} دينار</p>
//                 <p className="text-sm text-gray-500">الأحجام: {product.size.join(', ')}</p>
//                 <p className="text-sm text-gray-500">الألوان: {product.color.join(', ')}</p>
//                 <div className="flex justify-between mt-auto">
//                   <button
//                     className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex items-center gap-2"
//                     onClick={(e) => addToCart(e, product)}
//                   >
//                     أضف الى السلة <FaShoppingCart />
//                   </button>
//                   <button
//   className="text-gray-600 px-4 py-2 rounded"
//   onClick={(e) => addToFavorites(e, product._id)}
// >
//   <FaHeart />
// </button>

//                 </div>

//                 {addedToCart === product._id && (
//                   <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
//                     تمت الإضافة للسلة
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="text-center my-5">
//         <a href="#top" className="inline-block px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
//           العودة إلى أعلى ↑
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Men;
   
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [region, setRegion] = useState('');
  const [addedToCart, setAddedToCart] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products/men', {
        params: {
          sortBy: sortBy !== '' ? sortBy : undefined,
          region: region !== '' ? region : undefined,
          page: currentPage,
          limit: 4,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy, region, currentPage]);

  const addToCart = (e, product) => {
    e.stopPropagation();

    const newItem = {
      productId: product._id,
      title: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: product.size[0],
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(
      (item) => item.productId === product._id && item.size === newItem.size
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedToCart(product._id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const addToFavorites = async (e, productId) => {
    e.stopPropagation();

    try {
      await axios.post(
        "http://localhost:5000/api/favorites/add",
        { productId },
        { withCredentials: true }
      );
      toast.success("تمت الإضافة إلى المفضلة بنجاح!");
    } catch (err) {
      console.error("خطأ أثناء إضافة المفضلة:", err);
      toast.error("يجب تسجيل الدخول أولًا لإضافة إلى المفضلة");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
      }
    }
    return stars;
  };

  const getColorHex = (color) => {
    const colors = {
      'أسود': '#000000',
      'أبيض': '#FFFFFF',
      'أحمر': '#FF0000',
      'أزرق': '#0000FF',
      'أخضر': '#008000',
      'أصفر': '#FFFF00',
      'رمادي': '#808080',
      'بني': '#A52A2A',
      'زهري': '#FFC0CB',
      'برتقالي': '#FFA500',
      'بنفسجي': '#800080'
    };
    return colors[color] || color;
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">قسم الملابس الرجالية</h2>
  
        {/* فلترة البحث */}
        <div className="filter flex gap-4 flex-wrap items-center mb-6">
          <div>
            <label htmlFor="sort" className="block mb-1 text-sm font-medium text-gray-700">ترتيب حسب:</label>
            <select
              id="sort"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              value={sortBy}
            >
              <option value="">الافتراضي</option>
              <option value="price">حسب السعر</option>
              <option value="popularity">حسب الشعبية</option>
            </select>
          </div>

          <div>
            <label htmlFor="region" className="block mb-1 text-sm font-medium text-gray-700">حسب المنطقة:</label>
            <select
              id="region"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              onChange={(e) => {
                setRegion(e.target.value);
                setCurrentPage(1);
              }}
              value={region}
            >
              <option value="">الكل</option>
              <option value="Amman">عمان</option>
              <option value="Irbid">اربد</option>
              <option value="Zarqa">الزرقاء</option>
            </select>
          </div>
        </div>

  
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col relative"
              >
                {/* صورة المنتج */}
                <div 
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
  
                {/* محتوى البطاقة */}
                <div className="p-4 flex-grow">
                  <h3 
                    className="font-semibold text-lg mb-1 cursor-pointer hover:text-gray-600"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  {/* التقييمات */}
                  <div className="flex items-center mb-2">
                    {renderStars(product.averageRating || 0)}
                    <span className="text-gray-500 text-xs mr-1">
                      ({product.ratings?.length || 0})
                    </span>
                  </div>
                  
                  {/* السعر */}
                  <p className="text-gray-800 font-bold mb-2">
                    {product.price} د.أ
                  </p>
                  
                  {/* المقاسات */}
                  <p className="text-sm text-gray-500 mb-2">
                    المقاسات: {product.size.join(', ')}
                  </p>
                  
               
                </div>
  
                {/* أزرار الإجراءات */}
                <div className="p-4 pt-0 flex justify-between gap-2">
                  {/* زر عرض التفاصيل */}
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product._id}`);
                    }}
                    className="flex-1 bg-white text-gray-800 py-2 px-3 rounded border border-gray-300 hover:bg-gray-100 text-sm"
                  >
                    التفاصيل
                  </button>
   */}
                  {/* زر إضافة إلى السلة */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(e, product);
                    }}
                    className="flex-1 bg-[#2B2B2B] hover: text-white py-2 px-3 rounded flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                      <FaShoppingCart />
                   اضف الى السلة
                  </button>
                </div>
  
                {/* زر المفضلة */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToFavorites(e, product._id);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full border ${
                    false // يمكنك تغيير هذا الشرط بناءً على حالة المفضلة
                      ? 'text-red-500 border-red-500 bg-white'
                      : 'text-gray-500 border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                >
                  <FaHeart />
                </button>
  
                {/* إشعار الإضافة للسلة */}
                {addedToCart === product._id && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs cursor-pointer">
                    تمت الإضافة
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

    

        {!loading && totalPages >= 1 && (
          <div className="flex justify-center items-center gap-2 my-8">
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
            >
              التالي
            </button>
            {[...Array(totalPages)].map((_, index) => {
        const pageNumber = totalPages - index; // عكس ترتيب الصفحات
        return (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-4 py-2 border rounded-md cursor-pointer ${
              currentPage === pageNumber 
                ? 'bg-[#2B2B2B] text-white border-gray-800' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {pageNumber}
          </button>
        );
        })}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
            >
              السابق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Men;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaShoppingCart, FaHeart, FaFilter, FaSortAmountDown } from 'react-icons/fa';
// import axios from 'axios';

// const Men = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products/men');
//         setProducts(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#FFF7F2]">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-[#2B2B2B] border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-lg text-gray-700">جاري التحميل...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#FFF7F2] flex justify-center items-center">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
//           <h3 className="text-xl font-bold text-red-600 mb-2">حدث خطأ</h3>
//           <p className="text-red-500">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//           >
//             إعادة المحاولة
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen">
//       {/* Hero Section */}
//       <div className="bg-[#2B2B2B] text-white py-10 px-6">
//         <div className="container mx-auto max-w-6xl">
//           <h1 className="text-3xl md:text-4xl font-bold mb-3">الملابس الرجالية</h1>
//           <p className="text-gray-300 mb-6">اكتشف أحدث التصاميم العصرية للرجال بأفضل الأسعار</p>
//           <div className="flex flex-wrap gap-4">
//             <button className="bg-white text-[#2B2B2B] hover:bg-gray-100 px-6 py-2 rounded-full font-medium transition">تسوق الآن</button>
//             <button className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full font-medium transition">عروض خاصة</button>
//           </div>
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className="container mx-auto max-w-6xl px-4 py-6">
//         <div className="flex flex-wrap justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">{products.length} منتج</h2>
          
//           <div className="flex space-x-2 space-x-reverse">
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition"
//             >
//               <FaFilter /> تصفية
//             </button>
            
//             <div className="relative">
//               <select 
//                 className="appearance-none bg-white pl-10 pr-4 py-2 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-[#2B2B2B]"
//               >
//                 <option>الأحدث</option>
//                 <option>السعر: من الأقل للأعلى</option>
//                 <option>السعر: من الأعلى للأقل</option>
//                 <option>الأكثر شعبية</option>
//               </select>
//               <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>
//         </div>
        
//         {showFilters && (
//           <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <h3 className="font-medium mb-2">الأحجام</h3>
//               <div className="flex flex-wrap gap-2">
//                 {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
//                   <label key={size} className="flex items-center cursor-pointer">
//                     <input type="checkbox" className="mr-1" />
//                     <span>{size}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h3 className="font-medium mb-2">الألوان</h3>
//               <div className="flex flex-wrap gap-2">
//                 {['أسود', 'أبيض', 'أزرق', 'أحمر'].map(color => (
//                   <label key={color} className="flex items-center cursor-pointer">
//                     <input type="checkbox" className="mr-1" />
//                     <span>{color}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h3 className="font-medium mb-2">الفئات</h3>
//               <div className="flex flex-wrap gap-2">
//                 {['قمصان', 'بناطيل', 'أحذية', 'إكسسوارات'].map(category => (
//                   <label key={category} className="flex items-center cursor-pointer">
//                     <input type="checkbox" className="mr-1" />
//                     <span>{category}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h3 className="font-medium mb-2">السعر</h3>
//               <input 
//                 type="range" 
//                 min="0" 
//                 max="100" 
//                 className="w-full accent-[#2B2B2B]" 
//               />
//               <div className="flex justify-between text-sm text-gray-500">
//                 <span>0 دينار</span>
//                 <span>100 دينار</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map(product => (
//             <div
//               key={product._id}
//               className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group"
//               onClick={() => handleProductClick(product._id)}
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={`http://localhost:5000${product.images[0]}`}
//                   alt={product.name}
//                   className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
//                 />
//                 <div className="absolute top-3 right-3">
//                   <button
//                     className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <FaHeart className="text-gray-400 hover:text-red-500" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
//                 <p className="text-[#2B2B2B] font-bold mb-2">{product.price} دينار</p>
//                 <div className="flex flex-wrap gap-1 mb-3">
//                   {product.size.map(size => (
//                     <span key={size} className="bg-gray-100 text-xs px-2 py-1 rounded">{size}</span>
//                   ))}
//                 </div>
//                 <div className="flex justify-center">
//                   <button
//                     className="w-full bg-[#2B2B2B] hover:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <FaShoppingCart /> أضف الى السلة
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {products.length === 0 && (
//           <div className="bg-white rounded-lg p-8 text-center">
//             <div className="text-gray-400 text-6xl mb-4">🛍️</div>
//             <h3 className="text-xl font-bold mb-2">لا توجد منتجات حالياً</h3>
//             <p className="text-gray-500 mb-4">لم نعثر على أي منتجات مطابقة في قسم الملابس الرجالية</p>
//             <button className="bg-[#2B2B2B] text-white px-6 py-2 rounded-lg hover:bg-black transition">تصفح الأقسام الأخرى</button>
//           </div>
//         )}

//         {/* Pagination - Only show if we have products */}
//         {products.length > 0 && (
//           <div className="flex justify-center mt-12 mb-6">
//             <div className="flex gap-2">
//               <button className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 transition">السابق</button>
//               {[1, 2, 3].map(page => (
//                 <button 
//                   key={page} 
//                   className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-[#2B2B2B] text-white' : 'bg-white hover:bg-gray-50'}`}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition">التالي</button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Back to top button - Fixed position */}
//       <div className="fixed bottom-6 right-6">
//         <a 
//           href="#top" 
//           className="bg-[#2B2B2B] text-white p-3 rounded-full shadow-lg hover:bg-black transition flex items-center justify-center"
//           aria-label="العودة إلى أعلى"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Men;