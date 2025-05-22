// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchOrders = async (currentPage) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/orders?page=${currentPage}&limit=5`, {
//         withCredentials: true,
//       });
//       setOrders(response.data.data);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('فشل في جلب الطلبات', error);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(page);
//   }, [page]);

//   const handleNext = () => {
//     if (page < totalPages) setPage(page + 1);
//   };

//   const handlePrev = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   // دالة لعرض حالة الطلب بألوان مختلفة
//   const getStatusBadge = (status) => {
//     let bgColor = "";
//     let textColor = "text-white";

//     switch (status) {
//       case "تم التسليم":
//         bgColor = "bg-green-600";
//         break;
//       case "قيد التحضير":
//         bgColor = "bg-yellow-500";
//         break;
//       case "قيد الشحن":
//         bgColor = "bg-blue-600";
//         break;
//       case "تم الإلغاء":
//         bgColor = "bg-gray-500";
//         break;
//       default:
//         bgColor = "bg-[#AA1313]";
//     }

//     return (
//       <span className={`${bgColor} ${textColor} text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full`}>
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="p-2 sm:p-4 md:p-6 min-h-screen bg-[#FFF7F2] text-[#2B2B2B]">
//       <div className="max-w-6xl mx-auto px-1 sm:px-2">
//         <div className="flex items-center mb-4 sm:mb-6">
//           <div className="w-1 h-6 sm:h-8 bg-[#AA1313] ml-2 sm:ml-3"></div>
//           <h2 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] pb-1 sm:pb-2 w-full border-b border-gray-200">🛒 إدارة الطلبات</h2>
//         </div>
//         {orders.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 text-center">
//             <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📦</div>
//             <p className="text-lg sm:text-xl text-gray-600">لا يوجد طلبات حالياً</p>
//           </div>
//         ) : (
//           <>
//             <div className="space-y-4 sm:space-y-6">
//               {orders.map((order) => (
//                 <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//                   <div className="bg-[#2B2B2B] text-white p-3 sm:p-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
//                     <div className="order-2 sm:order-1">
//                       {getStatusBadge(order.orderStatus)}
//                     </div>
//                     <h3 className="text-base sm:text-lg font-bold order-1 sm:order-2 w-full sm:w-auto text-center sm:text-right">
//                       طلب {order._id.substring(order._id.length - 6)}#
//                     </h3>
//                     <p className="text-xs sm:text-sm text-gray-300 order-3 w-full sm:w-auto text-center sm:text-left">
//                       {new Date(order.createdAt).toLocaleString('ar-JO')}
//                     </p>
//                   </div>

//                   <div className="p-3 sm:p-4">
//                     <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
//                       {/* معلومات المبلغ */}
//                       <div className="w-full sm:w-1/3 bg-[#FFF7F2] p-3 sm:p-4 rounded-lg">
//                         <h4 className="font-bold mb-2 sm:mb-3 border-r-2 border-[#AA1313] pr-2 text-base sm:text-lg">💰 المبلغ</h4>
//                         <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
//                           <div className="flex justify-between">
//                             <span>المجموع الفرعي</span>
//                             <span className="font-bold">{order.subtotal} د.أ</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span>رسوم التوصيل</span>
//                             <span className="font-bold">{order.shippingFee} د.أ</span>
//                           </div>
//                           {order.discountAmount > 0 && (
//                             <div className="flex justify-between text-[#AA1313]">
//                               <span>خصم</span>
//                               <span className="font-bold">-{order.discountAmount} د.أ</span>
//                             </div>
//                           )}
//                           <div className="border-t pt-2 mt-1 sm:mt-2">
//                             <div className="flex justify-between font-bold text-base sm:text-lg">
//                               <span>الإجمالي</span>
//                               <span>{order.total} د.أ</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* معلومات الدفع */}
//                       <div className="w-full sm:w-1/3 bg-[#FFF7F2] p-3 sm:p-4 rounded-lg">
//                         <h4 className="font-bold mb-2 sm:mb-3 border-r-2 border-[#AA1313] pr-2 text-base sm:text-lg">💳 الدفع</h4>
//                         <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
//                           <div className="flex justify-between items-center">
//                             <span>حالة الدفع</span>
//                             <span className={`text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full ${order.paymentStatus === "تم الدفع"
//                               ? "bg-green-600 text-white"
//                               : "bg-yellow-500 text-white"
//                               }`}>
//                               {order.paymentStatus}
//                             </span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span>طريقة الدفع</span>
//                             <span className="font-medium">{order.paymentMethod}</span>
//                           </div>
//                           {order.couponUsed && (
//                             <div className="flex justify-between">
//                               <span className="font-medium">{order.couponUsed}</span>
//                               <span>كوبون الخصم</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* معلومات الشحن */}
//                       <div className="w-full sm:w-1/3 bg-[#FFF7F2] p-3 sm:p-4 rounded-lg">
//                         <h4 className="font-bold mb-2 sm:mb-3 border-r-2 border-[#AA1313] pr-2 text-base sm:text-lg">🚚 الشحن</h4>
//                         <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
//                           <div className="flex justify-between">
//                             <span>شركة الشحن</span>
//                             <span className="font-medium">{order.shippingMethod}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span>المدينة</span>
//                             <span className="font-medium">{order.shippingAddress.city}</span>
//                           </div>
//                           <div className="flex justify-between flex-wrap">
//                             <span className="mb-1">العنوان</span>
//                             <span className="text-left w-full sm:w-auto">
//                               {order.shippingAddress.address}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* أزرار الباجينيشن */}
//             {totalPages > 1 && (
//               <div className="flex justify-center mt-6 sm:mt-8">
//                 <div className="bg-white rounded-lg shadow-md inline-flex p-1">
//                   <button
//                     onClick={handlePrev}
//                     disabled={page === 1}
//                     className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 text-sm sm:text-base ${page === 1
//                       ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
//                       } transition-colors duration-300`}
//                   >
//                     <span>السابق</span>
//                   </button>
//                   <span className="px-3 sm:px-5 py-1 sm:py-2 flex items-center text-sm sm:text-base">
//                     <span className="text-[#AA1313] font-bold">{page}</span>
//                     <span className="mx-1">من</span>
//                     <span className="text-[#2B2B2B]">{totalPages}</span>
//                   </span>
//                   <button
//                     onClick={handleNext}
//                     disabled={page === totalPages}
//                     className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 text-sm sm:text-base ${page === totalPages
//                       ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       : 'bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer'
//                       } transition-colors duration-300`}
//                   >
//                     <span>التالي</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Orders;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (currentPage) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/orders?page=${currentPage}&limit=5`, {
        withCredentials: true,
      });
      setOrders(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('فشل في جلب الطلبات', error);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  // دالة لعرض حالة الطلب بألوان مختلفة
  const getStatusBadge = (status) => {
    let bgColor = "";
    let textColor = "text-white";

    switch (status) {
      case "تم التسليم":
        bgColor = "bg-green-600";
        break;
      case "قيد التحضير":
        bgColor = "bg-yellow-500";
        break;
      case "قيد الشحن":
        bgColor = "bg-blue-600";
        break;
      case "تم الإلغاء":
        bgColor = "bg-gray-500";
        break;
      default:
        bgColor = "bg-[#AA1313]";
    }

    return (
      <span className={`${bgColor} ${textColor} text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 min-h-screen bg-[#FFF7F2] text-[#2B2B2B]">
      <div className="max-w-6xl mx-auto px-1 sm:px-2">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-1 h-6 sm:h-8 bg-[#AA1313] ml-2 sm:ml-3"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] pb-1 sm:pb-2 w-full border-b border-gray-200">🛒 إدارة الطلبات</h2>
        </div>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📦</div>
            <p className="text-lg sm:text-xl text-gray-600">لا يوجد طلبات حالياً</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 sm:space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="bg-[#2B2B2B] text-white p-3 sm:p-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
                    <div className="order-2 sm:order-1">
                      {getStatusBadge(order.orderStatus)}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold order-1 sm:order-2 w-full sm:w-auto text-center sm:text-right">
                      طلب {order._id.substring(order._id.length - 6)}#
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 order-3 w-full sm:w-auto text-center sm:text-left">
                      {new Date(order.createdAt).toLocaleString('ar-JO')}
                    </p>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                      {/* معلومات المبلغ */}
                      <div className="w-full sm:w-1/3 bg-[#FFF7F2] p-3 sm:p-4 rounded-lg">
                        <h4 className="font-bold mb-2 sm:mb-3 border-r-2 border-[#AA1313] pr-2 text-base sm:text-lg">💰 المبلغ</h4>
                        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                          <div className="flex justify-between">
                            <span>المجموع الفرعي</span>
                            <span className="font-bold">{order.subtotal} د.أ</span>
                          </div>
                          <div className="flex justify-between">
                            <span>رسوم التوصيل</span>
                            <span className="font-bold">{order.shippingFee} د.أ</span>
                          </div>
                          {order.discountAmount > 0 && (
                            <div className="flex justify-between text-[#AA1313]">
                              <span>خصم</span>
                              <span className="font-bold">-{order.discountAmount} د.أ</span>
                            </div>
                          )}
                          <div className="border-t pt-2 mt-1 sm:mt-2">
                            <div className="flex justify-between font-bold text-base sm:text-lg">
                              <span>الإجمالي</span>
                              <span>{order.total} د.أ</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* معلومات الدفع */}
                      <div className="w-full sm:w-1/3 bg-[#FFF7F2] p-3 sm:p-4 rounded-lg">
                        <h4 className="font-bold mb-2 sm:mb-3 border-r-2 border-[#AA1313] pr-2 text-base sm:text-lg">💳 الدفع</h4>
                        <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                          <div className="flex justify-between items-center">
                            <span>حالة الدفع</span>
                            <span className={`text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full ${order.paymentStatus === "تم الدفع"
                              ? "bg-green-600 text-white"
                              : "bg-yellow-500 text-white"
                              }`}>
                              {order.paymentStatus}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>طريقة الدفع</span>
                            <span className="font-medium">{order.paymentMethod}</span>
                          </div>
                          {order.couponUsed && (
                            <div className="flex justify-between">
                              <span className="font-medium">{order.couponUsed}</span>
                              <span>كوبون الخصم</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* معلومات الشحن */}
                      <div className="w-full sm:w-1/3 bg-[#FFF7F2] p-3 sm:p-4 rounded-lg">
                        <h4 className="font-bold mb-2 sm:mb-3 border-r-2 border-[#AA1313] pr-2 text-base sm:text-lg">🚚 الشحن</h4>
                        <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                          <div className="flex justify-between">
                            <span>شركة الشحن</span>
                            <span className="font-medium">{order.shippingMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>المدينة</span>
                            <span className="font-medium">{order.shippingAddress.city}</span>
                          </div>
                          <div className="flex justify-between flex-wrap">
                            <span className="mb-1">العنوان</span>
                            <span className="text-left w-full sm:w-auto">
                              {order.shippingAddress.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* أزرار الباجينيشن */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 sm:mt-8">
                <div className="bg-white rounded-lg shadow-md inline-flex p-1">
                  <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 text-sm sm:text-base ${page === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
                      } transition-colors duration-300`}
                  >
                    <span>السابق</span>
                  </button>
                  <span className="px-3 sm:px-5 py-1 sm:py-2 flex items-center text-sm sm:text-base">
                    <span className="text-[#AA1313] font-bold">{page}</span>
                    <span className="mx-1">من</span>
                    <span className="text-[#2B2B2B]">{totalPages}</span>
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 text-sm sm:text-base ${page === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer'
                      } transition-colors duration-300`}
                  >
                    <span>التالي</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;