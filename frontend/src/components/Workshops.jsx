import { API_URL } from "../config";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from 'sweetalert2';

// function Workshops() {
//   const [workshops, setWorkshops] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     image: null,
//     description: "",
//     date: "",
//     time: "",
//     location: "",
//     ageRange: "",
//     price: "",
//     isFree: false,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchWorkshops();
//   }, [searchTerm, currentPage]);

//   const fetchWorkshops = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/workshops`, {
//         params: { search: searchTerm, page: currentPage, limit: 6 },
//         withCredentials: true,
//       });

//       setWorkshops(res.data.workshops);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error("حدث خطأ أثناء جلب الورشات:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "image" && !value) return;
//       data.append(key, value);
//     });

//     try {
//       if (editingId) {
//         await axios.put(
//           `${API_URL}/api/admin/workshops/${editingId}`,
//           data,
//           {
//             withCredentials: true,
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//         Swal.fire({
//           title: 'تم التحديث!',
//           text: 'تم تحديث الورشة بنجاح',
//           icon: 'success',
//           confirmButtonColor: '#AA1313',
//         });
//       } else {
//         await axios.post(`${API_URL}/api/admin/workshops`, data, {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         Swal.fire({
//           title: 'تم الإضافة!',
//           text: 'تم إضافة الورشة بنجاح',
//           icon: 'success',
//           confirmButtonColor: '#AA1313',
//         });
//       }

//       fetchWorkshops();
//       resetForm();
//     } catch (err) {
//       Swal.fire({
//         title: 'خطأ!',
//         text: err.response?.data?.message || 'حدث خطأ أثناء الحفظ',
//         icon: 'error',
//         confirmButtonColor: '#AA1313',
//       });
//       console.error("خطأ أثناء حفظ الورشة:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'هل أنت متأكد؟',
//       text: "لن تتمكن من استعادة هذه الورشة بعد الحذف!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#AA1313',
//       cancelButtonColor: '#2B2B2B',
//       confirmButtonText: 'نعم، احذفها!',
//       cancelButtonText: 'إلغاء',
//     });
  
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${API_URL}/api/admin/workshops/${id}`, {
//           withCredentials: true,
//         });
//         Swal.fire({
//           title: 'تم الحذف!',
//           text: 'تم حذف الورشة بنجاح',
//           icon: 'success',
//           confirmButtonColor: '#AA1313',
//         });
//         fetchWorkshops();
//       } catch (err) {
//         Swal.fire({
//           title: 'خطأ!',
//           text: err.response?.data?.message || 'حدث خطأ أثناء الحذف',
//           icon: 'error',
//           confirmButtonColor: '#AA1313',
//         });
//         console.error("خطأ أثناء حذف الورشة:", err);
//       }
//     }
//   };
//   const handleEdit = (workshop) => {
//     setFormData({
//       title: workshop.title,
//       image: null,
//       description: workshop.description,
//       date: workshop.date,
//       time: workshop.time,
//       location: workshop.location,
//       ageRange: workshop.ageRange,
//       price: workshop.price,
//       isFree: workshop.isFree,
//     });
//     setEditingId(workshop._id);
//     setShowForm(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       image: null,
//       description: "",
//       date: "",
//       time: "",
//       location: "",
//       ageRange: "",
//       price: "",
//       isFree: false,
//     });
//     setEditingId(null);
//     setShowForm(false);
//   };

//   return (
//     <div className="min-h-screen p-6 bg-[#FFF7F2] text-[#2B2B2B]">
//       <div className="max-w-6xl mx-auto px-2">
//         <div className="flex items-center mb-6">
//           <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
//           <h2 className="text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">🧵 إدارة الورشات</h2>
//         </div>

//         {/* شريط البحث وزر الإضافة */}
//         <div className="mb-6 flex justify-between flex-wrap gap-4 bg-white p-4 rounded-lg shadow-md">
//           <div className="relative w-full md:w-1/2">
//             <input
//               type="text"
//               placeholder="ابحث عن عنوان الورشة..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//             />
//             <span className="absolute left-3 top-3 text-gray-400">🔍</span>
//           </div>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowForm(true);
//             }}
//             className="bg-[#AA1313] text-white px-6 py-3 rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 flex items-center gap-2 cursor-pointer"
//           >
//             <span>+</span>
//             <span>إضافة ورشة جديدة</span>
//           </button>
//         </div>

//         {/* نموذج الإضافة/التعديل */}
//         {showForm && (
//           <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-white border border-gray-100">
//             <div className="bg-[#2B2B2B] text-white p-4">
//               <h3 className="text-xl font-bold">
//                 {editingId ? "✏️ تعديل الورشة" : "✨ إضافة ورشة جديدة"}
//               </h3>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">عنوان الورشة</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">التاريخ</label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, date: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">الوقت</label>
//                   <input
//                     type="time"
//                     name="time"
//                     value={formData.time}
//                     onChange={(e) =>
//                       setFormData({ ...formData, time: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">الموقع</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={(e) =>
//                       setFormData({ ...formData, location: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">الفئة العمرية</label>
//                   <input
//                     type="text"
//                     name="ageRange"
//                     value={formData.ageRange}
//                     onChange={(e) =>
//                       setFormData({ ...formData, ageRange: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">السعر (دينار)</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                     required
//                     disabled={formData.isFree}
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">الوصف</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2] min-h-32"
//                     required
//                     rows={4}
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block mb-2 font-medium text-[#2B2B2B]">صورة الورشة</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setFormData({ ...formData, image: e.target.files[0] })
//                     }
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
//                   />
//                   <p className="text-sm text-gray-500 mt-1">اختيارية {editingId ? "(اترك فارغاً للاحتفاظ بالصورة الحالية)" : ""}</p>
//                 </div>

//                 <div className="md:col-span-2">
//                   <div className="flex items-center gap-2 p-3 bg-[#FFF7F2] rounded-lg">
//                     <input
//                       type="checkbox"
//                       id="isFree"
//                       checked={formData.isFree}
//                       onChange={(e) =>
//                         setFormData({ ...formData, isFree: e.target.checked })
//                       }
//                       className="w-4 h-4 text-[#AA1313]"
//                     />
//                     <label htmlFor="isFree" className="select-none">هل الورشة مجانية؟</label>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-4 mt-6">
//               <button
//                   type="submit"
//                   className="px-6 py-3 rounded-lg bg-[#AA1313] text-white hover:bg-[#8a0f0f] transition-colors duration-300 cursor-pointer"
//                 >
//                   {editingId ? "تحديث الورشة" : "إضافة الورشة"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-6 py-3 rounded-lg bg-gray-100 text-[#2B2B2B] hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
//                 >
//                   إلغاء
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* قائمة الورشات */}
//         {workshops.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-lg shadow-md">
//             <div className="text-6xl mb-4">🧶</div>
//             <p className="text-xl text-gray-500">لا توجد ورشات متاحة حالياً</p>
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {workshops.map((workshop) => (
//               <div
//                 key={workshop._id}
//                 className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
//               >
//                 {workshop.image && (
//                   <div className="relative h-52">
//                     <img
//                       src={`${API_URL}${workshop.image}`}
//                       alt={workshop.title}
//                       className="w-full h-full object-cover"
//                     />
//                     {workshop.isFree && (
//                       <span className="absolute top-2 left-2 bg-[#AA1313] text-white text-sm py-1 px-3 rounded-full">
//                         مجانية
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 <div className="p-4">
//                   <h4 className="font-bold text-xl mb-2 text-[#2B2B2B]">{workshop.title}</h4>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workshop.description}</p>

//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center gap-1 text-sm">
//                       <span >📅</span>
//                       <span>{workshop.date}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-sm">
//                       <span>🕒</span>
//                       <span>{workshop.time}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-sm">
//                       <span>📍</span>
//                       <span>{workshop.location}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-sm">
//                       <span>👥</span>
//                       <span>{workshop.ageRange}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-sm font-bold">
//                       <span>💵</span>
//                       <span>{workshop.isFree ? "مجانية" : `${workshop.price} دينار`}</span>
//                     </div>
//                   </div>

//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={() => handleEdit(workshop)}
//                       className="bg-[#2B2B2B] hover:bg-[#262626] text-white px-4 py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer"
//                     >
//                       تعديل
//                     </button>
//                     <button
//                       onClick={() => handleDelete(workshop._id)}
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

//         {/* الترقيم */}
//         {totalPages > 1 && (
//           <div className="mt-8 flex justify-center gap-2">
//             <div className="bg-white rounded-lg shadow-md inline-flex p-1">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-5 py-2 rounded-lg flex items-center gap-1 ${currentPage === 1
//                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
//                 } transition-colors duration-300`}
//             >
//               <span>السابق</span>
//             </button>
//             <span className="px-5 py-2 flex items-center">
//               <span className="text-[#AA1313] font-bold">{currentPage}</span>
//               <span className="mx-1">من</span>
//               <span className="text-[#2B2B2B]">{totalPages}</span>
//             </span>
//             <button
//               onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
//               disabled={currentPage === totalPages}
//               className={`px-5 py-2 rounded-lg flex items-center gap-1 ${currentPage === totalPages
//                 ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 : 'bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer'
//                 } transition-colors duration-300`}
//             >
//               <span>التالي</span>
//             </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Workshops;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    date: "",
    time: "",
    location: "",
    ageRange: "",
    price: "",
    isFree: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchWorkshops();
  }, [searchTerm, currentPage]);

  const fetchWorkshops = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/workshops`, {
        params: { search: searchTerm, page: currentPage, limit: 6 },
        withCredentials: true,
      });

      setWorkshops(res.data.workshops);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("حدث خطأ أثناء جلب الورشات:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && !value) return;
      data.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/api/admin/workshops/${editingId}`,
          data,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        Swal.fire({
          title: 'تم التحديث!',
          text: 'تم تحديث الورشة بنجاح',
          icon: 'success',
          confirmButtonColor: '#AA1313',
        });
      } else {
        await axios.post(`${API_URL}/api/admin/workshops`, data, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
          title: 'تم الإضافة!',
          text: 'تم إضافة الورشة بنجاح',
          icon: 'success',
          confirmButtonColor: '#AA1313',
        });
      }

      fetchWorkshops();
      resetForm();
    } catch (err) {
      Swal.fire({
        title: 'خطأ!',
        text: err.response?.data?.message || 'حدث خطأ أثناء الحفظ',
        icon: 'error',
        confirmButtonColor: '#AA1313',
      });
      console.error("خطأ أثناء حفظ الورشة:", err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من استعادة هذه الورشة بعد الحذف!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AA1313',
      cancelButtonColor: '#2B2B2B',
      confirmButtonText: 'نعم، احذفها!',
      cancelButtonText: 'إلغاء',
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/admin/workshops/${id}`, {
          withCredentials: true,
        });
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تم حذف الورشة بنجاح',
          icon: 'success',
          confirmButtonColor: '#AA1313',
        });
        fetchWorkshops();
      } catch (err) {
        Swal.fire({
          title: 'خطأ!',
          text: err.response?.data?.message || 'حدث خطأ أثناء الحذف',
          icon: 'error',
          confirmButtonColor: '#AA1313',
        });
        console.error("خطأ أثناء حذف الورشة:", err);
      }
    }
  };
  const handleEdit = (workshop) => {
    setFormData({
      title: workshop.title,
      image: null,
      description: workshop.description,
      date: workshop.date,
      time: workshop.time,
      location: workshop.location,
      ageRange: workshop.ageRange,
      price: workshop.price,
      isFree: workshop.isFree,
    });
    setEditingId(workshop._id);
    setShowForm(true);
    
    // التمرير إلى أعلى الشاشة للوصول إلى النموذج على الشاشات الصغيرة
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: null,
      description: "",
      date: "",
      time: "",
      location: "",
      ageRange: "",
      price: "",
      isFree: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 bg-[#FFF7F2] text-[#2B2B2B]">
      <div className="max-w-6xl mx-auto">
        {/* العنوان - متجاوب مع جميع الشاشات */}
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-1 h-8 bg-[#AA1313] ml-2 sm:ml-3"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">🧵 إدارة الورشات</h2>
        </div>

        {/* شريط البحث وزر الإضافة - متجاوب */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg shadow-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن عنوان الورشة..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 sm:p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
            />
            <span className="absolute left-3 top-2 sm:top-3 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-[#AA1313] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#8a0f0f] transition-colors duration-300 flex items-center justify-center sm:justify-start gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>+</span>
            <span>إضافة ورشة جديدة</span>
          </button>
        </div>

        {/* نموذج الإضافة/التعديل - متجاوب */}
        {showForm && (
          <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-lg bg-white border border-gray-100">
            <div className="bg-[#2B2B2B] text-white p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold">
                {editingId ? "✏️ تعديل الورشة" : "✨ إضافة ورشة جديدة"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">عنوان الورشة</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">التاريخ</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">الوقت</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">الموقع</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">الفئة العمرية</label>
                  <input
                    type="text"
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={(e) =>
                      setFormData({ ...formData, ageRange: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">السعر (دينار)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                    required
                    disabled={formData.isFree}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">الوصف</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2] min-h-32"
                    required
                    rows={4}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 sm:mb-2 font-medium text-[#2B2B2B]">صورة الورشة</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-[#FFF7F2]"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">اختيارية {editingId ? "(اترك فارغاً للاحتفاظ بالصورة الحالية)" : ""}</p>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 p-2 sm:p-3 bg-[#FFF7F2] rounded-lg">
                    <input
                      type="checkbox"
                      id="isFree"
                      checked={formData.isFree}
                      onChange={(e) =>
                        setFormData({ ...formData, isFree: e.target.checked })
                      }
                      className="w-4 h-4 text-[#AA1313]"
                    />
                    <label htmlFor="isFree" className="select-none text-sm sm:text-base">هل الورشة مجانية؟</label>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#AA1313] text-white hover:bg-[#8a0f0f] transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                >
                  {editingId ? "تحديث الورشة" : "إضافة الورشة"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-100 text-[#2B2B2B] hover:bg-gray-200 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* قائمة الورشات - متجاوبة */}
        {workshops.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🧶</div>
            <p className="text-lg sm:text-xl text-gray-500">لا توجد ورشات متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((workshop) => (
              <div
                key={workshop._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {workshop.image && (
                  <div className="relative h-40 sm:h-52">
                    <img
                      src={`${API_URL}${workshop.image}`}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                    {workshop.isFree && (
                      <span className="absolute top-2 left-2 bg-[#AA1313] text-white text-xs sm:text-sm py-1 px-2 sm:px-3 rounded-full">
                        مجانية
                      </span>
                    )}
                  </div>
                )}

                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg sm:text-xl mb-2 text-[#2B2B2B]">{workshop.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{workshop.description}</p>

                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <span>📅</span>
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <span>🕒</span>
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <span>📍</span>
                        <span>{workshop.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <span>👥</span>
                        <span>{workshop.ageRange}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm font-bold">
                        <span>💵</span>
                        <span>{workshop.isFree ? "مجانية" : `${workshop.price} دينار`}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto pt-3">
                    <button
                      onClick={() => handleEdit(workshop)}
                      className="bg-[#2B2B2B] hover:bg-[#262626] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer text-xs sm:text-base"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(workshop._id)}
                      className="bg-[#AA1313] hover:bg-[#8a0f0f] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg flex-1 transition-colors duration-300 cursor-pointer text-xs sm:text-base"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* الترقيم - متجاوب */}
        {totalPages > 1 && (
          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-md inline-flex p-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-base ${currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#2B2B2B] text-white hover:bg-[#262626] cursor-pointer'
                  } transition-colors duration-300`}
              >
                <span>السابق</span>
              </button>
              <span className="px-3 sm:px-5 py-1 sm:py-2 flex items-center text-xs sm:text-base">
                <span className="text-[#AA1313] font-bold">{currentPage}</span>
                <span className="mx-1">من</span>
                <span className="text-[#2B2B2B]">{totalPages}</span>
              </span>
              <button
                onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-5 py-1 sm:py-2 rounded-lg flex items-center gap-1 text-xs sm:text-base ${currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#AA1313] text-white hover:bg-[#8a0f0f] cursor-pointer'
                  } transition-colors duration-300`}
              >
                <span>التالي</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workshops;