import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice'; 
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [addedToCart, setAddedToCart] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchBestSellers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/products/bestsellers', {
                params: {
                    sortBy: sortBy !== '' ? sortBy : undefined,
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
        fetchBestSellers();
    }, [sortBy, currentPage]);

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
        try {
            await axios.post(
                'http://localhost:5000/api/favorites/add',
                { productId },
                { withCredentials: true }
            );
            toast.success('تمت الإضافة إلى المفضلة بنجاح!');
        } catch (err) {
            toast.error('يجب تسجيل الدخول أولًا لإضافة إلى المفضلة');
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

    return (
        <div className="min-h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-2xl text-red-700 font-bold mb-6 pb-2 border-b border-gray-200">
                    قسم المنتجات الأكثر مبيعاً
                </h2>

                {/* قائمة الفلترة */}
                <div className="filter flex flex-wrap gap-4 items-center mb-6">
                    <div>
                        <label htmlFor="sort" className="block mb-1 text-sm font-medium text-gray-700">ترتيب حسب:</label>
                        <select
                            id="sort"
                            className="w-full px-3 py-2 text-red-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                                    لا توجد منتجات حالياً
                                </div>
                            )}

                            {products.map(product => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col relative"
                                >
                                    {product.discount > 0 && (
                                        <span className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded z-10">
                                            خصم {product.discount}%
                                        </span>
                                    )}

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
                                            <span className="text-red-600 font-bold text-lg">
                                                {product.discount > 0
                                                    ? (product.price - (product.price * product.discount / 100)).toFixed(2)
                                                    : product.price.toFixed(2)
                                                } د.أ
                                            </span>
                                            {product.discount > 0 && (
                                                <span className="line-through text-sm text-gray-500 ms-2">
                                                    {product.price.toFixed(2)} د.أ
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-500 mt-2">
                                            تم بيع: {product.sold || 0}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-2">
                                            المقاسات: {product.size?.join(', ') || 'غير محدد'}
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

                                    <button
                                        onClick={e => addToFavorites(e, product._id)}
                                        className="absolute top-2 right-2 p-2 rounded-full border text-gray-500 border-gray-300 hover:border-gray-400 bg-white"
                                    >
                                        <FaHeart />
                                    </button>

                                    {/* {addedToCart === product._id && (
                                        <div className="absolute top-2 right-10 bg-green-500 text-white px-2 py-1 rounded text-xs cursor-pointer">
                                            تمت الإضافة
                                        </div>
                                    )} */}
                                </div>
                            ))}
                        </div>

                        {!loading && totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 my-8">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
                                >
                                    السابق
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-4 py-2 border rounded-md ${currentPage === index + 1
                                            ? 'bg-[#2B2B2B] text-white border-gray-800'
                                            : 'border-gray-300 hover:bg-gray-100'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
                                >
                                    التالي
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BestSellers;