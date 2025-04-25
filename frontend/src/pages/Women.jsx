import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const Women = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [region, setRegion] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products/women', {
        params: {
          sortBy: sortBy !== '' ? sortBy : undefined,
          region: region !== '' ? region : undefined,
        },
      });
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy, region]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-[#FFF7F2] min-h-screen">
      <div className="container mx-auto py-5">
        <h2 className="text-2xl font-bold mt-5 mb-4">قسم الملابس النسائية</h2>

        <div className="filter flex gap-4 flex-wrap items-center mb-4">
          <div>
            <label htmlFor="sort" className="form-label block mb-1">ترتيب حسب:</label>
            <select
              id="sort"
              className="form-select w-full px-2 py-1 rounded border"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option value="">الافتراضي</option>
              <option value="price">حسب السعر</option>
              <option value="popularity">حسب الشعبية</option>
            </select>
          </div>

          <div>
            <label htmlFor="region" className="form-label block mb-1">حسب المنطقة:</label>
            <select
              id="region"
              className="form-select w-full px-2 py-1 rounded border"
              onChange={(e) => setRegion(e.target.value)}
              value={region}
            >
              <option value="">الكل</option>
              <option value="Amman">عمان</option>
              <option value="Irbid">اربد</option>
              <option value="Zarqa">الزرقاء</option>
              {/* أضف باقي المناطق حسب الحاجة */}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">جاري التحميل...</div>
        ) : error ? (
          <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.map(product => (
              <div
                key={product._id}
                className="card text-center p-3 bg-white rounded-lg shadow-md flex flex-col h-full cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={`http://localhost:5000${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-3 rounded-lg"
                />
                <h6 className="card-title font-semibold">{product.name}</h6>
                <p className="card-text text-gray-600">{product.price} دينار</p>
                <p className="text-sm text-gray-500">الأحجام: {product.size.join(', ')}</p>
                <p className="text-sm text-gray-500">الألوان: {product.color.join(', ')}</p>
                <div className="flex justify-between mt-auto">
                  <button
                    className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    أضف الى السلة <FaShoppingCart />
                  </button>
                  <button
                    className="text-gray-600 px-4 py-2 rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center my-5">
        <a href="#top" className="inline-block px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
          العودة إلى أعلى ↑
        </a>
      </div>
    </div>
  );
};

export default Women;
