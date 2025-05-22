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
import toast, { Toaster } from 'react-hot-toast';
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
  const [timers, setTimers] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const API_BASE_URL = 'http://localhost:5000/api';
  const themeColor = "bg-[#2B2B2B] hover:bg-[#222222]";
  const themeTextColor = "text-gray-700";
  const secondaryColor = "bg-[#AA1313] hover:bg-[#8a0f0f]";

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

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      suggestedProducts.forEach(product => {
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
            fetchProducts();
          }
        } else {
          // إذا لم يكن له تاريخ انتهاء، نعرض "عرض مستمر"
          newTimers[product._id] = 'عرض مستمر';
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
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
    toast.success("تم حذف المنتج من السلة بنجاح");
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
    toast.success("تم تغيير المقاس بنجاح");
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
    toast.success("تم تغيير الكمية بنجاح");
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
    return <div className="text-center py-5 animate-pulse">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="text-xl sm:text-2xl font-bold mb-4">السلة فارغة</div>
        <button
          onClick={() => navigate("/")}
          className={`${themeColor} text-white py-2 px-4 rounded-lg transition-colors duration-300 mt-4 cursor-pointer`}
        >
          تصفح المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl text-red-700 font-bold mb-6 pb-2 border-b border-gray-200">سلة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* تفاصيل المنتجات */}
        <div className="lg:col-span-2">
          {cart.map((product) => (
            <div
              key={`${product.productId}-${product.size}`}
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-4 md:mb-6 transform transition-all duration-300 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* صورة المنتج */}
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.title}
                  className="w-full sm:w-24 h-32 object-cover rounded transition-transform duration-300 hover:scale-105"
                />

                {/* محتوى أفقي */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start text-right">
                    {/* اسم المنتج */}
                    <div className="flex flex-col mb-2 sm:mb-0 w-full sm:w-auto">
                      <p className="text-gray-500 text-sm">اسم المنتج</p>
                      <h3 className="font-bold text-sm sm:text-base">{product.title}</h3>
                    </div>

                    {/* قسم المقاس */}
                    <div className="mb-2 w-full sm:w-auto">
                      <p className="text-gray-500 text-sm">المقاس</p>
                      {editingSize === product.productId ? (
                        <div className="flex items-center justify-end gap-2">
                          <select
                            className="border rounded p-1 text-xs sm:text-sm focus:ring-2 focus:ring-amber-300 outline-none cursor-pointer"
                            value={tempSize}
                            onChange={(e) => setTempSize(e.target.value)}
                          >
                            {product.availableSizes?.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                          <button
                            className={`px-2 py-1 ${themeColor} text-white rounded text-xs sm:text-sm transition-colors duration-300 cursor-pointer`}
                            onClick={() => saveSize(product.productId, product.size)}
                          >
                            حفظ
                          </button>
                          <button
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
                            onClick={() => setEditingSize(null)}
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end items-center">
                          <span className="text-sm sm:text-base">{product.size}</span>
                          <button
                            className={`${themeTextColor} text-xs sm:text-sm mr-2 border-b border-gray-600 cursor-pointer`}
                            onClick={() => {
                              startEditingSize(product.productId, product.size);
                              setTempSize(product.size);
                            }}
                          >
                            تغيير
                          </button>
                        </div>
                      )}
                    </div>

                    {/* السعر */}
                    <div className="flex flex-col mb-2 sm:mb-0 w-full sm:w-auto">
                      <p className="text-gray-500 text-sm">السعر</p>
                      <div className="flex gap-1">
                        {product.discount ? (
                          <>
                            <p className="text-red-600 font-bold text-sm sm:text-base">
                              {product.price - (product.price * product.discount) / 100} دينار
                            </p>
                            <p className="line-through text-xs sm:text-sm text-gray-500 ms-2">
                              {product.price} دينار
                            </p>
                          </>
                        ) : (
                          <p className="text-red-600 font-bold text-sm sm:text-base">{product.price} دينار</p>
                        )}
                      </div>
                    </div>

                    {/* قسم الكمية */}
                    <div className="w-full sm:w-auto">
                      <p className="text-gray-500 text-sm">الكمية</p>
                      {editingQuantity === product.productId ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-300 cursor-pointer"
                            onClick={() => setTempQuantity(prev => Math.max(1, prev - 1))}
                          >
                            -
                          </button>
                          <span className="mx-2 text-sm sm:text-base">{tempQuantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-300 cursor-pointer"
                            onClick={() => setTempQuantity(prev => prev + 1)}
                          >
                            +
                          </button>
                          <button
                            className={`px-2 py-1 ${themeColor} text-white rounded text-xs sm:text-sm transition-colors duration-300 cursor-pointer`}
                            onClick={() => saveQuantity(product.productId)}
                          >
                            حفظ
                          </button>
                          <button
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
                            onClick={() => setEditingQuantity(null)}
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end items-center">
                          <span className="text-sm sm:text-base">{product.quantity}</span>
                          <button
                            className={`${themeTextColor} text-xs sm:text-sm mr-2 hover:text-gray-800 border-b border-gray-600 cursor-pointer`}
                            onClick={() => startEditingQuantity(product.productId, product.quantity)}
                          >
                            تغيير
                          </button>
                        </div>
                      )}
                    </div>

                    {/* زر الحذف */}
                    <button
                      className="text-2xl text-gray-400 hover:text-[#AA1313] transition-colors duration-300 hidden sm:block cursor-pointer"
                      onClick={() => handleRemoveFromCart(product.productId, product.size)}
                    >
                      &times;
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    {/* إضافة إلى المفضلة */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToFavorites(e, product.productId);
                      }}
                      className={`${themeTextColor} flex items-center gap-1 text-xs sm:text-sm hover:underline transition-colors duration-300 cursor-pointer`}
                    >
                      <FaHeart className="text-red-500" size={14} />
                      <span>إضافة الى المفضلة</span>
                    </button>

                    {/* زر الحذف للموبايل */}
                    <button
                      className="sm:hidden text-[#AA1313] hover:text-[#8a0f0f] transition-colors duration-300 text-xs sm:text-sm cursor-pointer"
                      onClick={() => handleRemoveFromCart(product.productId, product.size)}
                    >
                      حذف من السلة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ملخص الطلب */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm sticky top-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-6 text-right">ملخص الطلب</h2>

            <div className="space-y-3 text-right">
              {/* 1. السعر */}
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm sm:text-base">السعر</span>
                <span className="text-red-600 text-sm sm:text-base">{cart.reduce((total, item) => total + item.price * item.quantity, 0)} دينار</span>
              </div>

              {/* 2. التخفيضات */}
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm sm:text-base">الخصم</span>
                <span className="text-red-700 text-sm sm:text-base">{cart.reduce((total, item) => {
                  const itemDiscount = item.discount ? (item.price * item.discount) / 100 : 0;
                  return total + itemDiscount;
                }, 0)} دينار</span>
              </div>

              {/* الخط الفاصل */}
              <hr className="my-3 border-gray-200" />

              {/* 3. الإجمالي */}
              <div className="flex justify-between font-bold text-base sm:text-lg pt-2">
                <span>السعر النهائي</span>
                <span>
                  {cart.reduce((total, item) => {
                    const priceAfterDiscount = item.discount
                      ? item.price - (item.price * item.discount) / 100
                      : item.price;

                    return total + priceAfterDiscount * item.quantity;
                  }, 0)} دينار
                </span>
              </div>
            </div>

            {/* زر الدفع */}
            {isAuthenticated ? (
              <button
                className={`w-full mt-6 ${themeColor} text-white py-2 sm:py-3 rounded-lg transition-colors duration-300 font-medium transform cursor-pointer text-sm sm:text-base`}
                onClick={() => navigate("/checkout")}
              >
                إتمام عملية الشراء
              </button>
            ) : (
              <div className="text-right mt-6">
                <p className="text-xs sm:text-sm text-[#AA1313] mb-2">يجب تسجيل الدخول لإكمال الشراء</p>
                <button
                  className={`w-full ${themeColor} text-white py-2 sm:py-3 rounded-lg transition-colors duration-300 font-medium transform cursor-pointer text-sm sm:text-base`}
                  onClick={() => navigate("/login")}
                >
                  تسجيل الدخول
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* قسم المنتجات المقترحة */}
      {suggestedProducts.length > 0 && (
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="flex justify-between items-center mb-4 sm:mb-6 pb-2 border-b border-gray-200">
            <h2 className="text-red-700 text-lg sm:text-xl font-semibold">
              قد يعجبك أيضاً
            </h2>
            <div className="custom-next-button flex items-center space-x-2 rtl:space-x-reverse">
              <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
                <FaArrowLeft size={14} className="transform rotate-180" />
              </button>
              <button className="custom-prev-button w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
                <FaArrowLeft size={14} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: Math.min(2, suggestedProducts.length),
                spaceBetween: 15
              },
              640: {
                slidesPerView: Math.min(2, suggestedProducts.length),
                spaceBetween: 20
              },
              768: {
                slidesPerView: Math.min(3, suggestedProducts.length),
                spaceBetween: 20
              },
              1024: {
                slidesPerView: Math.min(4, suggestedProducts.length),
                spaceBetween: 20
              }
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
            className="mySwiper relative"
          >
            {suggestedProducts.map((related) => (
              <SwiperSlide key={related._id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full mx-1 sm:mx-2 max-w-[300px]">
                  {/* الصورة */}
                  <div
                    className="relative h-40 sm:h-48 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${related._id}`)}
                  >
                    <img
                      src={`${API_BASE_URL.replace('/api', '')}${related.images[0]}`}
                      alt={related.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    {related.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded z-10">
                        خصم {related.discount}%
                      </div>
                    )}
                  </div>

                  {/* المحتوى */}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-sm sm:text-lg mb-1 truncate">
                      {related.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      {renderStars(related.averageRating || 0)}
                      <span className="text-gray-500 text-xs mr-1">
                        ({related.ratings?.length || 0})
                      </span>
                    </div>

                    {/* قسم الأسعار - ارتفاع ثابت */}
                    <div className="min-h-[60px] flex flex-col justify-center">
                      <div className="flex items-center gap-2">
                        {related.discount > 0 ? (
                          <>
                            <p className="text-red-600 font-bold">
                              {related.price - (related.price * related.discount) / 100} د.أ
                            </p>
                            <p className="line-through text-sm text-gray-500">
                              {related.price} د.أ
                            </p>
                          </>
                        ) : (
                          <p className="text-red-600 font-bold text-sm sm:text-base">
                            {related.price} د.أ
                          </p>
                        )}
                      </div>

                      {related.discount > 0 && (
                        <div className="mt-1">
                          {related.offerEndDate ? (
                            <span className="text-[8.6px] bg-red-100 text-red-600 px-2 py-1 rounded">
                              ينتهي خلال: {timers[related._id] || '...'}
                            </span>
                          ) : (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                              عرض مستمر
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* المقاسات */}
                    {related.size?.length > 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        المقاسات: {related.size.join(', ')}
                      </p>
                    )}
                  </div>

                  {/* الزر */}
                  <div className="p-3 sm:p-4 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${related._id}`);
                      }}
                      className={`w-full ${themeColor} text-white py-1 sm:py-2 px-3 sm:px-4 rounded transition-all duration-300 hover:shadow cursor-pointer text-xs sm:text-sm`}
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

          {/* إضافة الأنماط CSS */}
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

