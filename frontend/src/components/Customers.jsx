import { API_URL } from "../config";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phonenumber: '',
//     role: '',
//   });

//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/admin/customers`, {
//         params: { search, page },
//         withCredentials: true,
//       });
//       setCustomers(response.data.data);
//       setTotalPages(response.data.totalPages || 1);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, [search, page]);

//   const handleDelete = async (id) => {
//     const confirmDelete = await Swal.fire({
//       title: 'هل أنت متأكد؟',
//       text: "لن تتمكن من التراجع عن هذا الإجراء!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#AA1313',
//       cancelButtonColor: '#2B2B2B',
//       confirmButtonText: 'نعم، احذفه!',
//       cancelButtonText: 'إلغاء',
//     });

//     if (confirmDelete.isConfirmed) {
//       try {
//         await axios.delete(`${API_URL}/api/admin/users/${id}`, {
//           withCredentials: true,
//         });
//         fetchCustomers();
//         Swal.fire({
//           title: 'تم الحذف!',
//           text: 'تم حذف المستخدم بنجاح.',
//           icon: 'success',
//           confirmButtonColor: '#AA1313',
//       });
//       } catch (error) {
//         Swal.fire(
//           'خطأ!',
//           'فشل في حذف المستخدم: ' + (error.response?.data?.message || error.message),
//           'error'
//         );
//         console.error('خطأ أثناء حذف المستخدم:', error);
//       }
//     }
//   };

//   const openEditModal = (user) => {
//     setEditingUser(user);
//     setFormData({
//       username: user.username || '',
//       email: user.email || '',
//       phonenumber: user.phonenumber || '',
//       role: user.role || '',
//     });
//   };

//   const closeEditModal = () => {
//     setEditingUser(null);
//     setFormData({
//       username: '',
//       email: '',
//       phonenumber: '',
//       role: '',
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`${API_URL}/api/admin/users/${editingUser._id}`, formData, {
//         withCredentials: true,
//       });
//       Swal.fire({
//         title: 'تم التحديث!',
//         text: 'تم تحديث البيانات بنجاح.',
//         icon: 'success',
//         confirmButtonColor: '#AA1313',
//     });
//       fetchCustomers();
//       closeEditModal();
//     } catch (error) {
//       Swal.fire(
//         'خطأ!',
//         'فشل في التحديث: ' + (error.response?.data?.message || error.message),
//         'error'
//       );
//       console.error('خطأ أثناء تحديث المستخدم:', error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1); // الرجوع للصفحة الأولى عند البحث
//   };

//   return (
//     <div className="min-h-screen p-6 bg-[#FFF7F2] text-[#2B2B2B]">
//       <div className="max-w-6xl mx-auto px-2">
//         <div className="flex items-center mb-6">
//           <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
//           <h2 className="text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">إدارة العملاء</h2>
//         </div>
//         {/* 🔍 مربع البحث */}
//         <div className="mb-6 bg-white rounded-lg shadow-md p-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="ابحث بالاسم..."
//               value={search}
//               onChange={handleSearchChange}
//               className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
//             />
//             <span className="absolute left-3 top-3 text-gray-400">🔍</span>
//           </div>
//         </div>

//         {customers.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-lg shadow-md">
//             <p className="text-lg text-gray-500">لا يوجد عملاء متطابقين مع البحث</p>
//           </div>
//         ) : (
//           /* 🧾 بطاقات العملاء */
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {customers.map((customer) => (
//               <div key={customer._id} className="border bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <div className="border-b border-gray-100 p-4">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={`${API_URL}${customer.profileImage}`}
//                       alt={customer.username}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-[#AA1313]"
//                     />
//                     <h4 className="text-xl font-bold text-[#2B2B2B]">{customer.username}</h4>
//                     <p className="text-gray-600 flex gap-1">
//                       <span>{customer.email}</span>
//                       <span className="text-[#AA1313]">✉</span>
//                     </p>
//                     <p className="text-gray-600 flex items-center gap-1">
//                       <span>{customer.phonenumber}</span>
//                       <span className="text-[#AA1313]">📱</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 text-right">
//                   <div className="grid grid-cols-3 gap-2 text-center">
//                     <div className="bg-[#FFF7F2] p-2 rounded-lg">
//                       <p className="text-sm text-gray-600">الطلبات</p>
//                       <p className="text-lg font-bold text-[#AA1313]">{customer.orders?.length || 0}</p>
//                     </div>
//                     <div className="bg-[#FFF7F2] p-2 rounded-lg">
//                       <p className="text-sm text-gray-600">العناوين</p>
//                       <p className="text-lg font-bold text-[#AA1313]">{customer.savedAddresses?.length || 0}</p>
//                     </div>
//                     <div className="bg-[#FFF7F2] p-2 rounded-lg">
//                       <p className="text-sm text-gray-600">المفضلة</p>
//                       <p className="text-lg font-bold text-[#AA1313]">{customer.likedProducts?.length || 0}</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={() => openEditModal(customer)}
//                       className="bg-[#2B2B2B] hover:bg-[#262626] text-white px-4 py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer"
//                     >
//                       تعديل
//                     </button>
//                     <button
//                       onClick={() => handleDelete(customer._id)}
//                       className="bg-[#AA1313] hover:bg-[#8a0f0f] text-white px-4 py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer"
//                     >
//                       حذف
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* 📄 الترقيم */}
//         {totalPages > 1 && (
//           <div className="mt-8 flex justify-center gap-2">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               className={`px-5 py-2 rounded-lg flex items-center gap-1 ${page === 1
//                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 : 'bg-[#2B2B2B] text-white hover:bg-gray-800'
//                 } transition-colors duration-300`}
//             >
//               <span>السابق</span>
//             </button>
//             <span className="px-5 py-2 bg-white border border-gray-200 rounded-lg flex items-center">
//               <span className="text-[#AA1313] font-bold">{page}</span>
//               <span className="mx-1">من</span>
//               <span className="text-[#2B2B2B]">{totalPages}</span>
//             </span>
//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages}
//               className={`px-5 py-2 rounded-lg flex items-center gap-1 ${page === totalPages
//                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 : 'bg-[#2B2B2B] text-white hover:bg-gray-800'
//                 } transition-colors duration-300`}
//             >
//               <span>التالي</span>
//             </button>
//           </div>
//         )}

//         {/* ✨ نافذة التعديل */}
//         {editingUser && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-right animate-fadeIn">
//               <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
//                 <h3 className="text-xl font-bold text-[#2B2B2B]">تعديل بيانات المستخدم</h3>
//                 <button
//                   onClick={closeEditModal}
//                   className="text-gray-500 hover:text-[#AA1313] transition-colors cursor-pointer"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <label className="block">
//                   <span className="block mb-1 text-[#2B2B2B]">الدور:</span>
//                   <input
//                     type="text"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                   />
//                 </label>
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={handleUpdate}
//                   className="px-5 py-2 rounded-lg bg-[#AA1313] text-white hover:bg-[#8a0f0f] transition-colors duration-300 cursor-pointer"
//                 >
//                   حفظ التغييرات
//                 </button>
//                 <button
//                   onClick={closeEditModal}
//                   className="px-5 py-2 rounded-lg bg-gray-100 text-[#2B2B2B] hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
//                 >
//                   إلغاء
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Customers;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    role: '',
  });

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/customers`, {
        params: { search, page },
        withCredentials: true,
      });
      setCustomers(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, page]);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AA1313',
      cancelButtonColor: '#2B2B2B',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/admin/users/${id}`, {
          withCredentials: true,
        });
        fetchCustomers();
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تم حذف المستخدم بنجاح.',
          icon: 'success',
          confirmButtonColor: '#AA1313',
      });
      } catch (error) {
        Swal.fire(
          'خطأ!',
          'فشل في حذف المستخدم: ' + (error.response?.data?.message || error.message),
          'error'
        );
        console.error('خطأ أثناء حذف المستخدم:', error);
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username || '',
      email: user.email || '',
      phonenumber: user.phonenumber || '',
      role: user.role || '',
    });
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      email: '',
      phonenumber: '',
      role: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/api/admin/users/${editingUser._id}`, formData, {
        withCredentials: true,
      });
      Swal.fire({
        title: 'تم التحديث!',
        text: 'تم تحديث البيانات بنجاح.',
        icon: 'success',
        confirmButtonColor: '#AA1313',
    });
      fetchCustomers();
      closeEditModal();
    } catch (error) {
      Swal.fire(
        'خطأ!',
        'فشل في التحديث: ' + (error.response?.data?.message || error.message),
        'error'
      );
      console.error('خطأ أثناء تحديث المستخدم:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // الرجوع للصفحة الأولى عند البحث
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 bg-[#FFF7F2] text-[#2B2B2B]">
      <div className="max-w-6xl mx-auto px-1 sm:px-2">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-1 h-6 sm:h-8 bg-[#AA1313] ml-2 sm:ml-3"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] pb-1 sm:pb-2 w-full border-b border-gray-200">إدارة العملاء</h2>
        </div>
        {/* 🔍 مربع البحث */}
        <div className="mb-4 sm:mb-6 bg-white rounded-lg shadow-md p-3 sm:p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث بالاسم..."
              value={search}
              onChange={handleSearchChange}
              className="w-full p-2 sm:p-3 pl-8 sm:pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
            />
            <span className="absolute left-3 top-2 sm:top-3 text-gray-400">🔍</span>
          </div>
        </div>

        {customers.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md">
            <p className="text-base sm:text-lg text-gray-500">لا يوجد عملاء متطابقين مع البحث</p>
          </div>
        ) : (
          /* 🧾 بطاقات العملاء */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {customers.map((customer) => (
              <div key={customer._id} className="border bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="border-b border-gray-100 p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <img
                      src={`${API_URL}${customer.profileImage}`}
                      alt={customer.username}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#AA1313]"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                      <h4 className="text-lg sm:text-xl font-bold text-[#2B2B2B]">{customer.username}</h4>
                      <div className="flex flex-col sm:flex-row sm:gap-4 mt-1 sm:mt-0">
                        <p className="text-sm sm:text-base text-gray-600 flex items-center gap-1">
                          <span>{customer.email}</span>
                          <span className="text-[#AA1313]">✉</span>
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 flex items-center gap-1">
                          <span>{customer.phonenumber}</span>
                          <span className="text-[#AA1313]">📱</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 sm:p-4 text-right">
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                    <div className="bg-[#FFF7F2] p-1 sm:p-2 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600">الطلبات</p>
                      <p className="text-base sm:text-lg font-bold text-[#AA1313]">{customer.orders?.length || 0}</p>
                    </div>
                    <div className="bg-[#FFF7F2] p-1 sm:p-2 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600">العناوين</p>
                      <p className="text-base sm:text-lg font-bold text-[#AA1313]">{customer.savedAddresses?.length || 0}</p>
                    </div>
                    <div className="bg-[#FFF7F2] p-1 sm:p-2 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600">المفضلة</p>
                      <p className="text-base sm:text-lg font-bold text-[#AA1313]">{customer.likedProducts?.length || 0}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-3">
                    <button
                      onClick={() => openEditModal(customer)}
                      className="bg-[#2B2B2B] hover:bg-[#262626] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-[#AA1313] hover:bg-[#8a0f0f] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 📄 الترقيم */}
        {totalPages > 1 && (
          <div className="mt-6 sm:mt-8 flex justify-center gap-1 sm:gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 ${page === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#2B2B2B] text-white hover:bg-gray-800'
                } transition-colors duration-300 text-sm sm:text-base`}
            >
              <span>السابق</span>
            </button>
            <span className="px-3 sm:px-5 py-1 sm:py-2 bg-white border border-gray-200 rounded-lg flex items-center text-sm sm:text-base">
              <span className="text-[#AA1313] font-bold">{page}</span>
              <span className="mx-1">من</span>
              <span className="text-[#2B2B2B]">{totalPages}</span>
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 ${page === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#2B2B2B] text-white hover:bg-gray-800'
                } transition-colors duration-300 text-sm sm:text-base`}
            >
              <span>التالي</span>
            </button>
          </div>
        )}

        {/* ✨ نافذة التعديل */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md text-right animate-fadeIn">
              <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-gray-100 pb-2 sm:pb-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#2B2B2B]">تعديل بيانات المستخدم</h3>
                <button
                  onClick={closeEditModal}
                  className="text-gray-500 hover:text-[#AA1313] transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <label className="block">
                  <span className="block mb-1 text-[#2B2B2B] text-sm sm:text-base">الدور:</span>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                  />
                </label>
              </div>

              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={handleUpdate}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-[#AA1313] text-white hover:bg-[#8a0f0f] transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                >
                  حفظ التغييرات
                </button>
                <button
                  onClick={closeEditModal}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-gray-100 text-[#2B2B2B] hover:bg-gray-200 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;