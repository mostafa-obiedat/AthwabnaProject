import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 

const WorkshopDetails = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0); // جديد

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/workshops/${id}`);
        console.log("Workshop response:", response.data);
        setWorkshop(response.data.data);
        setAverageRating(response.data.data.averageRating || 0); // أخذ المتوسط من الباك
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
      alert("تم إرسال تقييمك بنجاح!");
      setAverageRating(res.data.averageRating); // تحديث المتوسط مباشرة بعد التقييم
    } catch (error) {
      alert("حدث خطأ أثناء إرسال التقييم");
    }
  };

  if (loading) return <div className="text-center py-5">جاري التحميل...</div>;
  if (error) return <div className="text-center py-5 text-red-500">حدث خطأ: {error}</div>;

  return (
    <>
      {/* Header */}
      <header className="bg-blue-600 py-10 text-center text-white">
        <h1 className="text-4xl font-bold">{workshop?.title}</h1>
        <p className="mx-auto mt-3 max-w-3xl text-xl">
          {workshop?.description}
        </p>
      </header>

      {/* Workshop Details */}
      <div className="container mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-lg shadow-lg">
            <img
              src={`http://localhost:5000${workshop.image}`}
              className="h-auto w-full rounded-lg object-cover"
              alt={workshop?.title}
            />
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-bold">{workshop?.title}</h2>
            <p className="text-lg leading-relaxed text-gray-700">{workshop?.description}</p>

            <h4 className="mt-8 text-xl font-semibold text-gray-600">تفاصيل الورشة</h4>
            <ul className="mt-3 space-y-2">
              <li><span className="font-bold">التاريخ:</span> {workshop?.date}</li>
              <li><span className="font-bold">الوقت:</span> {workshop?.time}</li>
              <li><span className="font-bold">الموقع:</span> {workshop?.location}</li>
              <li><span className="font-bold">الفئة العمرية:</span> {workshop?.ageRange}</li>
              <li><span className="font-bold">السعر:</span> {workshop?.price} دينار</li>
            </ul>

            {/* تقييم الورشة */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">قيّم هذه الورشة</h3>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={star <= rating ? 'text-yellow-500 text-2xl' : 'text-gray-400 text-2xl'}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-700">متوسط التقييم: {averageRating} / 5</p>
            </div>

            <Link
              to={`/workshopForm/${workshop?._id}`}
              className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-blue-700"
              state={{ workshop }} 
            >
              التسجيل الآن
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkshopDetails;
