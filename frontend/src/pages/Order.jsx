import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaShippingFast, FaCreditCard } from 'react-icons/fa';

function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { order, address } = state || {};

  // تعريف افتراضي لمنتجات الطلب
  const safeOrder = {
    products: [],
    shippingMethod: '',
    paymentMethod: '',
    paymentStatus: '',
    _id: '',
    createdAt: new Date(),
    subtotal: 0,
    shippingFee: 0,
    discountAmount: 0,
    total: 0,
    couponUsed: null,
    ...order
  };

  const safeAddress = {
    city: '',
    address: '',
    ...address
  };

  if (!order) {
    return (
      <div className="bg-[#FFF7F2] min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">حدث خطأ!</h1>
          <p className="mb-4">لا يوجد بيانات طلب متاحة للعرض</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-[#CEBEB3] text-white px-6 py-2 rounded-lg"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  return (
    <div className="bg-[#FFF7F2] min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* بطاقة التأكيد الرئيسية */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* الهيدر */}
          <div className="bg-green-100 p-6 text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-800">تم تأكيد طلبك بنجاح!</h1>
            <p className="text-green-600 mt-2">سنقوم بإرسال تفاصيل الشحن إلى بريدك الإلكتروني</p>
          </div>

          {/* معلومات الطلب */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* معلومات الشحن */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                  <FaShippingFast className="mr-2 text-[#CEBEB3]" /> معلومات الشحن
                </h2>
                <p className="font-medium">{safeAddress.city}</p>
                <p className="text-gray-600">{safeAddress.address}</p>
                <p className="mt-2">
                  <span className="font-medium">طريقة الشحن:</span> {safeOrder.shippingMethod === 'aramex' ? 'أرامكس' : 'شركة محلية'}
                </p>
              </div>

              {/* معلومات الدفع */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-[#CEBEB3]" /> معلومات الدفع
                </h2>
                <p>
                  <span className="font-medium">طريقة الدفع:</span> {safeOrder.paymentMethod === 'credit_card' ? 'بطاقة ائتمان' : safeOrder.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">حالة الدفع:</span> {safeOrder.paymentStatus === 'paid' ? 'تم الدفع' : 'قيد المعالجة'}
                </p>
                {safeOrder.couponUsed && (
                  <p>
                    <span className="font-medium">كود الخصم:</span> {safeOrder.couponUsed}
                  </p>
                )}
              </div>
            </div>

            {/* تفاصيل الطلب */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <FaBox className="mr-2 text-[#CEBEB3]" /> تفاصيل الطلب
              </h2>
              
              <div className="mb-4">
                <p>
                  <span className="font-medium">رقم الطلب:</span> {safeOrder._id}
                </p>
                <p>
                  <span className="font-medium">تاريخ الطلب:</span> {formatDate(safeOrder.createdAt)}
                </p>
              </div>

              {safeOrder.products && safeOrder.products.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4 text-right">المنتج</th>
                          <th className="py-2 px-4">الكمية</th>
                          <th className="py-2 px-4">السعر</th>
                          <th className="py-2 px-4">المجموع</th>
                        </tr>
                      </thead>
                      <tbody>
                        {safeOrder.products.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4 text-right">
                              {item.product?.name || `المنتج ${index + 1}`}
                            </td>
                            <td className="py-3 px-4 text-center">{item.quantity || 1}</td>
                            <td className="py-3 px-4">{item.price || 0} د.أ</td>
                            <td className="py-3 px-4">
                              {((item.price || 0) * (item.quantity || 1)).toFixed(2)} د.أ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 text-left">
                    <div className="flex justify-between mb-2">
                      <span>المجموع الفرعي:</span>
                      <span>{safeOrder.subtotal} د.أ</span>
                    </div>
                    {safeOrder.discountAmount > 0 && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>الخصم:</span>
                        <span>-{safeOrder.discountAmount} د.أ</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span>رسوم الشحن:</span>
                      <span>{safeOrder.shippingFee} د.أ</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                      <span>المجموع الكلي:</span>
                      <span>{safeOrder.total} د.أ</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  لا توجد منتجات في هذا الطلب
                </div>
              )}
            </div>
          </div>
        </div>

        {/* أزرار التنقل */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="bg-[#CEBEB3] text-white px-6 py-3 rounded-lg hover:bg-[#b8a99e] transition"
          >
            عرض جميع الطلبات
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-white border border-[#CEBEB3] text-[#CEBEB3] px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            العودة للتسوق
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;