// // src/App.jsx
// import React from 'react';

// function Checkout() {
//   return (
//     <div className="bg-[#FFF7F2] min-h-screen">

//       {/* Checkout Container */}
//       <div className="container mx-auto p-4">
//         {/* Order Summary */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <div className="flex items-center mb-4">
//             <img src="https://via.placeholder.com/50" alt="User" className="rounded-full mr-4" />
//             <div>
//               <p className="font-bold">مرحبًا بك، مصطفى عبدات</p>
//               <p className="text-sm text-gray-600">أثوابنا / سلة التسوق / انهاء الطلب</p>
//             </div>
//           </div>
//           <hr className="my-4" />
//           <div className="flex justify-between items-center mb-4">
//             <h5 className="font-bold">إجمالي الطلب</h5>
//             <span className="text-2xl font-bold">50 د.أ</span>
//           </div>
//           <p className="text-red-500 text-sm mb-4">لديك كوبون تخفيض؟</p>
//           <div className="flex mb-4">
//             <input
//               type="text"
//               className="flex-1 p-2 border rounded-lg mr-2"
//               placeholder="ادخل رمز الكوبون"
//             />
//             <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg">تطبيق</button>
//           </div>
//           <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center">
//             <i className="bi bi-chevron-down ml-2"></i>
//             تفاصيل الفاتورة
//           </button>
//         </div>

//         {/* Address Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h5 className="font-bold mb-4">1. عنوان التوصيل</h5>
//           <form>
//             <div className="mb-4">
//               <label className="block mb-2">المدينة</label>
//               <select className="w-full p-2 border rounded-lg">
//                 <option>اختر المدينة</option>
//                 <option>عمان</option>
//                 <option>الزرقاء</option>
//                 <option>إربد</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">العنوان</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-lg"
//                 placeholder="أدخل العنوان بالتفصيل"
//               />
//             </div>
//             <div className="mb-4">
//               <input type="checkbox" id="saveAddress" className="mr-2" />
//               <label htmlFor="saveAddress">حفظ هذا العنوان للتوصيل في المستقبل</label>
//             </div>
//             <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full">تأكيد العنوان</button>
//           </form>
//         </div>

//         {/* Shipping Method Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h5 className="font-bold mb-4">2. شركة الشحن</h5>
//           <div className="mb-4">
//             <input type="radio" name="shipping" id="aramex" className="mr-2" defaultChecked />
//             <label htmlFor="aramex">أرامكس (5 دينار - تسليم خلال يومين)</label>
//           </div>
//           <div className="mb-4">
//             <input type="radio" name="shipping" id="local" className="mr-2" />
//             <label htmlFor="local">شركة محلية (3 دينار - تسليم خلال 3-5 أيام)</label>
//           </div>
//           <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full">تأكيد شركة الشحن</button>
//         </div>

//         {/* Payment Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h5 className="font-bold mb-4">3. طريقة الدفع</h5>
//           <div className="flex space-x-4 mb-4">
//             <img src="https://banner2.cleanpng.com/20180803/hyo/e12d16e2f210bc9e3e744318ad7ceea5.webp" alt="MasterCard" className="h-8" />
//             <img src="images/Visa.png" alt="Visa" className="h-8" />
//             <img src="images/mada.png" alt="Mada" className="h-8" />
//           </div>
//           <form>
//             <div className="mb-4">
//               <label className="block mb-2">رقم البطاقة</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-lg"
//                 placeholder="أدخل رقم البطاقة"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block mb-2">تاريخ الانتهاء</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="MM/YY"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2">رمز التحقق (CVC)</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="123"
//                 />
//               </div>
//             </div>
//             <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full">إكمال الدفع</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // دالة مساعدة لقراءة الكوكيز
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// function Checkout() {
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponError, setCouponError] = useState('');
//   const [address, setAddress] = useState({
//     city: '',
//     address: '',
//     isDefault: false
//   });
//   const [shippingMethod, setShippingMethod] = useState('aramex');
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvc: ''
//   });
//   const [orderTotal, setOrderTotal] = useState(50);
//   const [shippingFee, setShippingFee] = useState(5);
//   const [isLoading, setIsLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();
//   // تطبيق الكوبون
//   const handleApplyCoupon = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('/api/checkout/apply-coupon', { couponCode }, {
//         withCredentials: true // إرسال الكوكيز تلقائياً
//       });

//       setAppliedCoupon(response.data.coupon);
//       setCouponError('');

//       if (response.data.coupon.discountType === 'percentage') {
//         const discount = orderTotal * (response.data.coupon.discountValue / 100);
//         setOrderTotal(prev => prev - discount);
//       } else {
//         setOrderTotal(prev => prev - response.data.coupon.discountValue);
//       }
//     } catch (error) {
//       setCouponError(error.response?.data?.message || 'حدث خطأ أثناء تطبيق الكوبون');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // حفظ العنوان
//   const handleSaveAddress = async () => {
//     try {
//       setIsLoading(true);

//       const response = await axios.post(
//         'http://localhost:5000/api/checkout/save-address',
//         {
//           city: address.city,
//           address: address.address,
//           isDefault: address.isDefault
//         },
//         {
//           withCredentials: true, // هذا يضمن إرسال الكوكيز
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//         setStep(2);
//       } else {
//         throw new Error(response.data.message || 'Failed to save address');
//       }
//     } catch (error) {
//       console.error('Error saving address:', error);
//       alert(`حدث خطأ: ${error.response?.data?.message || 'الرجاء تسجيل الدخول أولاً'}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // تأكيد طريقة الشحن
//   const handleConfirmShipping = () => {
//     setShippingFee(shippingMethod === 'aramex' ? 5 : 3);
//     setStep(3);
//   };
//   // إتمام عملية الدفع
//   const handleCompletePayment = async () => {
//     try {
//       setIsLoading(true);

//       // جلب محتويات السلة من localStorage
//       const cart = JSON.parse(localStorage.getItem('cart')) || [];
//       if (cart.length === 0) {
//         throw new Error('السلة فارغة');
//       }

//       // تحضير بيانات المنتجات مع جميع التفاصيل المطلوبة
//       const products = cart.map(item => ({
//         product: {
//           _id: item.productId,
//           name: item.name,  // تأكد من وجود هذه البيانات في السلة
//           price: item.price
//         },
//         quantity: item.quantity,
//         price: item.price
//       }));

//       // 3. حفظ العنوان والحصول على ID
//       const addressResponse = await axios.post(
//         'http://localhost:5000/api/checkout/save-address',
//         address,
//         { withCredentials: true }
//       );

//       const shippingAddressId = addressResponse.data.address?._id;
//       if (!shippingAddressId) {
//         throw new Error('فشل في تحديد عنوان التوصيل');
//       }

//       // 4. إعداد بيانات الطلب
//       const orderData = {
//         products,
//         shippingMethod,
//         shippingAddressId,
//         paymentMethod: 'credit_card',
//         couponCode: appliedCoupon?.code
//       };

//       console.log('بيانات الطلب المرسلة:', orderData); // لأغراض debugging

//       // 5. إنشاء الطلب
//       const response = await axios.post(
//         'http://localhost:5000/api/checkout/create-order',
//         orderData,
//         { withCredentials: true }
//       );

//       // 6. بعد النجاح:
//       // - مسح السلة من localStorage
//       localStorage.removeItem('cart');

//       // - توجيه المستخدم لصفحة التأكيد
//       navigate('/order', { 
//         state: { 
//           order: response.data,
//           address: addressResponse.data.address
//         } 
//       });

//     } catch (error) {
//       console.error('Error completing payment:', error);
//       alert(error.message || 'حدث خطأ أثناء إتمام الطلب');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // باقي الكود يبقى كما هو...
//   return (
//     <div className="bg-[#FFF7F2] min-h-screen">
//       <div className="container mx-auto p-4">
//         {/* Order Summary */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <div className="flex items-center mb-4">
//             <img src="https://via.placeholder.com/50" alt="User" className="rounded-full mr-4" />
//             <div>
//               <p className="font-bold">مرحبًا بك، مصطفى عبدات</p>
//               <p className="text-sm text-gray-600">أثوابنا / سلة التسوق / انهاء الطلب</p>
//             </div>
//           </div>
//           <hr className="my-4" />
//           <div className="flex justify-between items-center mb-4">
//             <h5 className="font-bold">إجمالي الطلب</h5>
//             <span className="text-2xl font-bold">{orderTotal + shippingFee} د.أ</span>
//           </div>

//           {appliedCoupon ? (
//             <div className="mb-4 text-green-600">
//               تم تطبيق كوبون خصم: {appliedCoupon.code} (خصم {appliedCoupon.discountValue}
//               {appliedCoupon.discountType === 'percentage' ? '%' : 'د.أ'})
//             </div>
//           ) : (
//             <>
//               <p className="text-red-500 text-sm mb-4">لديك كوبون تخفيض؟</p>
//               <div className="flex mb-4">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 border rounded-lg mr-2"
//                   placeholder="ادخل رمز الكوبون"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                 />
//                 <button 
//                   className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg"
//                   onClick={handleApplyCoupon}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'جاري التطبيق...' : 'تطبيق'}
//                 </button>
//               </div>
//               {couponError && <p className="text-red-500 text-sm mb-4">{couponError}</p>}
//             </>
//           )}
//         </div>
//         {/* Address Section - Step 1 */}
//         {step === 1 && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h5 className="font-bold mb-4">1. عنوان التوصيل</h5>
//             <form>
//               <div className="mb-4">
//                 <label className="block mb-2">المدينة</label>
//                 <select 
//                   className="w-full p-2 border rounded-lg"
//                   value={address.city}
//                   onChange={(e) => setAddress({...address, city: e.target.value})}
//                 >
//                   <option value="">اختر المدينة</option>
//                   <option value="عمان">عمان</option>
//                   <option value="الزرقاء">الزرقاء</option>
//                   <option value="إربد">إربد</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">العنوان</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="أدخل العنوان بالتفصيل"
//                   value={address.address}
//                   onChange={(e) => setAddress({...address, address: e.target.value})}
//                 />
//               </div>
//               <div className="mb-4">
//                 <input 
//                   type="checkbox" 
//                   id="saveAddress" 
//                   className="mr-2"
//                   checked={address.isDefault}
//                   onChange={(e) => setAddress({...address, isDefault: e.target.checked})}
//                 />
//                 <label htmlFor="saveAddress">حفظ هذا العنوان للتوصيل في المستقبل</label>
//               </div>
//               <button 
//                 type="button"
//                 className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full"
//                 onClick={handleSaveAddress}
//                 disabled={!address.city || !address.address || isLoading}
//               >
//                 {isLoading ? 'جاري الحفظ...' : 'تأكيد العنوان'}
//               </button>
//             </form>
//           </div>
//         )}
//         {/* Shipping Method Section - Step 2 */}
//         {step === 2 && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h5 className="font-bold mb-4">2. شركة الشحن</h5>
//             <div className="mb-4">
//               <input 
//                 type="radio" 
//                 name="shipping" 
//                 id="aramex" 
//                 className="mr-2" 
//                 checked={shippingMethod === 'aramex'}
//                 onChange={() => setShippingMethod('aramex')}
//               />
//               <label htmlFor="aramex">أرامكس (5 دينار - تسليم خلال يومين)</label>
//             </div>
//             <div className="mb-4">
//               <input 
//                 type="radio" 
//                 name="shipping" 
//                 id="local" 
//                 className="mr-2"
//                 checked={shippingMethod === 'local'}
//                 onChange={() => setShippingMethod('local')}
//               />
//               <label htmlFor="local">شركة محلية (3 دينار - تسليم خلال 3-5 أيام)</label>
//             </div>
//             <button 
//               className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full"
//               onClick={handleConfirmShipping}
//             >
//               تأكيد شركة الشحن
//             </button>
//           </div>
//         )}
//         {/* Payment Section - Step 3 */}
//         {step === 3 && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h5 className="font-bold mb-4">3. طريقة الدفع</h5>
//             <div className="flex space-x-4 mb-4">
//               <img src="https://banner2.cleanpng.com/20180803/hyo/e12d16e2f210bc9e3e744318ad7ceea5.webp" alt="MasterCard" className="h-8" />
//               <img src="images/Visa.png" alt="Visa" className="h-8" />
//               <img src="images/mada.png" alt="Mada" className="h-8" />
//             </div>
//             <form>
//               <div className="mb-4">
//                 <label className="block mb-2">رقم البطاقة</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="أدخل رقم البطاقة"
//                   value={paymentInfo.cardNumber}
//                   onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block mb-2">تاريخ الانتهاء</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded-lg"
//                     placeholder="MM/YY"
//                     value={paymentInfo.expiryDate}
//                     onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2">رمز التحقق (CVC)</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded-lg"
//                     placeholder="123"
//                     value={paymentInfo.cvc}
//                     onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <button 
//                 type="button"
//                 className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full"
//                 onClick={handleCompletePayment}
//                 disabled={isLoading || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvc}
//               >
//                 {isLoading ? 'جاري المعالجة...' : 'إكمال الدفع'}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// function Checkout() {
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponError, setCouponError] = useState('');
//   const [address, setAddress] = useState({ city: '', address: '', isDefault: false });
//   const [shippingMethod, setShippingMethod] = useState('aramex');
//   const [orderTotal, setOrderTotal] = useState(50);
//   const [shippingFee, setShippingFee] = useState(5);
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvc: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();

//   const handleApplyCoupon = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('/api/checkout/apply-coupon', { couponCode }, { withCredentials: true });
//       setAppliedCoupon(response.data.coupon);
//       setCouponError('');

//       if (response.data.coupon.discountType === 'percentage') {
//         const discount = orderTotal * (response.data.coupon.discountValue / 100);
//         setOrderTotal(prev => prev - discount);
//       } else {
//         setOrderTotal(prev => prev - response.data.coupon.discountValue);
//       }
//     } catch (error) {
//       setCouponError(error.response?.data?.message || 'حدث خطأ أثناء تطبيق الكوبون');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSaveAddress = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('http://localhost:5000/api/checkout/save-address', address, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' }
//       });
//       if (response.data.success) setStep(2);
//       else throw new Error(response.data.message || 'Failed to save address');
//     } catch (error) {
//       console.error('Error saving address:', error);
//       alert(`حدث خطأ: ${error.response?.data?.message || 'الرجاء تسجيل الدخول أولاً'}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleConfirmShipping = () => {
//     setShippingFee(shippingMethod === 'aramex' ? 5 : 3);
//     setStep(3);
//   };

//   const handleCompletePayment = async () => {
//     try {
//       setIsLoading(true);
//       const cart = JSON.parse(localStorage.getItem('cart')) || [];
//       if (cart.length === 0) throw new Error('السلة فارغة');

//       const products = cart.map(item => ({
//         product: {
//           _id: item.productId,
//           name: item.name,
//           price: item.price
//         },
//         quantity: item.quantity,
//         price: item.price
//       }));

//       const addressResponse = await axios.post('http://localhost:5000/api/checkout/save-address', address, { withCredentials: true });
//       const shippingAddressId = addressResponse.data.address?._id;
//       if (!shippingAddressId) throw new Error('فشل في تحديد عنوان التوصيل');

//       const orderData = {
//         products,
//         shippingMethod,
//         shippingAddressId,
//         paymentMethod: 'paypal',
//         couponCode: appliedCoupon?.code,
//         totalAmount: orderTotal + shippingFee
//       };

//       const { data } = await axios.post('http://localhost:5000/api/paymentservices/create-payment', orderData, { withCredentials: true });
//       if (data?.url) {
//         window.location.href = data.url;
//       } else {
//         throw new Error('فشل في توجيه المستخدم إلى صفحة الدفع');
//       }
//     } catch (error) {
//       console.error('Error completing payment:', error);
//       alert(error.message || 'حدث خطأ أثناء إتمام الطلب');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen">
//       <div className="container mx-auto p-4">
//         {/* محتوى الصفحة كما هو */}{/* Order Summary */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//          <div className="flex items-center mb-4">
//            <img src="https://via.placeholder.com/50" alt="User" className="rounded-full mr-4" />
//            <div>
//              <p className="font-bold">مرحبًا بك، مصطفى عبدات</p>
//              <p className="text-sm text-gray-600">أثوابنا / سلة التسوق / انهاء الطلب</p>
//            </div>
//           </div>
//          <hr className="my-4" />
//          <div className="flex justify-between items-center mb-4">
//             <h5 className="font-bold">إجمالي الطلب</h5>
//             <span className="text-2xl font-bold">{orderTotal + shippingFee} د.أ</span>
//         </div>

//          {appliedCoupon ? (
//             <div className="mb-4 text-green-600">
//               تم تطبيق كوبون خصم: {appliedCoupon.code} (خصم {appliedCoupon.discountValue}
//               {appliedCoupon.discountType === 'percentage' ? '%' : 'د.أ'})
//             </div>
//           ) : (
//             <>
//               <p className="text-red-500 text-sm mb-4">لديك كوبون تخفيض؟</p>
//               <div className="flex mb-4">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 border rounded-lg mr-2"
//                   placeholder="ادخل رمز الكوبون"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                 />
//                 <button 
//                   className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg"
//                   onClick={handleApplyCoupon}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'جاري التطبيق...' : 'تطبيق'}
//                 </button>
//               </div>
//               {couponError && <p className="text-red-500 text-sm mb-4">{couponError}</p>}
//             </>
//           )}
//         </div>
//         {/* Address Section - Step 1 */}
//         {step === 1 && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h5 className="font-bold mb-4">1. عنوان التوصيل</h5>
//             <form>
//               <div className="mb-4">
//                 <label className="block mb-2">المدينة</label>
//                 <select 
//                   className="w-full p-2 border rounded-lg"
//                   value={address.city}
//                   onChange={(e) => setAddress({...address, city: e.target.value})}
//                 >
//                   <option value="">اختر المدينة</option>
//                   <option value="عمان">عمان</option>
//                   <option value="الزرقاء">الزرقاء</option>
//                   <option value="إربد">إربد</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">العنوان</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="أدخل العنوان بالتفصيل"
//                   value={address.address}
//                   onChange={(e) => setAddress({...address, address: e.target.value})}
//                 />
//               </div>
//               <div className="mb-4">
//                 <input 
//                   type="checkbox" 
//                   id="saveAddress" 
//                   className="mr-2"
//                   checked={address.isDefault}
//                   onChange={(e) => setAddress({...address, isDefault: e.target.checked})}
//                 />
//                 <label htmlFor="saveAddress">حفظ هذا العنوان للتوصيل في المستقبل</label>
//               </div>
//               <button 
//                 type="button"
//                 className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full"
//                 onClick={handleSaveAddress}
//                 disabled={!address.city || !address.address || isLoading}
//               >
//                 {isLoading ? 'جاري الحفظ...' : 'تأكيد العنوان'}
//               </button>
//             </form>
//           </div>
//         )}
//         {/* Shipping Method Section - Step 2 */}
//         {step === 2 && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h5 className="font-bold mb-4">2. شركة الشحن</h5>
//             <div className="mb-4">
//               <input 
//                 type="radio" 
//                 name="shipping" 
//                 id="aramex" 
//                 className="mr-2" 
//                 checked={shippingMethod === 'aramex'}
//                 onChange={() => setShippingMethod('aramex')}
//               />
//               <label htmlFor="aramex">أرامكس (5 دينار - تسليم خلال يومين)</label>
//             </div>
//             <div className="mb-4">
//               <input 
//                 type="radio" 
//                 name="shipping" 
//                 id="local" 
//                 className="mr-2"
//                 checked={shippingMethod === 'local'}
//                 onChange={() => setShippingMethod('local')}
//               />
//               <label htmlFor="local">شركة محلية (3 دينار - تسليم خلال 3-5 أيام)</label>
//             </div>
//             <button 
//               className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full"
//               onClick={handleConfirmShipping}
//             >
//               تأكيد شركة الشحن
//             </button>
//           </div>
//         )}
//         {/* Payment Section - Step 3 */}
//         {step === 3 && (
//   <div className="bg-white p-6 rounded-lg shadow-md">
//     <h5 className="font-bold mb-4">3. طريقة الدفع</h5>
//     <p className="mb-4">اختر الدفع عبر PayPal لإكمال عملية الشراء:</p>

//     <PayPalButtons
//       style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
//       createOrder={async (data, actions) => {
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         const products = cart.map(item => ({
//           product: {
//             _id: item.productId,
//             name: item.name,
//             price: item.price
//           },
//           quantity: item.quantity,
//           price: item.price
//         }));

//         const addressResponse = await axios.post('http://localhost:5000/api/checkout/save-address', address, { withCredentials: true });
//         const shippingAddressId = addressResponse.data.address?._id;

//         const orderData = {
//           products,
//           shippingMethod,
//           shippingAddressId,
//           paymentMethod: 'paypal',
//           couponCode: appliedCoupon?.code,
//           totalAmount: orderTotal + shippingFee
//         };

//         const response = await axios.post('http://localhost:5000/api/paymentservices/create-paypal-order', orderData, { withCredentials: true });

//         return response.data.orderID; // يجب أن يرجع orderID
//       }}
//       onApprove={async (data, actions) => {
//         const response = await axios.post('http://localhost:5000/api/paymentservices/capture-paypal-order', {
//           orderID: data.orderID,
//         }, { withCredentials: true });

//         if (response.data.success) {
//           alert("تم الدفع بنجاح!");
//           navigate("/thank-you");
//         } else {
//           alert("حدث خطأ أثناء تأكيد الدفع");
//         }
//       }}
//       onError={(err) => {
//         console.error("PayPal Checkout Error:", err);
//         alert("حدث خطأ أثناء الدفع");
//       }}
//     />
//   </div>
// )}


//           </div>
//         )}
//       </div>
//     </div>
//   );

// }

// export default Checkout;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// function Checkout() {
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponError, setCouponError] = useState('');
//   const [address, setAddress] = useState({ city: '', address: '', isDefault: false });
//   const [shippingMethod, setShippingMethod] = useState('aramex');
//   const [isLoading, setIsLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   // حساب الإجمالي
//   const calculateOrderTotal = () => {
//     return cart.reduce((total, item) => {
//       const priceAfterDiscount = item.discount
//         ? item.price - (item.price * item.discount) / 100
//         : item.price;

//       return total + priceAfterDiscount * item.quantity;
//     }, 0);
//   };
//   const calculateShippingFee = () => {
//     return shippingMethod === 'aramex' ? 5 : 3;
//   };

//   const orderTotal = calculateOrderTotal();
//   const shippingFee = calculateShippingFee();
//   let couponDiscount = 0;

//   if (appliedCoupon) {
//     if (appliedCoupon.discountType === 'percentage') {
//       couponDiscount = (orderTotal * appliedCoupon.discountValue) / 100;
//     } else if (appliedCoupon.discountType === 'fixed') {
//       couponDiscount = appliedCoupon.discountValue;
//     }

//     if (couponDiscount > orderTotal) {
//       couponDiscount = orderTotal;
//     }
//   }

//   const finalTotal = orderTotal - couponDiscount + shippingFee;

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCart(savedCart);
//   }, []);

//   const handleApplyCoupon = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('http://localhost:5000/api/checkout/apply-coupon', { couponCode }, { withCredentials: true });
//       setAppliedCoupon(response.data.coupon);
//       setCouponError('');
//     } catch (error) {
//       setCouponError(error.response?.data?.message || 'حدث خطأ أثناء تطبيق الكوبون');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSaveAddress = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('http://localhost:5000/api/checkout/save-address',
//         {
//           city: address.city,
//           address: address.address,
//           isDefault: address.isDefault
//         },
//         { withCredentials: true }
//       );

//       if (response.data.success) setStep(2);
//     } catch (error) {
//       console.error('Error saving address:', error);
//       alert(`حدث خطأ: ${error.response?.data?.message || 'فشل في حفظ العنوان'}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleConfirmShipping = () => {
//     setStep(3);
//   };

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen">
//       <div className="container mx-auto p-4">
//         {/* Order Summary */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <div className="flex items-center mb-4">
//             <img src="https://via.placeholder.com/50" alt="User" className="rounded-full mr-4" />
//             <div>
//               <p className="font-bold">مرحبًا بك، مصطفى عبدات</p>
//               <p className="text-sm text-gray-600">أثوابنا / سلة التسوق / انهاء الطلب</p>
//             </div>
//           </div>
//           <hr className="my-4" />
//           <div className="flex justify-between items-center mb-4">
//             <h5 className="font-bold">إجمالي الطلب</h5>
//             <span className="text-2xl font-bold">{finalTotal} د.أ</span>
//           </div>

//           <div className="space-y-2 text-right mb-4">
//             <div className="flex justify-between">
//               <span>سعر المنتجات:</span>
//               <span>{orderTotal} د.أ</span>
//             </div>
//             {appliedCoupon && (
//               <div className="flex justify-between text-green-600">
//                 <span>خصم الكوبون:</span>
//                 <span>-{couponDiscount.toFixed(2)} د.أ</span>
//               </div>
//             )}
//             <div className="flex justify-between">
//               <span>تكلفة الشحن:</span>
//               <span>{shippingFee} د.أ</span>
//             </div>
//           </div>

//           {!appliedCoupon && (
//             <>
//               <p className="text-red-500 text-sm mb-4">لديك كوبون تخفيض؟</p>
//               <div className="flex mb-4">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 border rounded-lg mr-2"
//                   placeholder="ادخل رمز الكوبون"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                 />
//                 <button
//                   className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg"
//                   onClick={handleApplyCoupon}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'جاري التطبيق...' : 'تطبيق'}
//                 </button>
//               </div>
//               {couponError && <p className="text-red-500 text-sm mb-4">{couponError}</p>}
//             </>
//           )}
//         </div>

//         {/* Step 1: Address */}
//         {step === 1 && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h5 className="font-bold mb-4">1. عنوان التوصيل</h5>
//             <form>
//               <div className="mb-4">
//                 <label className="block mb-2">المدينة</label>
//                 <select
//                   className="w-full p-2 border rounded-lg"
//                   value={address.city}
//                   onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                 >
//                   <option value="">اختر المدينة</option>
//                   <option value="عمان">عمان</option>
//                   <option value="الزرقاء">الزرقاء</option>
//                   <option value="إربد">إربد</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">العنوان</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="أدخل العنوان بالتفصيل"
//                   value={address.address}
//                   onChange={(e) => setAddress({ ...address, address: e.target.value })}
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="checkbox"
//                   id="saveAddress"
//                   className="mr-2"
//                   checked={address.isDefault}
//                   onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
//                 />
//                 <label htmlFor="saveAddress">حفظ هذا العنوان للتوصيل في المستقبل</label>
//               </div>
//               <button
//                 type="button"
//                 className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full"
//                 onClick={handleSaveAddress}
//                 disabled={!address.city || !address.address || isLoading}
//               >
//                 {isLoading ? 'جاري الحفظ...' : 'تأكيد العنوان'}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Step 2: Shipping Method */}
//         {step === 2 && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h5 className="font-bold mb-4">2. شركة الشحن</h5>
//             <div className="mb-4">
//               <input
//                 type="radio"
//                 name="shipping"
//                 id="aramex"
//                 className="mr-2"
//                 checked={shippingMethod === 'aramex'}
//                 onChange={() => setShippingMethod('aramex')}
//               />
//               <label htmlFor="aramex">أرامكس (5 دينار - تسليم خلال يومين)</label>
//             </div>
//             <div className="mb-4">
//               <input
//                 type="radio"
//                 name="shipping"
//                 id="local"
//                 className="mr-2"
//                 checked={shippingMethod === 'local'}
//                 onChange={() => setShippingMethod('local')}
//               />
//               <label htmlFor="local">شركة محلية (3 دينار - تسليم خلال 3-5 أيام)</label>
//             </div>
//             <button
//               className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full"
//               onClick={handleConfirmShipping}
//             >
//               تأكيد شركة الشحن
//             </button>
//           </div>
//         )}

//         {/* Step 3: Payment - PayPal Button */}
//         {step === 3 && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h5 className="font-bold mb-4">3. طريقة الدفع</h5>
//             <p className="mb-4">اختر الدفع عبر PayPal لإكمال عملية الشراء:</p>
//             <PayPalScriptProvider
//               options={{
//                 "client-id": "test",
//                 components: "buttons,funding-eligibility",
//                 currency: "USD",
//               }}
//             >
//               <PayPalButtons
//                 style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
//                 createOrder={async (data, actions) => {
//                   try {
//                     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//                     if (cart.length === 0) throw new Error('السلة فارغة');

//                     const products = cart.map(item => ({
//                       name: item.name,
//                       sku: item.productId,
//                       price: item.price.toString(),
//                       quantity: item.quantity.toString(),
//                       currency: "USD"
//                     }));

//                     const orderData = {
//                       purchase_units: [{
//                         amount: {
//                           currency_code: "USD",
//                           value: finalTotal.toFixed(2),
//                           breakdown: {
//                             item_total: {
//                               currency_code: "USD",
//                               value: orderTotal.toFixed(2)
//                             },
//                             shipping: {
//                               currency_code: "USD",
//                               value: shippingFee.toFixed(2)
//                             }
//                           }
//                         },
//                         items: products
//                       }]
//                     };

//                     const response = await axios.post(
//                       'http://localhost:5000/api/payments/paypal/product',
//                       orderData,
//                       { withCredentials: true }
//                     );

//                     if (!response.data.orderID) throw new Error('فشل إنشاء طلب PayPal');
//                     return response.data.orderID;
//                   } catch (error) {
//                     console.error("Create order error:", error);
//                     alert(`خطأ في الدفع: ${error.message}`);
//                     throw error;
//                   }
//                 }}
//                 onApprove={async (data, actions) => {
//                   try {
//                     // 1. تأكيد الدفع مع PayPal أولاً
//                     const paymentResponse = await axios.post(
//                       'http://localhost:5000/api/payments/capture-paypal-order',
//                       {
//                         orderID: data.orderID,
//                         couponCode: appliedCoupon?.code || null,
//                         productIds: cart.map(item => item.productId)
//                       },
//                       { withCredentials: true }
//                     );

//                     if (!paymentResponse.data.success) {
//                       throw new Error(paymentResponse.data.message || 'فشل في تأكيد الدفع');
//                     }

//                     // 2. إنشاء العنوان إذا لم يكن موجوداً
//                     const addressResponse = await axios.post(
//                       'http://localhost:5000/api/checkout/save-address',
//                       {
//                         city: address.city,
//                         address: address.address,
//                         isDefault: address.isDefault
//                       },
//                       { withCredentials: true }
//                     );

//                     if (!addressResponse.data.success) {
//                       throw new Error('فشل في حفظ العنوان');
//                     }

//                     const shippingAddressId = addressResponse.data.address._id;

//                     // 3. إنشاء الطلب في النظام
//                     const orderResponse = await axios.post(
//                       'http://localhost:5000/api/checkout/create-order',
//                       {
//                         products: cart.map(item => ({
//                           product: item.productId,
//                           quantity: item.quantity
//                         })),
//                         shippingMethod,
//                         shippingAddressId,
//                         paymentMethod: 'paypal',
//                         couponCode: appliedCoupon?.code || null
//                       },
//                       { withCredentials: true }
//                     );

//                     if (orderResponse.data.success) {
//                       // 4. مسح السلة وتوجيه المستخدم
//                       localStorage.removeItem('cart');
//                       navigate('/thank-you', {
//                         state: {
//                           orderId: orderResponse.data.order._id,
//                           total: finalTotal
//                         }
//                       });
//                     } else {
//                       throw new Error(orderResponse.data.message || 'فشل في إنشاء الطلب');
//                     }
//                   } catch (error) {
//                     console.error("Order processing error:", error);
//                     alert(`حدث خطأ: ${error.response?.data?.message || error.message}`);

//                     // يمكنك هنا إضافة إعادة توجيه إلى صفحة الخطأ إذا لزم الأمر
//                     // navigate('/payment-error');
//                   }
//                 }}
//                 onError={(err) => {
//                   console.error("PayPal error:", err);
//                   alert(`Payment error: ${err.message || 'Unknown error occurred'}`);
//                 }}
//               />
//             </PayPalScriptProvider>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function Checkout() {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [address, setAddress] = useState({ city: '', address: '', isDefault: false });
  const [shippingMethod, setShippingMethod] = useState('aramex');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // حساب الإجمالي
  const calculateOrderTotal = () => {
    return cart.reduce((total, item) => {
      const priceAfterDiscount = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;

      return total + priceAfterDiscount * item.quantity;
    }, 0);
  };
  const calculateShippingFee = () => {
    return shippingMethod === 'aramex' ? 5 : 3;
  };

  const orderTotal = calculateOrderTotal();
  const shippingFee = calculateShippingFee();
  let couponDiscount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = (orderTotal * appliedCoupon.discountValue) / 100;
    } else if (appliedCoupon.discountType === 'fixed') {
      couponDiscount = appliedCoupon.discountValue;
    }

    if (couponDiscount > orderTotal) {
      couponDiscount = orderTotal;
    }
  }

  const finalTotal = orderTotal - couponDiscount + shippingFee;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleApplyCoupon = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/checkout/apply-coupon', { couponCode }, { withCredentials: true });
      setAppliedCoupon(response.data.coupon);
      setCouponError('');
    } catch (error) {
      setCouponError(error.response?.data?.message || 'حدث خطأ أثناء تطبيق الكوبون');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/checkout/save-address',
        {
          city: address.city,
          address: address.address,
          isDefault: address.isDefault
        },
        { withCredentials: true }
      );

      if (response.data.success) setStep(2);
    } catch (error) {
      console.error('Error saving address:', error);
      alert(`حدث خطأ: ${error.response?.data?.message || 'فشل في حفظ العنوان'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmShipping = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Steps */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-red-700 text-center mb-6">إتمام الطلب</h1>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className={`mt-2 text-sm ${step >= 1 ? 'text-red-700 font-medium' : 'text-gray-500'}`}>العنوان</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-red-700' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className={`mt-2 text-sm ${step >= 2 ? 'text-red-700 font-medium' : 'text-gray-500'}`}>الشحن</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-red-700' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              <span className={`mt-2 text-sm ${step >= 3 ? 'text-red-700 font-medium' : 'text-gray-500'}`}>الدفع</span>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden border border-gray-100">
          <div className="bg-red-700 py-3 px-6">
            <h3 className="font-bold text-white text-lg">ملخص الطلب</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <img src="https://via.placeholder.com/50" alt="User" className="rounded-full mr-4 border-2 border-red-700" />
              <div>
                <p className="font-bold text-[#2B2B2B]">مرحبًا بك، مصطفى عبدات</p>
                <p className="text-sm text-gray-600">أثوابنا / سلة التسوق / إنهاء الطلب</p>
              </div>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-[#2B2B2B]">إجمالي الطلب</h5>
              <span className="text-2xl font-bold text-red-700">{finalTotal} د.أ</span>
            </div>

            <div className="space-y-3 text-right mb-4">
              <div className="flex justify-between">
                <span className="text-[#2B2B2B]">سعر المنتجات:</span>
                <span className="text-[#2B2B2B] font-medium">{orderTotal} د.أ</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>خصم الكوبون:</span>
                  <span>-{couponDiscount.toFixed(2)} د.أ</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#2B2B2B]">تكلفة الشحن:</span>
                <span className="text-[#2B2B2B] font-medium">{shippingFee} د.أ</span>
              </div>
            </div>

            {!appliedCoupon && (
              <>
                <p className="text-red-700 font-medium mb-3">لديك كوبون تخفيض؟</p>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-3 border rounded-r-lg focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
                    placeholder="ادخل رمز الكوبون"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="bg-[#2B2B2B] hover:bg-[#222222] text-white px-6 py-3 rounded-l-lg transition duration-300 font-medium"
                    onClick={handleApplyCoupon}
                    disabled={isLoading}
                  >
                    {isLoading ? 'جاري التطبيق...' : 'تطبيق'}
                  </button>
                </div>
                {couponError && <p className="text-red-700 text-sm mb-4">{couponError}</p>}
              </>
            )}
          </div>
        </div>

        {/* Step 1: Address */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden border border-gray-100">
            <div className="bg-[#2B2B2B] py-3 px-6">
              <h5 className="font-bold text-white text-lg">1. عنوان التوصيل</h5>
            </div>
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-[#2B2B2B]">المدينة</label>
                  <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700 bg-white"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  >
                    <option value="">اختر المدينة</option>
                    <option value="عمان">عمان</option>
                    <option value="الزرقاء">الزرقاء</option>
                    <option value="إربد">إربد</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-[#2B2B2B]">العنوان</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
                    placeholder="أدخل العنوان بالتفصيل"
                    value={address.address}
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  />
                </div>
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      className="form-checkbox h-5 w-5 text-red-700 rounded focus:ring-red-700 mr-2"
                      checked={address.isDefault}
                      onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
                    />
                    <span className="text-[#2B2B2B]">حفظ هذا العنوان للتوصيل في المستقبل</span>
                  </label>
                </div>
                <button
                  type="button"
                  className="bg-[#2B2B2B] hover:bg-[#222222] text-white px-6 py-3 rounded-lg w-full transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  onClick={handleSaveAddress}
                  disabled={!address.city || !address.address || isLoading}
                >
                  {isLoading ? 'جاري الحفظ...' : 'تأكيد العنوان'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Shipping Method */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden border border-gray-100">
            <div className="bg-[#2B2B2B] py-3 px-6">
              <h5 className="font-bold text-white text-lg">2. شركة الشحن</h5>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipping"
                    id="aramex"
                    className="form-radio h-5 w-5 text-red-700 focus:ring-red-700 mr-3"
                    checked={shippingMethod === 'aramex'}
                    onChange={() => setShippingMethod('aramex')}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-[#2B2B2B]">أرامكس</span>
                    <span className="text-sm text-gray-600">تسليم خلال يومين - 5 دينار</span>
                  </div>
                </label>
              </div>
              <div className="mb-6">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shipping"
                    id="local"
                    className="form-radio h-5 w-5 text-red-700 focus:ring-red-700 mr-3"
                    checked={shippingMethod === 'local'}
                    onChange={() => setShippingMethod('local')}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-[#2B2B2B]">شركة محلية</span>
                    <span className="text-sm text-gray-600">تسليم خلال 3-5 أيام - 3 دينار</span>
                  </div>
                </label>
              </div>
              <button
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg w-full transition duration-300 font-medium cursor-pointer"
                onClick={handleConfirmShipping}
              >
                تأكيد شركة الشحن
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment - PayPal Button */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-[#2B2B2B] py-3 px-6">
              <h5 className="font-bold text-white text-lg">3. طريقة الدفع</h5>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="p-6 border-2 border-gray-100 rounded-lg w-full mb-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-bold text-red-700">الإجمالي النهائي</h5>
                    <span className="text-2xl font-bold text-red-700">{finalTotal} د.أ</span>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <p className="text-[#2B2B2B] font-medium mb-2">تفاصيل الشحن:</p>
                  <p className="text-sm text-gray-600 mb-1">العنوان: {address.city} - {address.address}</p>
                  <p className="text-sm text-gray-600">شركة الشحن: {shippingMethod === 'aramex' ? 'أرامكس' : 'شركة محلية'}</p>
                </div>
                
                <p className="mb-6 text-center font-medium text-[#2B2B2B]">
                  اختر الدفع عبر PayPal لإكمال عملية الشراء بأمان
                </p>
              </div>
              
              <PayPalScriptProvider
                options={{
                  "client-id": "test",
                  components: "buttons,funding-eligibility",
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue", shape: "pill", label: "paypal" }}
                  createOrder={async (data, actions) => {
                    try {
                      const cart = JSON.parse(localStorage.getItem('cart')) || [];
                      if (cart.length === 0) throw new Error('السلة فارغة');

                      const products = cart.map(item => ({
                        name: item.name,
                        sku: item.productId,
                        price: item.price.toString(),
                        quantity: item.quantity.toString(),
                        currency: "USD"
                      }));

                      const orderData = {
                        purchase_units: [{
                          amount: {
                            currency_code: "USD",
                            value: finalTotal.toFixed(2),
                            breakdown: {
                              item_total: {
                                currency_code: "USD",
                                value: orderTotal.toFixed(2)
                              },
                              shipping: {
                                currency_code: "USD",
                                value: shippingFee.toFixed(2)
                              }
                            }
                          },
                          items: products
                        }]
                      };

                      const response = await axios.post(
                        'http://localhost:5000/api/payments/paypal/product',
                        orderData,
                        { withCredentials: true }
                      );

                      if (!response.data.orderID) throw new Error('فشل إنشاء طلب PayPal');
                      return response.data.orderID;
                    } catch (error) {
                      console.error("Create order error:", error);
                      alert(`خطأ في الدفع: ${error.message}`);
                      throw error;
                    }
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      // 1. تأكيد الدفع مع PayPal أولاً
                      const paymentResponse = await axios.post(
                        'http://localhost:5000/api/payments/capture-paypal-order',
                        {
                          orderID: data.orderID,
                          couponCode: appliedCoupon?.code || null,
                          productIds: cart.map(item => item.productId)
                        },
                        { withCredentials: true }
                      );

                      if (!paymentResponse.data.success) {
                        throw new Error(paymentResponse.data.message || 'فشل في تأكيد الدفع');
                      }

                      // 2. إنشاء العنوان إذا لم يكن موجوداً
                      const addressResponse = await axios.post(
                        'http://localhost:5000/api/checkout/save-address',
                        {
                          city: address.city,
                          address: address.address,
                          isDefault: address.isDefault
                        },
                        { withCredentials: true }
                      );

                      if (!addressResponse.data.success) {
                        throw new Error('فشل في حفظ العنوان');
                      }

                      const shippingAddressId = addressResponse.data.address._id;

                      // 3. إنشاء الطلب في النظام
                      const orderResponse = await axios.post(
                        'http://localhost:5000/api/checkout/create-order',
                        {
                          products: cart.map(item => ({
                            product: item.productId,
                            quantity: item.quantity
                          })),
                          shippingMethod,
                          shippingAddressId,
                          paymentMethod: 'paypal',
                          couponCode: appliedCoupon?.code || null
                        },
                        { withCredentials: true }
                      );

                      if (orderResponse.data.success) {
                        // 4. مسح السلة وتوجيه المستخدم
                        localStorage.removeItem('cart');
                        navigate('/thank-you', {
                          state: {
                            orderId: orderResponse.data.order._id,
                            total: finalTotal
                          }
                        });
                      } else {
                        throw new Error(orderResponse.data.message || 'فشل في إنشاء الطلب');
                      }
                    } catch (error) {
                      console.error("Order processing error:", error);
                      alert(`حدث خطأ: ${error.response?.data?.message || error.message}`);

                      // يمكنك هنا إضافة إعادة توجيه إلى صفحة الخطأ إذا لزم الأمر
                      // navigate('/payment-error');
                    }
                  }}
                  onError={(err) => {
                    console.error("PayPal error:", err);
                    alert(`Payment error: ${err.message || 'Unknown error occurred'}`);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;




//الي كانت زابطة بدون اوردر  <
