import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // استخراج بيانات الطلب من state الملاحة
  const orderId = location.state?.orderId;
  const total = location.state?.total;

  useEffect(() => {
    // التحقق من وجود معرف الطلب، إذا لم يكن موجوداً نرجع للصفحة الرئيسية
    if (!orderId) {
      navigate('/');
      return;
    }

    // جلب تفاصيل الطلب من الخادم
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, { withCredentials: true });
        setOrderDetails(response.data.order);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('فشل في جلب تفاصيل الطلب');
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  // تنسيق التاريخ والوقت
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-JO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // حساب الموعد المتوقع للتسليم (إضافة أيام حسب شركة الشحن)
  const calculateEstimatedDelivery = () => {
    if (!orderDetails) return '';
    
    const creationDate = new Date(orderDetails.createdAt);
    const deliveryDays = orderDetails.shippingMethod === 'aramex' ? 2 : 5;
    
    const deliveryDate = new Date(creationDate);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    
    return deliveryDate.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-700 border-t-transparent mb-4"></div>
          <p className="text-[#2B2B2B] font-medium">جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <div className="text-red-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#2B2B2B] mb-4">حدث خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="bg-[#2B2B2B] hover:bg-[#222222] text-white font-medium py-2 px-6 rounded-lg transition duration-300">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* رسالة النجاح */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 mb-8">
          <div className="bg-green-50 p-6 border-b border-green-100">
            <div className="flex items-center justify-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#2B2B2B]">تم استلام طلبك بنجاح!</h1>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-2">
                شكراً لتسوقك معنا، {orderDetails?.user?.name || 'عميلنا العزيز'}
              </p>
              <p className="text-gray-600">
                لقد أرسلنا إليك بريداً إلكترونياً يحتوي على تفاصيل طلبك وتأكيد الدفع
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-red-700">معلومات الطلب</h2>
                <span className="bg-red-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  طلب رقم #{orderId.slice(-6)}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-[#2B2B2B] mb-2">تاريخ الطلب</h3>
                  <p className="text-gray-600">{formatDate(orderDetails?.createdAt)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#2B2B2B] mb-2">الموعد المتوقع للتسليم</h3>
                  <p className="text-gray-600">{calculateEstimatedDelivery()}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#2B2B2B] mb-2">طريقة الدفع</h3>
                  <p className="text-gray-600">
                    <span className="inline-flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V5H7c-3.87 0-7 3.13-7 7s3.13 7 7 7h4v-3.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v3.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c3.87 0 7-3.13 7-7s-3.13-7-7-7z" />
                      </svg>
                      PayPal
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-[#2B2B2B] mb-2">حالة الطلب</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    قيد التجهيز
                  </span>
                </div>
              </div>
            </div>
            
            {/* تفاصيل الشحن */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#2B2B2B] mb-4">معلومات الشحن</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-[#2B2B2B] mb-1">عنوان التوصيل</h3>
                    <p className="text-gray-600">
                      {orderDetails?.shippingAddress?.city} - {orderDetails?.shippingAddress?.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-[#2B2B2B] mb-1">شركة الشحن</h3>
                    <p className="text-gray-600">
                      {orderDetails?.shippingMethod === 'aramex' ? 'أرامكس - توصيل خلال يومين' : 'شركة محلية - توصيل خلال 3-5 أيام'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ملخص الطلب */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#2B2B2B] mb-4">ملخص الطلب</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-right text-[#2B2B2B] font-medium">المنتج</th>
                      <th className="py-3 px-4 text-right text-[#2B2B2B] font-medium">الكمية</th>
                      <th className="py-3 px-4 text-right text-[#2B2B2B] font-medium">السعر</th>
                      <th className="py-3 px-4 text-right text-[#2B2B2B] font-medium">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails?.products?.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                              <img 
                                src={item.product?.image || "https://via.placeholder.com/100"} 
                                alt={item.product?.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium text-[#2B2B2B]">{item.product?.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{item.quantity}</td>
                        <td className="py-4 px-4 text-gray-600">{item.product?.price} د.أ</td>
                        <td className="py-4 px-4 font-medium text-[#2B2B2B]">{item.product?.price * item.quantity} د.أ</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr className="border-t">
                      <td colSpan="3" className="py-3 px-4 text-left font-medium">المجموع</td>
                      <td className="py-3 px-4 font-medium">{orderDetails?.totalAmount - orderDetails?.shippingFee} د.أ</td>
                    </tr>
                    {orderDetails?.couponDiscount > 0 && (
                      <tr className="border-t">
                        <td colSpan="3" className="py-3 px-4 text-left font-medium text-green-600">خصم الكوبون</td>
                        <td className="py-3 px-4 font-medium text-green-600">-{orderDetails?.couponDiscount} د.أ</td>
                      </tr>
                    )}
                    <tr className="border-t">
                      <td colSpan="3" className="py-3 px-4 text-left font-medium">تكلفة الشحن</td>
                      <td className="py-3 px-4 font-medium">{orderDetails?.shippingFee} د.أ</td>
                    </tr>
                    <tr className="border-t">
                      <td colSpan="3" className="py-3 px-4 text-left font-bold text-lg">الإجمالي النهائي</td>
                      <td className="py-3 px-4 font-bold text-lg text-red-700">{orderDetails?.totalAmount} د.أ</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            {/* متابعة التسوق */}
            <div className="flex justify-center gap-4 mt-8">
              <Link 
                to="/orders" 
                className="bg-[#2B2B2B] hover:bg-[#222222] text-white px-6 py-3 rounded-lg transition duration-300"
              >
                تتبع طلبي
              </Link>
              <Link 
                to="/" 
                className="bg-white border border-red-700 text-red-700 hover:bg-red-50 px-6 py-3 rounded-lg transition duration-300"
              >
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;