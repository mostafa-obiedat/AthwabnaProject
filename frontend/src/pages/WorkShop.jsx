import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const WorkShop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // حالة الفلاتر
  const [filters, setFilters] = useState({
    freeOnly: false,
    maxPrice: 500,
    location: '',
  });

  // جلب البيانات مع تطبيق الفلاتر
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const params = {
          maxPrice: filters.freeOnly ? 0 : filters.maxPrice,
          freeOnly: filters.freeOnly,
          location: filters.location
        };

        const response = await axios.get('http://localhost:5000/api/workshops', { params });
        setWorkshops(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <div className="text-center py-5">جاري التحميل...</div>;
  if (error) return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;

  return (
    <div className="container mx-auto my-5 px-4" id="top">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* قسم الفلاتر */}
        <div className="lg:w-1/4 w-full mb-4">
          <div className="sticky top-8 z-10 bg-white border border-gray-300 rounded-2xl p-4 shadow-md">
            <h5 className="mb-3 font-medium">تصنيف حسب الفئة</h5>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded mb-3 p-2"
            >
              <option value="">جميع الأماكن</option>
              <option value="عمان">عمان</option>
              <option value="إربد">إربد</option>
              <option value="الزرقاء">الزرقاء</option>
            </select>

            <h5 className="mb-3 font-medium">تصنيف حسب السعر</h5>
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="1000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full mb-3 accent-[#AA1313]"
              disabled={filters.freeOnly}
            />
            <span className="block text-center mb-3">{filters.maxPrice} دينار</span>

            <div className="mb-3 flex items-center">
              <input
                type="checkbox"
                name="freeOnly"
                checked={filters.freeOnly}
                onChange={handleFilterChange}
                className="mr-2"
              />
              <label>ورشات مجانية فقط</label>
            </div>
          </div>
        </div>

        {/* عرض البطاقات */}
        <div className="lg:w-3/4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workshops.map((workshop) => (
              <div key={workshop._id} className="mb-4">
                <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-md h-[500px] flex flex-col">
                  <div className="bg-[#CEBEB3] text-white font-bold text-center py-2">
                    {workshop.isFree ? 'مجاناً' : `${workshop.price} دينار`}
                  </div>
                  <img
                    src={`http://localhost:5000${workshop.image}`}
                    className="h-[170px] w-full object-cover"
                    alt={workshop.title}
                  />
                  <div className="p-4 flex-grow">
                    <h6 className="font-medium">{workshop.title}</h6>
                    <p className="text-[#444] text-xs mt-8">{workshop.description}</p>
                    <p className="text-xs text-gray-400 mb-1">المكان: {workshop.location}</p>
                    <p className="text-xs text-gray-400 mb-1">الفئة العمرية</p>
                    <p className="text-sm">{workshop.ageRange}</p>
                  </div>
                  <div className="text-center p-4 border-t">
                    <Link to={`/workshops/${workshop._id}`}>
                      <button className="border border-[#AA1313] text-[#AA1313] py-2 px-4 rounded hover:bg-[#AA1313] hover:text-white transition duration-400 cursor-pointer">
                        المزيد
                      </button>
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShop;