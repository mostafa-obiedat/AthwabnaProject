import { API_URL } from "../config";
// import React, { useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const WorkshopRegistrationForm = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
//   const [showPayment, setShowPayment] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const workshop = location.state?.workshop;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleShowPayment = (e) => {
//     e.preventDefault();
//     setShowPayment(true);
//   };

//   const handleRegistration = async () => {
//     try {
//       await axios.post(`${API_URL}/api/workshops/${id}/register`, formData);
//       setSuccess(true);
//       // لا تفرغ النموذج مباشرة حتى تظهر المعلومات برسالة النجاح
//       // setFormData({ name: '', email: '', phone: '' });
//     } catch (err) {
//       setError(' أنت مسجل مسبقًا في هذه الورشة.');
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-12 px-4">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">نموذج التسجيل في الورشة</h2>

//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-right">
//           <p>✅ تم الدفع والتسجيل بنجاح!</p>
//           <p>👤 الاسم: {formData.name}</p>
//           <p>📧 البريد الإلكتروني: {formData.email}</p>
//           <p>📞 الهاتف: {formData.phone}</p>
//           <p>📍 الورشة: {workshop?.title}</p>
//           <p>💰 المبلغ المدفوع: {workshop?.price} د.أ</p>
//         </div>
//       )}

//       {error && (
//         <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//           <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
//           </svg>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}


//       <form onSubmit={handleShowPayment} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="الاسم الكامل"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="البريد الإلكتروني"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded"
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="رقم الهاتف"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded"
//         />
//         {!showPayment && !success && (
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             تسجيل ودفع
//           </button>
//         )}
//       </form>

//       {showPayment && !success && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">
//             اختر طريقة الدفع (المبلغ: {workshop?.price} د.أ):
//           </h3>
//           <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
//             <PayPalButtons
//               createOrder={() => {
//                 return fetch(`${API_URL}/api/payments/create-paypal-order`, {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({ price: workshop?.price }),
//                 })
//                   .then((res) => res.json())
//                   .then((data) => data.orderID);
//               }}
//               onApprove={(data, actions) => {
//                 return actions.order.capture().then(() => {
//                   handleRegistration(); // تسجيل المستخدم بعد الدفع الناجح
//                 });
//               }}
//             />
//           </PayPalScriptProvider>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkshopRegistrationForm;


import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiMapPin, FiDollarSign } from 'react-icons/fi';

const WorkshopRegistrationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    notes: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const workshop = location.state?.workshop;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('الاسم الكامل مطلوب');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('البريد الإلكتروني غير صالح');
      return false;
    }
    if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      setError('رقم الهاتف يجب أن يكون بين 10-15 رقمًا');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/api/workshops/${id}/register`, {
        ...formData,
        workshopId: id,
        workshopTitle: workshop?.title,
        amountPaid: workshop?.price
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقًا');
      setShowPayment(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#AA1313] mb-2">تسجيل في ورشة العمل</h2>
          <p className="text-lg text-gray-600">املأ النموذج لإكمال عملية التسجيل</p>
        </div>

        {/* بطاقة معلومات الورشة */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h3 className="text-xl font-bold text-[#2B2B2B] mb-4 border-b-2 border-[#AA1313] pb-2 inline-block">
            {workshop?.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <FiCalendar className="text-[#AA1313] ml-2" />
              <span className="text-gray-700">{workshop?.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="text-[#AA1313] ml-2" />
              <span className="text-gray-700">{workshop?.time}</span>
            </div>
            <div className="flex items-center">
              <FiMapPin className="text-[#AA1313] ml-2" />
              <span className="text-gray-700">{workshop?.location}</span>
            </div>
            <div className="flex items-center">
              <FiDollarSign className="text-[#AA1313] ml-2" />
              <span className="text-gray-700 font-bold">
                {workshop?.price === 0 ? 'مجاناً' : `${workshop?.price} دينار`}
              </span>
            </div>
          </div>
        </div>

        {/* رسائل التنبيه */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-2">تم التسجيل بنجاح!</h3>
                <div className="space-y-2 text-green-700">
                  <p><span className="font-semibold">الاسم:</span> {formData.name}</p>
                  <p><span className="font-semibold">البريد الإلكتروني:</span> {formData.email}</p>
                  <p><span className="font-semibold">رقم الهاتف:</span> {formData.phone}</p>
                  <p><span className="font-semibold">الورشة:</span> {workshop?.title}</p>
                  {workshop?.price > 0 && <p><span className="font-semibold">المبلغ المدفوع:</span> {workshop?.price} دينار</p>}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-[#AA1313] text-white px-6 py-2 rounded-lg hover:bg-[#8a0f0f] transition"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 flex items-start">
            <div className="bg-red-100 p-2 rounded-full mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800">حدث خطأ</h3>
              <p className="text-red-700">{error}</p>
              {error.includes('مسجل مسبقًا') && (
                <button
                  onClick={() => navigate('/profile')}
                  className="mt-3 text-[#AA1313] hover:underline"
                >
                  عرض سجل الورشات المسجل بها
                </button>
              )}
            </div>
          </div>
        )}

        {!success && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#2B2B2B] mb-6">معلومات المشارك</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FiUser />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AA1313] focus:border-[#AA1313]"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FiMail />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AA1313] focus:border-[#AA1313]"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FiPhone />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="رقم الهاتف (10-15 رقم)"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AA1313] focus:border-[#AA1313]"
                  />
                </div>

                <div>
                  <textarea
                    name="notes"
                    placeholder="ملاحظات إضافية (اختياري)"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AA1313] focus:border-[#AA1313]"
                  ></textarea>
                </div>

                {!showPayment && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#AA1313] hover:bg-[#8a0f0f] text-white py-3 px-6 rounded-lg font-medium transition duration-300 flex justify-center items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري التحميل...
                      </>
                    ) : (
                      'المتابعة للدفع'
                    )}
                  </button>
                )}
              </form>

              {showPayment && workshop?.price > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-[#2B2B2B] mb-4">طريقة الدفع</h3>
                  <p className="text-gray-600 mb-6">المبلغ المطلوب: <span className="font-bold text-[#AA1313]">{workshop?.price} دينار</span></p>
                  
                  <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={() => {
                          return fetch(`${API_URL}/api/payments/create-paypal-order`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ price: workshop?.price }),
                          })
                            .then((res) => res.json())
                            .then((data) => data.orderID);
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then(() => {
                            handleRegistration();
                          });
                        }}
                        onError={(err) => {
                          setError('حدث خطأ أثناء عملية الدفع');
                          setShowPayment(false);
                        }}
                      />
                    </div>
                  </PayPalScriptProvider>

                  <button
                    onClick={() => setShowPayment(false)}
                    className="mt-4 text-[#AA1313] hover:underline"
                  >
                    العودة لتعديل المعلومات
                  </button>
                </div>
              )}

              {showPayment && workshop?.price === 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-[#2B2B2B] mb-4">تأكيد التسجيل</h3>
                  <p className="text-gray-600 mb-6">هذه الورشة مجانية، انقر على الزر أدناه لتأكيد التسجيل.</p>
                  
                  <button
                    onClick={handleRegistration}
                    disabled={isLoading}
                    className="w-full bg-[#AA1313] hover:bg-[#8a0f0f] text-white py-3 px-6 rounded-lg font-medium transition duration-300 flex justify-center items-center"
                  >
                    {isLoading ? 'جاري التسجيل...' : 'تأكيد التسجيل'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopRegistrationForm;