// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';


// const WorkShop = () => {
//   const [workshops, setWorkshops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // حالة الفلاتر
//   const [filters, setFilters] = useState({
//     freeOnly: false,
//     maxPrice: 500,
//     location: '',
//   });

//   // جلب البيانات مع تطبيق الفلاتر
//   useEffect(() => {
//     const fetchWorkshops = async () => {
//       try {
//         const params = {
//           maxPrice: filters.freeOnly ? 0 : filters.maxPrice,
//           freeOnly: filters.freeOnly,
//           location: filters.location
//         };

//         const response = await axios.get('http://localhost:5000/api/workshops', { params });
//         setWorkshops(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorkshops();
//   }, [filters]);

//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   if (loading) return <div className="text-center py-5">جاري التحميل...</div>;
//   if (error) return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;

//   return (
//     <div className="container mx-auto my-5 px-4" id="top">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* قسم الفلاتر */}
//         <div className="lg:w-1/4 w-full mb-4">
//           <div className="sticky top-8 z-10 bg-white border border-gray-300 rounded-2xl p-4 shadow-md">
//             <h5 className="mb-3 font-medium">تصنيف حسب الفئة</h5>
//             <select
//               name="location"
//               value={filters.location}
//               onChange={handleFilterChange}
//               className="w-full border border-gray-300 rounded mb-3 p-2"
//             >
//               <option value="">جميع الأماكن</option>
//               <option value="عمان">عمان</option>
//               <option value="إربد">إربد</option>
//               <option value="الزرقاء">الزرقاء</option>
//             </select>

//             <h5 className="mb-3 font-medium">تصنيف حسب السعر</h5>
//             <input
//               type="range"
//               name="maxPrice"
//               min="0"
//               max="1000"
//               value={filters.maxPrice}
//               onChange={handleFilterChange}
//               className="w-full mb-3 accent-[#AA1313]"
//               disabled={filters.freeOnly}
//             />
//             <span className="block text-center mb-3">{filters.maxPrice} دينار</span>

//             <div className="mb-3 flex items-center">
//               <input
//                 type="checkbox"
//                 name="freeOnly"
//                 checked={filters.freeOnly}
//                 onChange={handleFilterChange}
//                 className="mr-2"
//               />
//               <label>ورشات مجانية فقط</label>
//             </div>
//           </div>
//         </div>

//         {/* عرض البطاقات */}
//         <div className="lg:w-3/4 w-full">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {workshops.map((workshop) => (
//               <div key={workshop._id} className="mb-4">
//                 <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-md h-[500px] flex flex-col">
//                   <div className="bg-[#CEBEB3] text-white font-bold text-center py-2">
//                     {workshop.isFree ? 'مجاناً' : `${workshop.price} دينار`}
//                   </div>
//                   <img
//                     src={`http://localhost:5000${workshop.image}`}
//                     className="h-[170px] w-full object-cover"
//                     alt={workshop.title}
//                   />
//                   <div className="p-4 flex-grow">
//                     <h6 className="font-medium">{workshop.title}</h6>
//                     <p className="text-[#444] text-xs mt-8">{workshop.description}</p>
//                     <p className="text-xs text-gray-400 mb-1">المكان: {workshop.location}</p>
//                     <p className="text-xs text-gray-400 mb-1">الفئة العمرية</p>
//                     <p className="text-sm">{workshop.ageRange}</p>
//                   </div>
//                   <div className="text-center p-4 border-t">
//                     <Link to={`/workshops/${workshop._id}`}>
//                       <button className="border border-[#AA1313] text-[#AA1313] py-2 px-4 rounded hover:bg-[#AA1313] hover:text-white transition duration-400 cursor-pointer">
//                         المزيد
//                       </button>
//                     </Link>

//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkShop;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const WorkShop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false); // تغيير القيمة الابتدائية لـ loading
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // حالة الفلاتر
  const [filters, setFilters] = useState({
    freeOnly: false,
    maxPrice: 120,
    location: '',
    searchQuery: '',
  });

  // دالة جلب البيانات مع useCallback لتحسين الأداء
  const fetchWorkshops = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        maxPrice: filters.freeOnly ? 0 : filters.maxPrice,
        freeOnly: filters.freeOnly,
        location: filters.location,
        query: filters.searchQuery
      };

      const response = await axios.get('http://localhost:5000/api/workshops', { params });
      setWorkshops(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }, [filters]);

  // تأثير للبحث مع debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.searchQuery) {
        setFilters(prev => ({ ...prev, searchQuery: searchInput }));
      }
    }, 800); // زيادة وقت الانتظار إلى 800 مللي ثانية

    return () => clearTimeout(timer);
  }, [searchInput]);

  // تأثير لجلب البيانات عند تغيير الفلاتر
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWorkshops();
    }, 300); // تأخير طلب API قليلاً لتحسين التجربة

    return () => clearTimeout(timer);
  }, [filters, fetchWorkshops]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // تحسين تغيير السعر مع تأثير سلس
  const handlePriceChange = (e) => {
    const { value } = e.target;
    setFilters(prev => ({
      ...prev,
      maxPrice: parseInt(value)
    }));
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setIsTyping(true);
  };

  // تعريف مؤثر الدخول الجماعي
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading && workshops.length === 0) return <div className="text-center py-5">جاري التحميل...</div>;
  if (error) return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;

  return (
    <div className="container mx-auto my-5 px-4" id="top">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* قسم الفلاتر */}
        <div className="lg:w-1/4 w-full mb-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-24 transition-all duration-300 hover:shadow-xl">
            <h5 className="mb-4 font-bold text-right text-gray-800 text-lg border-b pb-2">مكان الورشة</h5>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg mb-6 p-3 text-right text-sm focus:ring-2 focus:ring-[#AA1313] focus:border-[#AA1313] transition-all hover:border-gray-400"
            >
              <option value="">جميع الأماكن</option>
              <option value="عمان">عمان</option>
              <option value="إربد">إربد</option>
              <option value="الزرقاء">الزرقاء</option>
            </select>

            <h5 className="mb-4 font-bold text-right text-gray-800 text-lg border-b pb-2">تصنيف حسب السعر</h5>
            <div className="text-sm block text-right mb-3 text-gray-600 font-medium">
              نطاق السعر: <span className="text-[#AA1313] font-bold">{filters.maxPrice} - 0</span> دينار
            </div>
            
            <div className="relative mb-6">
              <input
                type="range"
                name="maxPrice"
                min="0"
                max="120"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                className="w-full accent-[#AA1313] h-2 rounded-lg appearance-none cursor-pointer transition-all duration-300"
                disabled={filters.freeOnly}
              />
              <div className="w-full flex justify-between mt-1 px-1 text-xs text-gray-500">
                <span>0</span>
                <span>30</span>
                <span>60</span>
                <span>90</span>
                <span>120</span>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <button
                className="w-full bg-[#AA1313] hover:bg-[#8a0f0f] text-center text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-md"
                onClick={() => setFilters(prev => ({ ...prev, freeOnly: true, maxPrice: 0 }))}
              >
                عرض الورشات المجانية فقط
              </button>
              
              <button
                className="w-full border border-gray-300 bg-gray-50 hover:bg-gray-100 text-center py-3 rounded-lg font-medium transition-all text-gray-700"
                onClick={() => {
                  setFilters({ 
                    location: '', 
                    maxPrice: 120, 
                    freeOnly: false, 
                    searchQuery: '' 
                  });
                  setSearchInput('');
                  window.history.pushState({}, '', window.location.pathname);
                }}
              >
                إعادة ضبط الفلاتر
              </button>
              
              <div className="flex items-center mt-6 space-x-2 space-x-reverse rtl:space-x-reverse">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="ابحث عن ورشة عمل..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-right text-sm focus:ring-2 focus:ring-[#AA1313] focus:border-[#AA1313] transition-all hover:border-gray-400"
                  />
                  {(isTyping || loading) && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#AA1313]"></div>
                    </div>
                  )}
                </div>
                <button
                  className="bg-[#D4C1B1] hover:bg-[#c7b0a2] text-white py-3 px-5 rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-md flex-shrink-0"
                  onClick={() => {
                    const queryParams = new URLSearchParams();
                    if (filters.searchQuery) queryParams.append('query', filters.searchQuery);
                    if (filters.location) queryParams.append('location', filters.location);
                    if (filters.maxPrice < 120) queryParams.append('maxPrice', filters.maxPrice);
                    if (filters.freeOnly) queryParams.append('freeOnly', 'true');
                    
                    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
                    window.history.pushState({}, '', newUrl);
                  }}
                >
                  بحث
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4 w-full relative">
          {(loading && workshops.length > 0) && (
            <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA1313]"></div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col h-full relative"
              >
                {loading && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#AA1313]"></div>
                  </div>
                )}
                
                <Link to={`/workshops/${workshop._id}`}>
                  <div className="relative overflow-hidden cursor-pointer">
                    <motion.img
                      src={`http://localhost:5000${workshop.image}`}
                      alt={workshop.title}
                      className="h-52 w-full object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <div className="h-1 bg-[#AA1313] w-full absolute top-0 left-0"></div>
                    <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 text-black text-sm py-1 px-3 rounded-md shadow-sm">
                      {workshop.isFree ? 'مجاناً' : `${workshop.price} دينار`}
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col flex-grow p-5">
                  <h3 className="text-right font-semibold text-xl text-[#2B2B2B] mb-2">
                    {workshop.title}
                  </h3>

                  <div className="h-16 overflow-hidden text-right">
                    <p className="text-gray-500 text-sm leading-5">{workshop.description}</p>
                  </div>

                  <div className="mt-4 text-right">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">المكان:</span> {workshop.location}
                    </p>
                  </div>

                  <div className="mt-auto pt-5 border-t flex items-center justify-between">
                    <Link to={`/workshops/${workshop._id}`}>
                      <motion.button
                        className="mt-2 border border-[#AA1313] text-[#AA1313] py-2 px-6 rounded-lg relative overflow-hidden group cursor-pointer"
                        whileHover="hover"
                      >
                        <motion.span
                          className="absolute bottom-0 left-0 w-full bg-[#AA1313] h-0 z-0"
                          variants={{
                            hover: {
                              height: "100%",
                              transition: { duration: 0.4, ease: "easeInOut" }
                            }
                          }}
                        />
                        <span className="relative z-10 group-hover:text-white transition-colors duration-400">
                          المزيد
                        </span>
                      </motion.button>
                    </Link>

                    <div className="text-right mt-2 pr-3 border-r border-gray-300">
                      <p className="text-[11px] text-gray-500">الفئة العمرية</p>
                      <p className="text-sm font-semibold text-[#2B2B2B]">{workshop.ageRange}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShop;