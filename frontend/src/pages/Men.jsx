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
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice'; 
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
  const [timers, setTimers] = useState({});
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorites', {
          withCredentials: true
        });
        setFavorites(response.data.map(fav => fav.product._id));
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

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

  const addToCartHandler = (e, product) => {
    e.stopPropagation();

    if (!product || !product._id) {
        toast.error('منتج غير صالح للإضافة');
        return;
    }

    const newItem = {
        productId: product._id,
        title: product.name || 'منتج غير معروف',
        price: product.price || 0,
        image: product.images?.[0] || '/placeholder-product.jpg',
        quantity: 1,
        size: product.size?.[0] || 'UNKNOWN',
        availableSizes: product.size,
        discount: product.discount,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(
        (item) => item.productId === newItem.productId && item.size === newItem.size
    );

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addToCart(newItem));
    setAddedToCart(product._id);
    setTimeout(() => setAddedToCart(null), 2000);
    toast.success('تمت إضافة المنتج إلى السلة بنجاح');
  };

  const addToFavorites = async (e, productId) => {
    e.stopPropagation();

    if (favorites.includes(productId)) {
      toast.error('هذا المنتج مضاف مسبقاً إلى المفضلة');
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/favorites/add",
        { productId },
        { withCredentials: true }
      );
      setFavorites(prev => [...prev, productId]);
      toast.success("تمت الإضافة إلى المفضلة بنجاح!");
    } catch (err) {
      console.error("خطأ أثناء إضافة المفضلة:", err);
      if (err.response && err.response.status === 401) {
        toast.error("يجب تسجيل الدخول أولًا لإضافة إلى المفضلة");
      } else {
        toast.error("حدث خطأ أثناء إضافة المنتج للمفضلة");
      }
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

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      products.forEach(product => {
        if (product.offerEndDate) {
          const end = new Date(product.offerEndDate).getTime();
          const now = new Date().getTime();
          const distance = end - now;

          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            newTimers[product._id] = `${days} يوم / ${hours} ساعة`;
          } else {
            newTimers[product._id] = 'انتهى العرض';
            fetchProducts();
          }
        } else {
          newTimers[product._id] = 'عرض مستمر';
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [products]);
  
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
      <div className="container mx-auto py-4 md:py-8 px-2 sm:px-4 text-[#2B2B2B]">
        <h2 className="text-xl sm:text-2xl text-red-700 font-bold mb-4 sm:mb-6 pb-2 border-b border-gray-200">قسم الملابس الرجالية</h2>
        
        {/* فلترة البحث */}
        <div className="filter flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-4 sm:mb-6">
          <div className="w-full sm:w-auto">
            <label htmlFor="sort" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">ترتيب حسب:</label>
            <select
              id="sort"
              className="w-full text-xs sm:text-sm text-red-700 px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#2B2B2B] cursor-pointer"
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
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px] sm:min-h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-red-500 text-sm sm:text-base">حدث خطأ: {error}</div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg transition flex flex-col relative"
              >
                {/* صورة المنتج */}
                <div 
                  className="relative h-40 sm:h-48 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-100 text-red-600 text-2xs xs:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">
                      خصم {product.discount}%
                    </div>
                  )}
                </div>
  
                {/* محتوى البطاقة */}
                <div className="p-2 sm:p-3 md:p-4 flex-grow">
                  <h3 
                    className="font-semibold text-sm sm:text-base md:text-lg mb-1 cursor-pointer hover:text-gray-600"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  {/* التقييمات */}
                  <div className="flex items-center mb-1 sm:mb-2">
                    {renderStars(product.averageRating || 0)}
                    <span className="text-gray-500 text-2xs xs:text-xs mr-1">
                      ({product.ratings?.length || 0})
                    </span>
                  </div>
                  
                  {/* السعر */}
                  <div className="flex items-center gap-1">
                    {product.discount > 0 ? (
                      <>
                        <p className="text-red-700 font-bold text-xs sm:text-sm md:text-base">
                          {product.price - (product.price * product.discount) / 100} د.أ
                        </p>
                        <p className="line-through text-2xs xs:text-xs text-gray-500">
                          {product.price} د.أ
                        </p>
                      </>
                    ) : (
                      <p className="text-red-700 font-bold text-xs sm:text-sm md:text-base">
                        {product.price} د.أ
                      </p>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <div className="mt-1">
                      {product.offerEndDate ? (
                        <span className="text-[7px] xs:text-[8px] sm:text-[8.6px] bg-red-100 text-red-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                          ينتهي خلال: {timers[product._id] || '...'}
                        </span>
                      ) : (
                        <span className="text-[7px] xs:text-[8px] sm:text-[8.6px] bg-green-100 text-green-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                          عرض مستمر
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* المقاسات */}
                  <p className="text-2xs xs:text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                    المقاسات: {product.size.join(', ')}
                  </p>
                </div>
  
                {/* أزرار الإجراءات */}
                <div className="p-2 sm:p-3 md:p-4 pt-0 flex justify-between gap-1 sm:gap-2">
                  <button
                    onClick={(e) => addToCartHandler(e, product)}
                    className="flex-1 bg-[#2B2B2B] hover:bg-[#222222] text-white py-1 sm:py-2 px-2 sm:px-3 rounded flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm cursor-pointer"
                    disabled={!product._id}
                  >
                    <FaShoppingCart className="text-xs sm:text-sm" /> <span>اضف الى السلة</span>
                  </button>
                </div>
  
                {/* زر المفضلة */}
                <button
                  onClick={(e) => addToFavorites(e, product._id)}
                  className={`absolute top-1 sm:top-2 right-1 sm:right-2 p-1 sm:p-2 rounded-full border cursor-pointer text-xs sm:text-sm ${
                    favorites.includes(product._id)
                      ? 'text-red-500 border-red-500 bg-red-50 hover:bg-red-100'
                      : 'text-gray-500 border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                >
                  <FaHeart />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* الترقيم */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
            <div className="bg-white rounded-lg shadow-sm sm:shadow-md inline-flex p-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm md:text-base ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer'
                } transition-colors duration-300`}
              >
                السابق
              </button>
              
              <span className="px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 flex items-center text-xs sm:text-sm md:text-base">
                <span className="text-[#AA1313] font-bold">{currentPage}</span>
                <span className="mx-1">من</span>
                <span className="text-[#2B2B2B]">{totalPages}</span>
              </span>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm md:text-base ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
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
};

export default Men;
