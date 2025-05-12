import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const WorkshopDetails = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/workshops/${id}`);
        setWorkshop(response.data.data);
        setAverageRating(Number(response.data.data.averageRating) || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id]);

  const handleRating = async (value) => {
    setRating(value);
    try {
      const res = await axios.post(`http://localhost:5000/api/workshops/${id}/rate`, { rating: value });
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 3000);
      setAverageRating(Number(res.data.averageRating) || 0);
    } catch (error) {
      alert("حدث خطأ أثناء إرسال التقييم");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#AA1313] border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">جاري تحميل تفاصيل الورشة...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-[#AA1313]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-900">حدث خطأ أثناء تحميل الورشة</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <Link to="/" className="mt-6 inline-block rounded bg-[#AA1313] px-4 py-2 text-white transition hover:bg-[#8a0f0f]">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* هيدر الصفحة */}
      <header 
        className="relative flex items-center justify-center py-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(http://localhost:5000${workshop?.image})`
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 arabic-font">{workshop?.title}</h1>
          
          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`text-2xl mx-1 ${star <= Math.round(averageRating) ? 'text-[#FFD700]' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="mr-2 text-white font-medium text-lg">({averageRating.toFixed(1)})</span>
          </div>
          
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-200 leading-relaxed arabic-font">
            {workshop?.shortDescription}
          </p>
        </div>
      </header>

      {/* محتوى الصفحة */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* العمود الأيمن - محتوى الورشة */}
          <div className="lg:col-span-2 space-y-8">
            {/* قسم عن الورشة */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#2B2B2B] border-b-2 border-[#AA1313] pb-3 arabic-font">عن الورشة</h2>
              <p className="text-gray-700 leading-relaxed text-lg arabic-font">
                {workshop?.description}
              </p>
            </div>

            {/* ماذا ستتعلم */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#2B2B2B] border-b-2 border-[#AA1313] pb-3 arabic-font">ماذا ستتعلم؟</h2>
              <ul className="space-y-4">
                {workshop?.content?.split('\n').filter(Boolean).map((item, index) => (
                  <li key={index} className="flex items-start arabic-font">
                    <span className="bg-[#AA1313] text-white p-1 rounded-full mr-3 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* تقييم الورشة */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#2B2B2B] border-b-2 border-[#AA1313] pb-3 arabic-font">قيم الورشة</h2>
              <div className="flex flex-col items-center">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`text-4xl mx-1 transition-colors ${star <= rating ? 'text-[#AA1313]' : 'text-gray-300 hover:text-[#AA1313]'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-gray-700 arabic-font">
                  متوسط التقييم: <span className="font-bold text-[#AA1313]">{averageRating.toFixed(1)}</span> من 5 
                  ({workshop?.ratingsCount || 0} تقييمات)
                </p>
              </div>
            </div>
          </div>

          {/* العمود الأيسر - معلومات الحجز */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 border border-gray-200">
              <div className="mb-6">
                <img
                  src={`http://localhost:5000${workshop?.image}`}
                  className="w-full h-48 object-cover rounded-lg"
                  alt={workshop?.title}
                />
              </div>

              <div className="mb-6 text-center">
                <span className="text-3xl font-bold text-[#AA1313] arabic-font">
                  {workshop?.price === 0 ? 'مجاناً' : `${workshop?.price} دينار`}
                </span>
                {workshop?.price > 0 && (
                  <span className="text-gray-500 text-sm block mt-1 arabic-font">شامل الضريبة</span>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center arabic-font">
                  <div className="bg-[#AA1313] bg-opacity-10 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#AA1313]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">التاريخ</p>
                    <p className="text-gray-800 font-medium">{workshop?.date}</p>
                  </div>
                </div>

                <div className="flex items-center arabic-font">
                  <div className="bg-[#AA1313] bg-opacity-10 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#AA1313]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">الوقت</p>
                    <p className="text-gray-800 font-medium">{workshop?.time}</p>
                  </div>
                </div>

                <div className="flex items-center arabic-font">
                  <div className="bg-[#AA1313] bg-opacity-10 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#AA1313]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">المكان</p>
                    <p className="text-gray-800 font-medium">{workshop?.location}</p>
                  </div>
                </div>

                <div className="flex items-center arabic-font">
                  <div className="bg-[#AA1313] bg-opacity-10 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#AA1313]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">الفئة العمرية</p>
                    <p className="text-gray-800 font-medium">{workshop?.ageRange}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/workshopForm/${workshop?._id}`}
                state={{ workshop }}
                className="block w-full rounded-lg bg-[#AA1313] hover:bg-[#8a0f0f] py-3 text-center text-lg font-medium text-white transition duration-300 arabic-font"
              >
                سجل الآن
              </Link>

              <p className="text-center text-sm text-[#AA1313] mt-3 arabic-font">
                {workshop?.availableSeats || 10} مقاعد متبقية فقط
              </p>

              {workshop?.trainer && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-[#2B2B2B] mb-4 arabic-font">عن المدرب</h4>
                  <div className="flex items-center">
                    <img 
                      src={workshop.trainerImage || "https://randomuser.me/api/portraits/men/32.jpg"} 
                      alt={workshop.trainer} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#AA1313] mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-800 arabic-font">{workshop.trainer}</p>
                      <p className="text-sm text-gray-600 arabic-font">{workshop.trainerTitle || "مدرب معتمد"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* رسالة نجاح التقييم */}
      {isModalOpen && (
        <div className="fixed bottom-6 left-6 bg-white p-4 rounded-lg shadow-xl border-l-4 border-[#AA1313] flex items-center">
          <svg className="h-6 w-6 text-[#AA1313] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-gray-800 arabic-font">شكراً لك! تم تسجيل تقييمك بنجاح.</p>
        </div>
      )}
    </div>
  );
};

export default WorkshopDetails;