import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const MenAccessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [addedToCart, setAddedToCart] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products/menaccessories', {
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
    fetchProducts();
  }, [sortBy, currentPage]);

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

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">قسم الإكسسوارات الرجالية</h2>

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
                  <p className="text-gray-800 font-bold mb-2">
                    {product.price} د.أ
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    المقاسات: {product.size.join(', ')}
                  </p>
                </div>
                <div className="p-4 pt-0 flex justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(e, product);
                    }}
                    className="flex-1 bg-[#2B2B2B] text-white py-2 px-3 rounded flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <FaShoppingCart />
                    اضف الى السلة
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToFavorites(e, product._id);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full border ${false
                    ? 'text-red-500 border-red-500 bg-white'
                    : 'text-gray-500 border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                >
                  <FaHeart />
                </button>
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
      </div>
    </div>
  );
};

export default MenAccessories;
