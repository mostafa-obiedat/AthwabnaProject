import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  // Edit state
  const [showEdit, setShowEdit] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editImage, setEditImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', { withCredentials: true });
        setUser(res.data.user);
        setPayments(res.data.payments);
        setCoupons(res.data.coupons);

        // Initialize edit fields
        setEditUsername(res.data.user.username);
        setEditEmail(res.data.user.email);
        setEditPhone(res.data.user.phonenumber);
      } catch (error) {
        console.error("❌ فشل في جلب بيانات المستخدم:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("username", editUsername);
      formData.append("email", editEmail);
      formData.append("phonenumber", editPhone);
      if (!/^0\d+$/.test(editPhone)) {
        alert("رقم الهاتف يجب أن يبدأ بـ 0 ويحتوي على أرقام فقط");
        return;
      }
      if (editImage) {
        formData.append("profileImage", editImage);
      }

      const res = await axios.put(
        'http://localhost:5000/api/users/profile/update',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser({
        ...user,
        username: editUsername,
        email: editEmail,
        phonenumber: editPhone,
        profileImage: editImage ? URL.createObjectURL(editImage) : user.profileImage
      });
      
      setShowEdit(false);
      Swal.fire({
               title: 'تم التحديث!',
               text: 'تم تحديث البيانات بنجاح.',
               icon: 'success',
               confirmButtonColor: '#AA1313'
           });
    } catch (error) {
      console.error('❌ فشل في تحديث البيانات:', error);
      alert('حدث خطأ أثناء التحديث');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#f8e5d7] p-6 rounded-lg shadow-md w-64 text-center">
          <div className="w-12 h-12 border-4 border-t-4 border-[#AA1313] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2B2B2B] font-medium">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center mt-10 text-lg p-8 bg-[#f8e5d7] rounded-xl shadow-lg border border-[#e6c9b8]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#AA1313] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-[#AA1313] font-bold text-xl mb-2">لم يتم العثور على بيانات المستخدم</div>
          <p className="text-gray-600">يرجى تسجيل الدخول وإعادة المحاولة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 mb-16">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] rounded-2xl shadow-lg p-6 md:p-8 mb-8 border-2 border-[#e6c9b8] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-48 h-48 bg-[#AA1313] opacity-10 rounded-full"></div>
        <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-[#AA1313] opacity-10 rounded-full"></div>

        <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
            <div className="relative mb-4 md:mb-0 md:mr-8">
              <img
                src={editImage ? URL.createObjectURL(editImage) : `http://localhost:5000${user.profileImage}`}
                alt="Profile"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-[#AA1313] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-xl md:text-2xl font-bold text-[#2B2B2B]">{user.username}</h1>
              <p className="text-gray-600 text-sm md:text-base">{user.email}</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">عضو منذ {new Date(user.createdAt).toLocaleDateString('ar-JO')}</p>
            </div>
          </div>

          <button
            onClick={() => setShowEdit(!showEdit)}
            className="px-4 py-2 md:px-6 md:py-2 bg-[#AA1313] text-white rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 flex items-center text-sm md:text-base cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            تعديل البيانات
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex mb-6 border-b border-[#e6c9b8] overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 md:px-6 md:py-3 font-medium transition-colors duration-300 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'text-[#AA1313] border-b-2 border-[#AA1313]'
              : 'text-gray-500 hover:text-[#AA1313]'
          }`}
        >
          معلوماتي الشخصية
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 md:px-6 md:py-3 font-medium transition-colors duration-300 whitespace-nowrap ${
            activeTab === 'payments'
              ? 'text-[#AA1313] border-b-2 border-[#AA1313]'
              : 'text-gray-500 hover:text-[#AA1313]'
          }`}
        >
          سجل المدفوعات
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 md:px-6 md:py-3 font-medium transition-colors duration-300 whitespace-nowrap ${
            activeTab === 'coupons'
              ? 'text-[#AA1313] border-b-2 border-[#AA1313]'
              : 'text-gray-500 hover:text-[#AA1313]'
          }`}
        >
          الكوبونات المستخدمة
        </button>
      </div>

      {/* Edit Form */}
      {showEdit && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-8 border border-[#e6c9b8] animate-fadeIn">
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#2B2B2B] border-b pb-2 md:pb-3 border-[#e6c9b8]">تعديل البيانات الشخصية</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">اسم المستخدم:</label>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="w-full p-2 md:p-3 bg-gray-50 border border-[#e6c9b8] rounded-lg focus:outline-none focus:border-[#AA1313] transition-colors text-sm md:text-base"
                placeholder="أدخل اسم المستخدم"
              />
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">البريد الإلكتروني:</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full p-2 md:p-3 bg-gray-50 border border-[#e6c9b8] rounded-lg focus:outline-none focus:border-[#AA1313] transition-colors text-sm md:text-base"
                placeholder="example@domain.com"
              />
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">رقم الهاتف:</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full p-2 md:p-3 bg-gray-50 border border-[#e6c9b8] rounded-lg focus:outline-none focus:border-[#AA1313] transition-colors text-sm md:text-base"
                placeholder="07xxxxxxxx"
              />
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm font-medium text-gray-700">صورة البروفايل:</label>
              <div className="flex items-center">
                <label className="w-full cursor-pointer flex items-center justify-center p-2 md:p-3 bg-gray-50 border border-dashed border-[#e6c9b8] rounded-lg hover:bg-[#f8e5d7] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 text-xs md:text-sm">
                    {editImage ? editImage.name : 'اختر صورة...'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 md:mt-8">
            <button
              onClick={() => setShowEdit(false)}
              className="px-4 py-1 md:px-6 md:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 ml-2 md:ml-4 text-sm md:text-base cursor-pointer"
            >
              إلغاء
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-1 md:px-6 md:py-2 bg-[#AA1313] text-white rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 flex items-center text-sm md:text-base cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              حفظ التعديلات
            </button>
          </div>
        </div>
      )}

      {/* Personal Information */}
      {activeTab === 'profile' && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-8 animate-fadeIn">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#2B2B2B] border-b pb-2 md:pb-3 border-[#e6c9b8]">المعلومات الشخصية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-[#f8e5d7] rounded-lg">
              <div className="flex items-center mb-1 md:mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#AA1313] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs md:text-sm font-medium text-gray-500">اسم المستخدم</span>
              </div>
              <p className="text-base md:text-lg text-[#2B2B2B]">{user.username}</p>
            </div>

            <div className="p-3 md:p-4 bg-[#f8e5d7] rounded-lg">
              <div className="flex items-center mb-1 md:mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#AA1313] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs md:text-sm font-medium text-gray-500">البريد الإلكتروني</span>
              </div>
              <p className="text-base md:text-lg text-[#2B2B2B] direction-ltr">{user.email}</p>
            </div>

            <div className="p-3 md:p-4 bg-[#f8e5d7] rounded-lg">
              <div className="flex items-center mb-1 md:mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#AA1313] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs md:text-sm font-medium text-gray-500">رقم الهاتف</span>
              </div>
              <p className="text-base md:text-lg text-[#2B2B2B] direction-ltr">{user.phonenumber}</p>
            </div>

            <div className="p-3 md:p-4 bg-[#f8e5d7] rounded-lg">
              <div className="flex items-center mb-1 md:mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#AA1313] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs md:text-sm font-medium text-gray-500">تاريخ الانضمام</span>
              </div>
              <p className="text-base md:text-lg text-[#2B2B2B]">{new Date(user.createdAt).toLocaleDateString('ar-JO')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Payment History */}
      {activeTab === 'payments' && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-8 animate-fadeIn">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#2B2B2B] border-b pb-2 md:pb-3 border-[#e6c9b8]">سجل المدفوعات</h2>

          {payments.length === 0 ? (
            <div className="p-6 md:p-10 text-center bg-[#f8e5d7] rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto text-[#AA1313] opacity-30 mb-3 md:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 font-medium text-sm md:text-base">لا يوجد مدفوعات حتى الآن.</p>
              <button className="mt-3 md:mt-4 px-4 py-1 md:px-6 md:py-2 bg-[#AA1313] text-white rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 text-sm md:text-base">
                تصفح منتجاتنا
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-[#e6c9b8]">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-[#f8e5d7] text-right">
                    <th className="px-3 py-2 md:px-4 md:py-3 text-[#2B2B2B] font-semibold text-xs md:text-sm">رقم العملية</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-[#2B2B2B] font-semibold text-xs md:text-sm">المبلغ</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-[#2B2B2B] font-semibold text-xs md:text-sm">العملة</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-[#2B2B2B] font-semibold text-xs md:text-sm">الوصف</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-[#2B2B2B] font-semibold text-xs md:text-sm">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, idx) => (
                    <tr key={idx} className={`text-right ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#f8e5d7]/30 transition-colors`}>
                      <td className="px-3 py-2 md:px-4 md:py-3 border-b border-[#e6c9b8] text-xs md:text-sm">{payment.orderId}</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 border-b border-[#e6c9b8] font-medium text-xs md:text-sm">{payment.amount}</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 border-b border-[#e6c9b8] text-xs md:text-sm">{payment.currency}</td>
                      <td className="px-3 py-2 md:px-4 md:py-3 border-b border-[#e6c9b8] text-xs md:text-sm">
                        {payment.productId && payment.productId.length > 0
                          ? payment.productId.map((product, index) => (
                            <span key={index} className="inline-block bg-[#f8e5d7] px-1 py-0.5 md:px-2 md:py-1 rounded-lg text-xs ml-1 mb-1">
                              {product.name}
                            </span>
                          ))
                          : 'غير معروف'}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 border-b border-[#e6c9b8] text-gray-600 text-xs md:text-sm">{new Date(payment.createdAt).toLocaleDateString('ar-JO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Coupon History */}
      {activeTab === 'coupons' && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-8 animate-fadeIn">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#2B2B2B] border-b pb-2 md:pb-3 border-[#e6c9b8]">الكوبونات المستخدمة</h2>

          {coupons.length === 0 ? (
            <div className="p-6 md:p-10 text-center bg-[#f8e5d7] rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto text-[#AA1313] opacity-30 mb-3 md:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <p className="text-gray-600 font-medium text-sm md:text-base">لم تستخدم أي كوبونات حتى الآن.</p>
              <p className="text-gray-500 text-xs md:text-sm mt-1 md:mt-2 mb-3 md:mb-4">استخدم أكواد الخصم عند الشراء للحصول على أفضل الأسعار</p>
              <Link to="/offers"
                className="px-4 py-1 md:px-6 md:py-2 bg-[#AA1313] text-white rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 text-sm md:text-base"
              >
                تصفح العروض
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {coupons.map((coupon, idx) => (
                <div key={idx} className="bg-[#f8e5d7] p-3 md:p-4 rounded-lg border border-[#e6c9b8] flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-[#AA1313] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      <span className="font-bold text-[#2B2B2B] text-sm md:text-base">{coupon.code}</span>
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">تم الاستخدام في: {new Date(coupon.usedAt).toLocaleDateString('ar-SA')}</p>
                  </div>
                  <div className="text-[#AA1313] bg-white p-1 md:p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Previous Orders Summary */}
      {activeTab === 'profile' && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg animate-fadeIn">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#2B2B2B] border-b pb-2 md:pb-3 border-[#e6c9b8]">ملخص طلباتك السابقة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-center">
            <div className="bg-[#f8e5d7] p-4 md:p-6 rounded-lg border border-[#e6c9b8]">
              <div className="text-xl md:text-3xl font-bold text-[#2B2B2B]">{payments.length}</div>
              <p className="text-gray-600 text-xs md:text-sm">إجمالي الطلبات</p>
            </div>
            
            <div className="bg-[#f8e5d7] p-4 md:p-6 rounded-lg border border-[#e6c9b8]">
              <div className="text-xl md:text-3xl font-bold text-[#2B2B2B]">
                {payments.reduce((total, payment) => payment.amount, 0)} د.أ
              </div>
              <p className="text-gray-600 text-xs md:text-sm">إجمالي المشتريات</p>
            </div>
            
            <div className="bg-[#f8e5d7] p-4 md:p-6 rounded-lg border border-[#e6c9b8]">
              <div className="text-xl md:text-3xl font-bold text-[#2B2B2B]">{coupons.length}</div>
              <p className="text-gray-600 text-xs md:text-sm">كوبونات مستخدمة</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
