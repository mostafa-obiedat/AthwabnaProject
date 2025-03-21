import React from 'react';
import { FaGlobe, FaUser, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import damerImage from '../assets/damer.jpg';

const Men = () => {
  // بيانات المنتجات
  const products = [
    { id: 1, name: "الدامر الأردني التقليدي", price: "63 دينار", image: damerImage },
    { id: 2, name: "الجبّة الاردنية التقليدية مصنوعة من..", price: "63 دينار", image: damerImage },
    { id: 3, name: "الدامر التقليدي", price: "60 دينار", image: damerImage },
    { id: 4, name: "الجوخة التقليدية الاردنية مصنوعة من ..", price: "60 دينار", image: damerImage },
    { id: 5, name: "الجوخة التقليدية الاردنية مصنوعة من ..", price: "60 دينار", image: damerImage },
    { id: 6, name: "الدامر التقليدي", price: "60 دينار", image: damerImage },
    { id: 7, name: "الجوخة التقليدية الاردنية مصنوعة من ..", price: "60 دينار", image: damerImage },
    { id: 8, name: "الجوخة التقليدية الاردنية مصنوعة من ..", price: "60 دينار", image: damerImage },
    // يمكنك إضافة المزيد من المنتجات هنا
  ];

  return (
    <div className="bg-[#FFF7F2] min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#2B2B2B] py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* القائمة اليمنى */}
          <ul className="flex space-x-4">
            <li><a href="men.html" className="text-white hover:text-gray-300">رجال</a></li>
            <li><a href="woman.html" className="text-white hover:text-gray-300">نساء</a></li>
            <li><a href="kids.html" className="text-white hover:text-gray-300">أطفال</a></li>
          </ul>

          {/* الشعار في المنتصف */}
          <a href="index.html" className="mx-auto">
            <img src="images/logo.png" alt="Logo" className="w-48" />
          </a>

          {/* الأيقونات */}
          <div className="flex space-x-4">
            <a href="?lang=en" className="text-white hover:text-gray-300">
              <FaGlobe />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaUser />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaSearch />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaShoppingCart />
            </a>
          </div>
        </div>
      </nav>

      {/* قسم المنتجات */}
      <div className="container mx-auto py-5">
        <h2 className="text-2xl font-bold mt-5 mb-4">قسم الملابس الرجالية</h2>
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
            <div key={product.id} className="card text-center p-3 bg-white rounded-lg shadow-md flex flex-col h-full">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-3 rounded-lg" />
              <h6 className="card-title font-semibold">{product.name}</h6>
              <p className="card-text text-gray-600">{product.price}</p>
              <div className="flex justify-between mt-auto">
                <button className="btn btn-primary flex-grow-1 me-2 bg-[#2B2B2B] text-white px-4 py-2 rounded flex items-center justify-center gap-x-2">
                  أضف الى السلة <FaShoppingCart />
                </button>
                <button className="btn btn-outline-secondary text-gray-600 px-4 py-2 rounded">
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