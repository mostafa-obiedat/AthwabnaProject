import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import { FaGlobe, FaUser, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import axios from 'axios'; // استيراد axios

const Men = () => {
  const [products, setProducts] = useState([]); // حالة لتخزين المنتجات
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ
  const navigate = useNavigate(); // استخدام useNavigate للتنقل

  // جلب البيانات من الخادم
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/kids'); // جلب المنتجات من API
        setProducts(response.data); // تحديث حالة المنتجات
      } catch (err) {
        setError(err.message); // في حالة حدوث خطأ
      } finally {
        setLoading(false); // إيقاف التحميل
      }
    };

    fetchProducts();
  }, []);

  // عرض حالة التحميل
  if (loading) {
    return <div className="text-center py-5">جاري التحميل...</div>;
  }

  // عرض حالة الخطأ
  if (error) {
    return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;
  }

  // الانتقال إلى صفحة تفاصيل المنتج
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // الانتقال إلى صفحة التفاصيل
  };
  
  return (
    <div className="bg-[#FFF7F2] min-h-screen">
      {/* قسم المنتجات */}
      <div className="container mx-auto py-5">
        <h2 className="text-2xl font-bold mt-5 mb-4">قسم ملابس الاطفال</h2>
        <div className="filter flex justify-between items-center mb-4">
          <label htmlFor="sort" className="form-label">ترتيب حسب:</label>
          <select id="sort" className="form-select w-auto">
            <option>حسب المنطقة</option>
            <option>حسب السعر</option>
            <option>حسب الشعبية</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div
              key={product._id}
              className="card text-center p-3 bg-white rounded-lg shadow-md flex flex-col h-full cursor-pointer"
              onClick={() => handleProductClick(product._id)} // النقر على البطاقة
            >
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-3 rounded-lg" />
              <h6 className="card-title font-semibold">{product.name}</h6>
              <p className="card-text text-gray-600">{product.price} دينار</p>
              <p className="text-sm text-gray-500">الأحجام: {product.size.join(', ')}</p>
              <p className="text-sm text-gray-500">الألوان: {product.color.join(', ')}</p>
              <div className="flex justify-between mt-auto">
                <button
                  className="btn btn-primary flex-grow-1 me-2 bg-[#2B2B2B] text-white px-4 py-2 rounded flex items-center justify-center gap-x-2"
                  onClick={(e) => e.stopPropagation()} // منع الانتقال عند النقر على الزر
                >
                  أضف الى السلة <FaShoppingCart />
                </button>
                <button
                  className="btn btn-outline-secondary text-gray-600 px-4 py-2 rounded"
                  onClick={(e) => e.stopPropagation()} // منع الانتقال عند النقر على الزر
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* زر العودة إلى أعلى */}
      <div className="back-to-top-container text-center my-5">
        <a href="#top" className="back-to-top inline-block px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
          العودة إلى أعلى ↑
        </a>
      </div>
    </div>
  );
};

export default Men;