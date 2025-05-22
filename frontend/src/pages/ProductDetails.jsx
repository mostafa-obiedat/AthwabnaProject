import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice'; 
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
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [addedToCart, setAddedToCart] = useState(null);
  const [timers, setTimers] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const addToCartHandler = (e, product) => {
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
      availableSizes: product.size,
      color: selectedColor,
      discount: product.discount,
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
    dispatch(addToCart(newItem));
    setAddedToCart(product._id);
    setTimeout(() => setAddedToCart(null), 2000);
    toast.success('تمت إضافة المنتج إلى السلة بنجاح');
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
useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      relatedProducts.forEach(product => {
        // إذا كان المنتج له تاريخ انتهاء
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
            fetchData();
          }
        } else {
          // إذا لم يكن له تاريخ انتهاء، نعرض "عرض مستمر"
          newTimers[product._id] = 'عرض مستمر';
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [relatedProducts]);
  
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

  const finalPrice = product.price - (product.price * product.discount / 100);
  
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Navigation */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-red-700 hover:text-red-800 cursor-pointer"
          >
            <FaArrowLeft className="ml-2" /> العودة
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 text-[#2B2B2B]">
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
              {product.discount > 0 && (
                <>
                  <p className="text-gray-500">
                    السعر السابق: <del>{product.price} د.أ</del>
                  </p>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    خصم {product.discount}%
                  </span>
                </>
              )}
              <p className="text-xl font-bold mt-2">السعر <span className='text-xl text-red-700'>{finalPrice}</span> د.أ</p>
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
                        ? 'bg-[#2B2B2B] text-white border-gray-800 cursor-pointer'
                        : 'bg-white border-gray-300 hover:border-gray-400 cursor-pointer'
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
                onClick={(e) => addToCartHandler(e, product)}
                className="flex-1 bg-[#2B2B2B] hover:bg-[#222222] text-white py-3 px-6 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaShoppingCart /> أضف إلى السلة
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToFavorites(e, product._id);
                }}
                className={`p-3 rounded border ${
                  false
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
                  <FaShippingFast className="mt-1" />
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
                  <FaExchangeAlt className="mt-1" />
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
  <div className="mt-8 sm:mt-12 md:mt-16">
    <div className="flex justify-between items-center mb-4 sm:mb-6 pb-2 border-b border-gray-200">
      <h2 className="text-red-700 text-base sm:text-lg md:text-xl font-semibold">
        منتجات ذات صلة
      </h2>
      <div className="custom-next-button flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse">
        <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
          <FaArrowLeft size={14} className="transform rotate-180 sm:text-base" />
        </button>
        <button className="custom-prev-button w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
          <FaArrowLeft size={14} className="sm:text-base" />
        </button>
      </div>
    </div>
    
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1.2}
      breakpoints={{
        320: { slidesPerView: Math.min(1.2, relatedProducts.length), spaceBetween: 10 },
        480: { slidesPerView: Math.min(1.8, relatedProducts.length), spaceBetween: 15 },
        640: { slidesPerView: Math.min(2, relatedProducts.length), spaceBetween: 15 },
        768: { slidesPerView: Math.min(3, relatedProducts.length), spaceBetween: 20 },
        1024: { slidesPerView: Math.min(4, relatedProducts.length), spaceBetween: 20 }
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
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full mx-1 sm:mx-2 max-w-full sm:max-w-[300px]">
            {/* الصورة */}
            <div
              className="relative h-32 xs:h-36 sm:h-40 md:h-48 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${related._id}`)}
            >
              <img
                src={`${API_BASE_URL.replace('/api', '')}${related.images[0]}`}
                alt={related.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
              {related._id === product._id && (
                <div className="bg-red-700 text-white absolute top-1 sm:top-2 right-1 sm:right-2 text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">
                  المنتج الحالي
                </div>
              )}
              {related.discount > 0 && (
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-100 text-red-600 text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">
                  خصم {related.discount}%
                </div>
              )}
            </div>
      
            {/* المحتوى */}
            <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-xs sm:text-sm md:text-lg mb-1 truncate">
                {related.name}
              </h3>
              
              <div className="flex items-center mb-1 sm:mb-2">
                {renderStars(related.averageRating || 0)}
                <span className="text-gray-500 text-xs mr-1">
                  ({related.ratings?.length || 0})
                </span>
              </div>
      
              {/* قسم الأسعار - ارتفاع ثابت */}
              <div className="min-h-[50px] sm:min-h-[60px] flex flex-col justify-center">
                <div className="flex items-center gap-1 sm:gap-2">
                  {related.discount > 0 ? (
                    <>
                      <p className="text-red-700 font-bold text-xs sm:text-sm md:text-base">
                        {related.price - (related.price * related.discount) / 100} د.أ
                      </p>
                      <p className="line-through text-xs text-gray-500">
                        {related.price} د.أ
                      </p>
                    </>
                  ) : (
                    <p className="text-red-700 font-bold text-xs sm:text-sm md:text-base">
                      {related.price} د.أ
                    </p>
                  )}
                </div>
      
                {related.discount > 0 && (
                  <div className="mt-1">
                    {related.offerEndDate ? (
                      <span className="text-[8.6px] bg-red-100 text-red-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                        ينتهي خلال: {timers[related._id] || '...'}
                      </span>
                    ) : (
                      <span className="text-[8px] xs:text-[8.6px] sm:text-xs bg-green-100 text-green-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                        عرض مستمر
                      </span>
                    )}
                  </div>
                )}
              </div>
      
              {/* المقاسات */}
              {related.size?.length > 0 && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 truncate">
                  المقاسات: {related.size.join(', ')}
                </p>
              )}
            </div>
      
            {/* الزر */}
            <div className="p-2 sm:p-3 md:p-4 pt-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${related._id}`);
                }}
                className={`w-full bg-[#2B2B2B] hover:bg-[#222222] text-white py-1 sm:py-2 px-2 sm:px-3 md:px-4 rounded transition-all duration-300 hover:shadow cursor-pointer text-xs sm:text-sm`}
              >
                عرض المنتج
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    
    {/* Custom Pagination */}
    <div className="custom-pagination flex justify-center mt-4 sm:mt-6"></div>
    
    {/* Add CSS to your component or global styles */}
    <style jsx>{`
      .custom-bullet {
        width: 6px;
        height: 6px;
        display: inline-block;
        border-radius: 50%;
        background: #ccc;
        margin: 0 3px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      @media (min-width: 640px) {
        .custom-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px;
        }
      }
      
      .custom-bullet-active {
        background: #2B2B2B;
        width: 18px;
        border-radius: 4px;
      }
      
      @media (min-width: 640px) {
        .custom-bullet-active {
          width: 24px;
        }
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

