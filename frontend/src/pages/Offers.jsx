import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Offers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [addedToCart, setAddedToCart] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const [timers, setTimers] = useState({});
    const [minDiscount, setMinDiscount] = useState('');
    const [maxDiscount, setMaxDiscount] = useState('');
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
            const response = await axios.get('http://localhost:5000/api/products/offers', {
                params: {
                    sortBy: sortBy !== '' ? sortBy : undefined,
                    page: currentPage,
                    limit: 4,
                    minDiscount: minDiscount || undefined,
                    maxDiscount: maxDiscount || undefined,
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
    }, [sortBy, currentPage, minDiscount, maxDiscount]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimers = {};
            products.forEach(product => {
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
    }, [products]);

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

    const renderStars = rating => {
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

    const resetFilters = () => {
        setSortBy('');
        setMinDiscount('');
        setMaxDiscount('');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-2xl text-red-700 font-bold mb-6 pb-2 border-b border-gray-200">
                    قسم العروض والتخفيضات
                </h2>

                {/* قائمة الفلترة */}
                <div className="filter grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 items-center mb-6">
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="sort" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">ترتيب حسب:</label>
                        <select
                            id="sort"
                            className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-red-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
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
                        <label htmlFor="minDiscount" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">أقل خصم %</label>
                        <input
                            type="number"
                            id="minDiscount"
                            placeholder="0"
                            min="0"
                            max="100"
                            className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-red-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={minDiscount}
                            onChange={(e) => {
                                setMinDiscount(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="maxDiscount" className="block mb-1 text-xs sm:text-sm font-medium text-gray-700">أعلى خصم %</label>
                        <input
                            type="number"
                            id="maxDiscount"
                            placeholder="100"
                            min="0"
                            max="100"
                            className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-red-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                            value={maxDiscount}
                            onChange={(e) => {
                                setMaxDiscount(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div className="self-end col-span-2 sm:col-span-1">
                        <button
                            onClick={resetFilters}
                            className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-red-700 text-white text-xs sm:text-sm rounded-md hover:bg-red-800 cursor-pointer"
                        >
                            إعادة الضبط
                        </button>
                    </div>
                </div>
                {/* المنتجات */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.length === 0 && (
                                <div className="text-center py-10 text-gray-600 text-lg col-span-full">
                                    لا توجد عروض حالياً
                                </div>
                            )}

                            {products.map(product => {
                                const finalPrice = product.price - (product.price * product.discount) / 100;

                                return (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col relative"
                                    >
                                        <span className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded z-10">
                                            خصم {product.discount}%
                                        </span>
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

                                        <div className="p-4 flex-grow">
                                            <h3
                                                className="font-semibold text-lg mb-1 cursor-pointer hover:text-gray-600"
                                                onClick={() => navigate(`/product/${product._id}`)}
                                            >
                                                {product.name}
                                            </h3>

                                            <div className="flex items-center mb-2">
                                                {renderStars(product.averageRating || 0)}
                                                <span className="text-gray-500 text-xs mr-1">
                                                    ({product.ratings?.length || 0})
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="text-red-700 font-bold text-lg">
                                                    {finalPrice.toFixed(2)} د.أ
                                                </span>
                                                <span className="line-through text-sm text-gray-500 ms-2">
                                                    {product.price.toFixed(2)} د.أ
                                                </span>
                                            </div>
                                            {product.offerEndDate ? (
                                                <span className="text-[8.6px] bg-red-100 text-red-600 px-2 py-1 rounded">
                                                    ينتهي خلال: {timers[product._id] || '...'}
                                                </span>
                                            ) : (
                                                <span className="text-[8.6px] bg-green-100 text-green-600 px-2 py-1 rounded">
                                                    عرض مستمر
                                                </span>
                                            )}
                                            <p className="text-sm text-gray-500 mt-2">
                                                المقاسات: {product.size.join(', ')}
                                            </p>
                                        </div>

                                        <div className="p-4 pt-0 flex justify-between gap-2">
                                            <button
                                                onClick={(e) => addToCartHandler(e, product)}
                                                className="flex-1 bg-[#2B2B2B] hover:bg-[#1a1a1a] text-white py-2 px-3 rounded flex items-center justify-center gap-2 text-sm cursor-pointer"
                                                disabled={!product._id}
                                            >
                                                <FaShoppingCart /> اضف الى السلة
                                            </button>
                                        </div>

                                        {/* زر المفضلة */}
                                        <button
                                            onClick={(e) => addToFavorites(e, product._id)}
                                            className={`absolute top-1 sm:top-2 right-1 sm:right-2 p-1 sm:p-2 rounded-full border cursor-pointer text-xs sm:text-sm ${favorites.includes(product._id)
                                                ? 'text-red-500 border-red-500 bg-red-50 hover:bg-red-100'
                                                : 'text-gray-500 border-gray-300 hover:border-gray-400 bg-white'
                                                }`}
                                        >
                                            <FaHeart />
                                        </button>

                                        {/* {addedToCart === product._id && (
                                            <div className="absolute top-2 right-10 bg-green-500 text-white px-2 py-1 rounded text-xs cursor-pointer">
                                                تمت الإضافة
                                            </div>
                                        )} */}
                                    </div>
                                );
                            })}
                        </div>

                        {/* الترقيم */}
                        {!loading && totalPages > 1 && (
                            <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                                <div className="bg-white rounded-lg shadow-sm sm:shadow-md inline-flex p-1">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm md:text-base ${currentPage === 1
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
                                        className={`px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-sm md:text-base ${currentPage === totalPages
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
                                            } transition-colors duration-300`}
                                    >
                                        التالي
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Offers;