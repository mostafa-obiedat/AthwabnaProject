// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom"; // استيراد useNavigate

// const ProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [isDetailsVisible, setIsDetailsVisible] = useState(true);
//   const [selectedSize, setSelectedSize] = useState(""); // حالة لتخزين المقاس المختار
//   const { id } = useParams();
//   const navigate = useNavigate(); // استخدام useNavigate للتنقل

//   useEffect(() => {
//     // جلب تفاصيل المنتج
//     axios.get(`http://localhost:5000/api/products/${id}`)
//       .then((response) => setProduct(response.data))
//       .catch((error) => console.error('فشل جلب تفاصيل المنتج:', error));

//     // جلب المنتجات ذات الصلة
//     axios.get(`http://localhost:5000/api/products/related/men`)
//       .then((response) => setRelatedProducts(response.data))
//       .catch((error) => console.error('فشل جلب المنتجات ذات الصلة:', error));
//   }, [id]);

//   // تبديل عرض التفاصيل
//   const toggleDetails = () => {
//     setIsDetailsVisible(!isDetailsVisible);
//   };

//   // إضافة المنتج إلى السلة
//   const addToCart = async () => {
//     if (!selectedSize) {
//       alert("الرجاء اختيار المقاس");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/cart/add", {
//         productId: product._id,
//         quantity: 1, // الكمية الافتراضية
//         size: selectedSize, // المقاس المختار
//       });

//       if (response.status === 200) {
//         alert("تمت إضافة المنتج إلى السلة بنجاح");
//         navigate("/cart"); // الانتقال إلى صفحة السلة
//       }
//     } catch (error) {
//       console.error("فشل إضافة المنتج إلى السلة:", error);
//       alert("حدث خطأ أثناء إضافة المنتج إلى السلة");
//     }
//   };

//   if (!product) {
//     return <div className="text-center py-5">جاري التحميل...</div>;
//   }

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen font-['29LT_Bukra']">
//       {/* Content */}
//       <div className="container mx-auto my-8 px-4">
//         <div className="flex flex-col md:flex-row items-center">
//           {/* Product Image */}
//           <div className="md:w-1/3 mb-8 md:mb-0">
//             <img src={product.images[0]} alt="Product" className="w-80 h-96 border-2 border-gray-700 rounded-lg" />
//           </div>

//           {/* Product Details */}
//           <div className="md:w-1/2">
//             <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
//             <p className="text-gray-500">السعر السابق: <del>60 دينار</del></p>
//             <p className="text-red-500 text-xl">السعر: {product.price} دينار</p>
//             <form className="mt-4">
//               <div className="mb-4">
//                 <select
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={selectedSize}
//                   onChange={(e) => setSelectedSize(e.target.value)} // تحديث المقاس المختار
//                 >
//                   <option value="" hidden>اختر المقاس</option>
//                   {product.size.map((size) => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center"
//                   onClick={addToCart} // النقر على زر "أضف إلى السلة"
//                 >
//                   <i className="bi bi-cart mr-2"></i> أضف الى السلة
//                 </button>
//                 <button className="border border-gray-300 px-4 py-2 rounded">
//                   <i className="bi bi-heart"></i>
//                 </button>
//               </div>
//             </form>
//             <div className="mt-6">
//               <h6 className="mb-2">تاريخ التوصيل المتوقع: 9 يناير - 13 يناير</h6>
//               <h6>ألوان أخرى متوفرة</h6>
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="mt-8 bg-white p-6 border border-black rounded-lg shadow-md w-4/5 mx-auto">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold">التفاصيل</h3>
//             <button onClick={toggleDetails} className="text-2xl">
//               {isDetailsVisible ? "↑" : "↓"}
//             </button>
//           </div>
//           {isDetailsVisible && (
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold">{product.name}</h4>
//               <ul className="list-disc pr-6">
//                 <li><strong>المواصفات</strong></li>
//                 {product.color.map((color) => (
//                   <li key={color}>لون {color}</li>
//                 ))}
//               </ul>
//               <h4 className="text-lg font-semibold mt-4">عن المنتج</h4>
//               <p className="mt-2">{product.description}</p>
//             </div>
//           )}
//         </div>

//         {/* Related Products */}
//         <div className="mt-20">
//           <h4 className="text-xl font-bold mb-4">قد يعجبك أيضاً</h4>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {relatedProducts.map((product) => (
//               <div key={product._id} className="bg-white p-4 rounded-lg shadow-md text-center">
//                 <img src={product.images[0]} alt="Product" className="w-full h-48 object-cover rounded-lg mb-4" />
//                 <h6 className="font-semibold">{product.name}</h6>
//                 <p className="text-gray-500">{product.price} دينار</p>
//                 <div className="flex justify-between mt-4">
//                   <button className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center">
//                     <i className="bi bi-cart mr-2"></i> أضف الى السلة
//                   </button>
//                   <button className="border border-gray-300 px-4 py-2 rounded">
//                     <i className="bi bi-heart"></i>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom"; // استيراد useNavigate

// const ProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [isDetailsVisible, setIsDetailsVisible] = useState(true);
//   const [selectedSize, setSelectedSize] = useState(""); // حالة لتخزين المقاس المختار
//   const { id } = useParams();
//   const navigate = useNavigate(); // استخدام useNavigate للتنقل

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('فشل جلب تفاصيل المنتج:', error);
//         if (error.response) {
//           console.error('بيانات الخطأ:', error.response.data);
//           console.error('حالة الخطأ:', error.response.status);
//           console.error('رأسيات الخطأ:', error.response.headers);
//         } else if (error.request) {
//           console.error('لم يتم استلام أي رد من الخادم:', error.request);
//         } else {
//           console.error('خطأ في إعداد الطلب:', error.message);
//         }
//       }
//     };
  
//     const fetchRelatedProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/related/men`);
//         setRelatedProducts(response.data);
//       } catch (error) {
//         console.error('فشل جلب المنتجات ذات الصلة:', error);
//         if (error.response) {
//           console.error('بيانات الخطأ:', error.response.data);
//           console.error('حالة الخطأ:', error.response.status);
//           console.error('رأسيات الخطأ:', error.response.headers);
//         } else if (error.request) {
//           console.error('لم يتم استلام أي رد من الخادم:', error.request);
//         } else {
//           console.error('خطأ في إعداد الطلب:', error.message);
//         }
//       }
//     };
  
//     fetchProductDetails();
//     fetchRelatedProducts();
//   }, [id]);

//   // تبديل عرض التفاصيل
//   const toggleDetails = () => {
//     setIsDetailsVisible(!isDetailsVisible);
//   };
// // إضافة المنتج إلى السلة
// const addToCart = () => {
//   if (!selectedSize) {
//     alert("الرجاء اختيار المقاس");
//     return;
//   }

//   // استرجاع المنتجات من localStorage
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   // إنشاء المنتج الجديد
//   const newItem = {
//     productId: product._id,
//     title: product.name,
//     price: product.price,
//     image: product.images[0], // تأكد من وجود صورة للمنتج
//     quantity: 1,
//     size: selectedSize,
//   };

//   // البحث عن المنتج في السلة للتحقق من وجوده مسبقًا
//   const existingItemIndex = cart.findIndex(
//     (item) => item.productId === product._id && item.size === selectedSize
//   );

//   if (existingItemIndex !== -1) {
//     // إذا كان المنتج موجودًا، نقوم بزيادة الكمية
//     cart[existingItemIndex].quantity += 1;
//   } else {
//     // إضافة المنتج الجديد إلى السلة
//     cart.push(newItem);
//   }

//   // تحديث السلة في localStorage
//   localStorage.setItem("cart", JSON.stringify(cart));

//   alert("✅ تمت إضافة المنتج إلى السلة بنجاح");
// };

  
//   if (!product) {
//     return <div className="text-center py-5">جاري التحميل...</div>;
//   }

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen font-['29LT_Bukra']">
//       {/* Content */}
//       <div className="container mx-auto my-8 px-4">
//         <div className="flex flex-col md:flex-row items-center">
//           {/* Product Image */}
//           <div className="md:w-1/3 mb-8 md:mb-0">
//             <img src={`http://localhost:5000${product.images[0]}`} alt="Product" className="w-80 h-96 border-2 border-gray-700 rounded-lg" />
//           </div>

//           {/* Product Details */}
//           <div className="md:w-1/2">
//             <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
//             <p className="text-gray-500">السعر السابق: <del>60 دينار</del></p>
//             <p className="text-red-500 text-xl">السعر: {product.price} دينار</p>
//             <form className="mt-4">
//               <div className="mb-4">
//                 <select
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={selectedSize}
//                   onChange={(e) => setSelectedSize(e.target.value)} // تحديث المقاس المختار
//                 >
//                   <option value="" hidden>اختر المقاس</option>
//                   {product.size.map((size) => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center"
//                   onClick={addToCart} // النقر على زر "أضف إلى السلة"
//                 >
//                   <i className="bi bi-cart mr-2"></i> أضف الى السلة
//                 </button>
//                 <button className="border border-gray-300 px-4 py-2 rounded">
//                   <i className="bi bi-heart"></i>
//                 </button>
//               </div>
//             </form>
//             <div className="mt-6">
//               <h6 className="mb-2">تاريخ التوصيل المتوقع: 9 يناير - 13 يناير</h6>
//               <h6>ألوان أخرى متوفرة</h6>
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="mt-8 bg-white p-6 border border-black rounded-lg shadow-md w-4/5 mx-auto">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold">التفاصيل</h3>
//             <button onClick={toggleDetails} className="text-2xl">
//               {isDetailsVisible ? "↑" : "↓"}
//             </button>
//           </div>
//           {isDetailsVisible && (
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold">{product.name}</h4>
//               <ul className="list-disc pr-6">
//                 <li><strong>المواصفات</strong></li>
//                 {product.color.map((color) => (
//                   <li key={color}>لون {color}</li>
//                 ))}
//               </ul>
//               <h4 className="text-lg font-semibold mt-4">عن المنتج</h4>
//               <p className="mt-2">{product.description}</p>
//             </div>
//           )}
//         </div>

//         {/* Related Products */}
//         <div className="mt-20">
//           <h4 className="text-xl font-bold mb-4">قد يعجبك أيضاً</h4>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {relatedProducts.map((product) => (
//               <div key={product._id} className="bg-white p-4 rounded-lg shadow-md text-center">
//                 <img src={`http://localhost:5000${product.images[0]}`} alt="Product" className="w-full h-48 object-cover rounded-lg mb-4" />
//                 <h6 className="font-semibold">{product.name}</h6>
//                 <p className="text-gray-500">{product.price} دينار</p>
//                 <div className="flex justify-between mt-4">
//                   <button className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center">
//                     <i className="bi bi-cart mr-2"></i> أضف الى السلة
//                   </button>
//                   <button className="border border-gray-300 px-4 py-2 rounded">
//                     <i className="bi bi-heart"></i>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
import {
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaStar,
  FaRegStar,
  FaShippingFast,
  FaExchangeAlt,
  FaCheck
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
  // States
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // Constants
  const API_BASE_URL = 'http://localhost:5000/api';
  const DELIVERY_DATE = new Date();
  DELIVERY_DATE.setDate(DELIVERY_DATE.getDate() + 5);

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch product details
        const productRes = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(productRes.data);
        
        // Fetch related products based on product category
        const relatedRes = await axios.get(
          `${API_BASE_URL}/products/related/${productRes.data.category}`
        );
        setRelatedProducts(relatedRes.data);
        
        // Set default selections
        setSelectedSize(productRes.data.size[0] || '');
        setSelectedColor(productRes.data.color[0] || '');
        
        // Check if product is in wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWishlisted(wishlist.some(item => item.productId === productRes.data._id));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'حدث خطأ أثناء تحميل البيانات');
        toast.error(err.response?.data?.message || 'حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  // Add to cart function
  const addToCart = (e) => {
    e.preventDefault();
    
    if (!selectedSize) {
      toast.warning('الرجاء اختيار المقاس');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const newItem = {
      productId: product._id,
      title: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    };

    const existingItemIndex = cart.findIndex(
      (item) => item.productId === product._id && 
               item.size === selectedSize && 
               item.color === selectedColor
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('تمت إضافة المنتج إلى السلة بنجاح');
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (isWishlisted) {
      wishlist = wishlist.filter(item => item.productId !== product._id);
    } else {
      wishlist.push({
        productId: product._id,
        title: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة');
  };

  // Submit rating
  const submitRating = async (e) => {
    e.preventDefault();
    
    // التأكد من أن الـ rating هو رقم حقيقي
    const ratingValue = parseFloat(userRating);
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      toast.error('يرجى إدخال تقييم بين 1 و 5');
      return;
    }
  
    try {
      await axios.post(
        `${API_BASE_URL}/products/rate/${product._id}`,
        {
          rating: ratingValue,  // إرسال التقييم كـ رقم حقيقي
          comment: userComment
        },
        {
          withCredentials: true
        }
      );     
      toast.success('تم إضافة التقييم بنجاح');
      // Refresh product data to show new rating
      const productRes = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(productRes.data);
      setUserRating(0);
      setUserComment('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'حدث خطأ أثناء إضافة التقييم');
    }
  };

  // Render stars for ratings
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
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          العودة للخلف
        </button>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-xl font-bold mb-4">المنتج غير موجود</div>
        <button 
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          العودة للتسوق
        </button>
      </div>
    );
  }

  // Calculate original price (for discount display)
  const originalPrice = Math.round(product.price * 1.25);
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Navigation */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft className="ml-2" /> العودة
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <img
                src={`${API_BASE_URL.replace('/api', '')}${product.images[selectedImage]}`}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>

            <div className="flex space-x-4 overflow-x-auto py-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded cursor-pointer ${
                    selectedImage === index ? 'border-gray-800' : 'border-transparent'
                  }`}
                >
                  <img
                    src={`${API_BASE_URL.replace('/api', '')}${image}`}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {renderStars(product.averageRating || 0)}
                </div>
                <span className="text-gray-500 text-sm mr-2">
                  ({product.ratings?.length || 0} تقييمات)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              {discountPercentage > 0 && (
                <>
                  <p className="text-gray-500">
                    السعر السابق: <del>{originalPrice} د.ع</del>
                  </p>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    خصم {discountPercentage}%
                  </span>
                </>
              )}
              <p className="text-2xl font-bold">{product.price} د.أ</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-2">المقاسات المتوفرة</h3>
              <div className="flex flex-wrap gap-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? 'bg-[#2B2B2B] text-white border-gray-800'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-2">الألوان المتوفرة</h3>
              <div className="flex flex-wrap gap-2">
                {product.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                      selectedColor === color
                        ? 'border-gray-800'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">الكمية</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-l cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-[#2B2B2B] hover:bg-[#2B2B2B] text-white py-3 px-6 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaShoppingCart /> أضف إلى السلة
              </button>
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded border ${
                  isWishlisted
                    ? 'text-red-500 border-red-500 cursor-pointer'
                    : 'text-gray-500 border-gray-300 hover:border-gray-400 cursor-pointer'
                }`}
              >
                <FaHeart />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold mb-3">معلومات الشحن</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaShippingFast className="text-gray-700 mt-1" />
                  <div>
                    <p className="font-medium">
                      التوصيل المتوقع: {DELIVERY_DATE.toLocaleDateString('ar-IQ')}
                    </p>
                    <p className="text-sm text-gray-500">
                      يختلف موعد التوصيل حسب المنطقة
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaExchangeAlt className="text-gray-700 mt-1" />
                  <div>
                    <p className="font-medium">الإرجاع والاستبدال</p>
                    <p className="text-sm text-gray-500">
                      استبدال مجاني خلال 14 يوم من الاستلام
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">تفاصيل المنتج</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">المواصفات</h4>
              <ul className="list-disc pr-6 space-y-2">
                <li>النوع: {product.category}</li>
                <li>المقاسات: {product.size.join(', ')}</li>
                <li>الألوان: {product.color.join(', ')}</li>
                <li>المنشأ: {product.origin || 'غير محدد'}</li>
                <li>رمز المنتج: #{product._id.slice(-6).toUpperCase()}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">الوصف</h4>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'لا يوجد وصف متوفر لهذا المنتج.'}
              </p>
              <div className="mt-4">
                <h5 className="font-semibold mb-2">تعليمات العناية:</h5>
                <ul className="list-disc pr-6 space-y-1">
                  <li>غسيل يدوي أو بالغسالة بماء بارد</li>
                  <li>تجنب استخدام المبيضات</li>
                  <li>تجفيف على الحبل</li>
                  <li>كي على درجة حرارة منخفضة</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">تقييم المنتج</h3>
          <div className="space-y-6">
            {/* Existing Ratings */}
            {product.ratings?.length > 0 ? (
              <div className="space-y-4">
                {product.ratings.map((rating, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(rating.rating)}
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(rating.createdAt).toLocaleDateString('ar-IQ')}
                      </span>
                    </div>
                    {rating.comment && (
                      <p className="text-gray-700">{rating.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">لا توجد تقييمات حتى الآن</p>
            )}

            {/* Add Rating Form */}
            <form onSubmit={submitRating} className="mt-6">
              <h4 className="font-semibold mb-3">أضف تقييمك</h4>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="text-2xl mr-1"
                  >
                    {star <= userRating ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="اكتب تعليقك هنا..."
                className="w-full p-3 border border-gray-300 rounded mb-4"
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="bg-[#2B2B2B]  text-white px-6 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer"
                disabled={userRating === 0}
              >
                إرسال التقييم
              </button>
            </form>
          </div>
        </div>

    
{/* Related Products */}
{relatedProducts.length > 0 && (
  <div className="mt-16">
    <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
      <h2 className="text-xl">
        منتجات ذات صلة
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
      slidesPerView={Math.min(4, relatedProducts.length)}
      breakpoints={{
        640: { slidesPerView: Math.min(2, relatedProducts.length) },
        768: { slidesPerView: Math.min(3, relatedProducts.length) },
        1024: { slidesPerView: Math.min(4, relatedProducts.length) }
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
      {relatedProducts.map((related) => (
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
              {related._id === product._id && (
                <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  المنتج الحالي
                </div>
              )}
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
    </div>
  );
};

// Helper function to get color hex code
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

export default ProductDetails;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaHeart, FaArrowLeft, FaCheck, FaShippingFast, FaExchangeAlt, FaStar } from "react-icons/fa";

// const ProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [isDetailsVisible, setIsDetailsVisible] = useState(true);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAddedToCart, setIsAddedToCart] = useState(false);
//   const [rating, setRating] = useState(0);  // للتقييم
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     const fetchProductDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(response.data);
//         setError(null);
//         setRating(response.data.averageRating || 0);  // تحميل التقييمات
//       } catch (error) {
//         console.error('فشل جلب تفاصيل المنتج:', error);
//         setError("حدث خطأ أثناء تحميل تفاصيل المنتج");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     const fetchRelatedProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/related/men`);
//         setRelatedProducts(response.data);
//       } catch (error) {
//         console.error('فشل جلب المنتجات ذات الصلة:', error);
//       }
//     };
  
//     fetchProductDetails();
//     fetchRelatedProducts();
//   }, [id]);

//   const toggleDetails = () => {
//     setIsDetailsVisible(!isDetailsVisible);
//   };

//   const handleRelatedProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const addToCart = (e) => {
//     e.preventDefault();
    
//     if (!selectedSize) {
//       const sizeError = document.getElementById("size-error");
//       if (sizeError) {
//         sizeError.classList.remove("hidden");
//         setTimeout(() => {
//           sizeError.classList.add("hidden");
//         }, 3000);
//       }
//       return;
//     }

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     const newItem = {
//       productId: product._id,
//       title: product.name,
//       price: product.price,
//       image: product.images[0],
//       quantity: 1,
//       size: selectedSize,
//     };

//     const existingItemIndex = cart.findIndex(
//       (item) => item.productId === product._id && item.size === selectedSize
//     );

//     if (existingItemIndex !== -1) {
//       cart[existingItemIndex].quantity += 1;
//     } else {
//       cart.push(newItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
    
//     setIsAddedToCart(true);
//     setTimeout(() => {
//       setIsAddedToCart(false);
//     }, 3000);
//   };
  
//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   if (loading) {
//     return (
//       <div className="bg-[#FFF7F2] min-h-screen flex justify-center items-center">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="w-16 h-16 border-4 border-[#2B2B2B] border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-lg font-medium text-gray-700">جاري تحميل تفاصيل المنتج...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-[#FFF7F2] min-h-screen flex justify-center items-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
//           <div className="text-red-500 text-5xl mb-4">
//             <span role="img" aria-label="error">⚠️</span>
//           </div>
//           <h2 className="text-2xl font-bold mb-4">حدث خطأ</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <div className="flex justify-center space-x-4 space-x-reverse">
//             <button 
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//             >
//               العودة للخلف
//             </button>
//             <button 
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-[#2B2B2B] text-white rounded-md hover:bg-black transition"
//             >
//               إعادة المحاولة
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="bg-[#FFF7F2] min-h-screen flex justify-center items-center">
//         <div className="text-center p-8">
//           <h2 className="text-2xl font-bold mb-4">هذا المنتج غير متوفر</h2>
//           <button 
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-[#2B2B2B] text-white rounded-md hover:bg-black transition flex items-center justify-center mx-auto"
//           >
//             <FaArrowLeft className="ml-2" /> العودة للتسوق
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const originalPrice = Math.round(product.price * 1.25);

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen font-['29LT_Bukra']">
//       {isAddedToCart && (
//         <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-50 flex items-center gap-2 animate-fade-in">
//           <FaCheck /> تمت إضافة المنتج إلى السلة بنجاح
//         </div>
//       )}

//       <div id="size-error" className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg z-50 flex items-center gap-2 hidden">
//         <span role="img" aria-label="warning">⚠️</span> الرجاء اختيار المقاس
//       </div>

//       <div className="bg-white shadow-sm">
//         <div className="container mx-auto py-4 px-4">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center text-gray-600 hover:text-[#2B2B2B] transition"
//           >
//             <FaArrowLeft className="ml-2" /> العودة للتسوق
//           </button>
//         </div>
//       </div>

//       <div className="container mx-auto py-8 px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg p-4 shadow-md">
//               <img 
//                 src={`http://localhost:5000${product.images[selectedImage]}`} 
//                 alt={product.name} 
//                 className="w-full h-96 object-contain rounded-md"
//               />
//             </div>

//             <div className="flex justify-center space-x-4 space-x-reverse">
//               {product.images.map((image, index) => (
//                 <div 
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`w-20 h-20 rounded-md cursor-pointer p-1 ${selectedImage === index ? 'border-2 border-[#2B2B2B]' : 'border border-gray-300'}`}
//                 >
//                   <img 
//                     src={`http://localhost:5000${image}`} 
//                     alt={`${product.name} - ${index + 1}`} 
//                     className="w-full h-full object-cover rounded"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="flex text-yellow-400">
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <FaStar key={star} />
//                   ))}
//                 </div>
//                 <span className="text-gray-500">({product.ratings.length} تقييم)</span>
//               </div>
              
//               <div className="space-y-2">
//                 <p className="text-gray-500">السعر السابق: <del>{originalPrice} دينار</del></p>
//                 <p className="text-xl text-[#2B2B2B]">{product.price} دينار</p>
//               </div>

//               <div className="space-y-2">
//                 <p className="text-lg font-semibold">المقاسات المتوفرة</p>
//                 <div className="flex gap-2">
//                   {product.size.map((size, index) => (
//                     <button 
//                       key={index}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-4 py-2 border rounded-lg ${selectedSize === size ? 'bg-[#2B2B2B] text-white' : 'bg-gray-100'}`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <button 
//                 onClick={addToCart}
//                 className="w-full py-3 bg-[#2B2B2B] text-white rounded-md flex items-center justify-center gap-2 hover:bg-black transition"
//               >
//                 <FaShoppingCart /> إضافة إلى السلة
//               </button>
//             </div>

//             <div className="bg-[#F7F7F7] rounded-lg p-4">
//               <div className="flex items-center gap-2">
//                 <FaShippingFast className="text-[#2B2B2B]" />
//                 <span>شحن مجاني</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
