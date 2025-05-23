import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice'; 
import axios from 'axios';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/favorites', {
                    withCredentials: true,
                });
                setFavorites(response.data);
            } catch (error) {
                console.error('فشل في جلب المفضلة:', error);
                toast.error('فشل في جلب المفضلة');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const renderStars = (rating) => {
        if (!rating) return (
            <span className="text-gray-400 text-sm">(غير مصنف)</span>
        );

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

    const removeFromFavorites = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/favorites/${productId}`, {
                withCredentials: true,
            });
            setFavorites(favorites.filter(fav => fav.product._id !== productId));
            toast.success('تمت إزالة المنتج من المفضلة');
        } catch (error) {
            console.error('فشل في حذف المنتج من المفضلة:', error);
            toast.error('فشل في حذف المنتج');
        }
    };

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
        toast.success('تمت الإضافة إلى السلة');
    };

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen p-5">
            <Toaster position="top-center" reverseOrder={false} />
            <h2 className="text-2xl text-red-700 font-bold mb-6 pb-2 border-b border-gray-200">المفضلة</h2>

            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : favorites.length === 0 ? (
                <p className="text-center py-5">لا يوجد منتجات مضافة إلى المفضلة بعد.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map(({ product }) => (
                        product && (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col relative"
                            >
                                <div 
                                    className="relative h-48 overflow-hidden cursor-pointer"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <img
                                        src={product.images?.[0] 
                                            ? `http://localhost:5000${product.images[0]}`
                                            : '/placeholder-product.jpg'}
                                        alt={product.name || 'Product'}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                        onError={(e) => {
                                            e.target.src = '/placeholder-product.jpg';
                                        }}
                                    />
                                </div>

                                <div className="p-4 flex-grow">
                                    <h3 
                                        className="font-semibold text-lg mb-1 cursor-pointer hover:text-gray-600"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        {product.name || 'منتج غير معروف'}
                                    </h3>
                                    
                                    <div className="flex items-center mb-2">
                                        {renderStars(product.averageRating)}
                                        <span className="text-gray-500 text-xs mr-1">
                                            ({product.ratings?.length || 0})
                                        </span>
                                    </div>
                                    
                                    <p className="text-red-700 font-bold mb-2">
                                        {product.price ? `${product.price} د.أ` : 'السعر غير متوفر'}
                                    </p>
                                    
                                    {product.size && (
                                        <p className="text-sm text-gray-500 mb-2">
                                            المقاسات: {product.size.join(', ')}
                                        </p>
                                    )}
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromFavorites(product._id);
                                    }}
                                    className="absolute top-2 right-2 p-2 rounded-full border cursor-pointer text-red-500 border-red-500 bg-white hover:bg-red-50"
                                >
                                    <FaHeart />
                                </button>

                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorite;