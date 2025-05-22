// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Settings() {
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const [successMsg, setSuccessMsg] = useState("");
//     const [errorMsg, setErrorMsg] = useState("");

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/admin/settings", { withCredentials: true })
//             .then(res => {
//                 setName(res.data.name); // الـ name جاي من username في الباك
//                 setPhone(res.data.phonenumber);
//             })
//             .catch(() => setErrorMsg("❌ Failed to load settings."));
//     }, []);

//     const handleInfoUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put("http://localhost:5000/api/admin/update-info", {
//                 name,
//                 phone,
//             }, { withCredentials: true });

//             setSuccessMsg("✅ Info updated successfully!");
//             setTimeout(() => setSuccessMsg(""), 3000);
//         } catch {
//             setErrorMsg("❌ Failed to update info.");
//         }
//     };

//     const handlePasswordUpdate = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             setErrorMsg("❌ New passwords do not match.");
//             return;
//         }

//         try {
//             await axios.put("http://localhost:5000/api/admin/update-password", {
//                 oldPassword,
//                 newPassword,
//             }, { withCredentials: true });

//             setSuccessMsg("✅ Password updated successfully!");
//             setOldPassword("");
//             setNewPassword("");
//             setConfirmPassword("");
//             setTimeout(() => setSuccessMsg(""), 3000);
//         } catch (err) {
//             setErrorMsg("❌ Failed to update password.");
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-6">Settings</h2>

//             {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
//             {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

//             <form onSubmit={handleInfoUpdate} className="bg-white p-4 rounded shadow mb-6">
//                 <h3 className="text-xl font-semibold mb-4">Update Info</h3>
//                 <div className="mb-3">
//                     <label className="block font-medium">Name</label>
//                     <input
//                         type="text"
//                         className="w-full p-2 border rounded"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="block font-medium">Phone</label>
//                     <input
//                         type="text"
//                         className="w-full p-2 border rounded"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Info</button>
//             </form>

//             <form onSubmit={handlePasswordUpdate} className="bg-white p-4 rounded shadow">
//                 <h3 className="text-xl font-semibold mb-4">Change Password</h3>
//                 <div className="mb-3">
//                     <label className="block font-medium">Current Password</label>
//                     <input
//                         type="password"
//                         className="w-full p-2 border rounded"
//                         value={oldPassword}
//                         onChange={(e) => setOldPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="block font-medium">New Password</label>
//                     <input
//                         type="password"
//                         className="w-full p-2 border rounded"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="block font-medium">Confirm New Password</label>
//                     <input
//                         type="password"
//                         className="w-full p-2 border rounded"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Password</button>
//             </form>
//         </div>
//     );
// }

// export default Settings;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Settings() {
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const [successMsg, setSuccessMsg] = useState("");
//     const [errorMsg, setErrorMsg] = useState("");

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/admin/settings", { withCredentials: true })
//             .then(res => {
//                 setName(res.data.name);
//                 setPhone(res.data.phonenumber);
//             })
//             .catch(() => setErrorMsg("❌ فشل في تحميل الإعدادات."));
//     }, []);

//     const handleInfoUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put("http://localhost:5000/api/admin/update-info", {
//                 name,
//                 phone,
//             }, { withCredentials: true });

//             setSuccessMsg("✅ تم تحديث المعلومات بنجاح!");
//             setTimeout(() => setSuccessMsg(""), 3000);
//         } catch {
//             setErrorMsg("❌ فشل في تحديث المعلومات.");
//         }
//     };

//     const handlePasswordUpdate = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             setErrorMsg("❌ كلمة المرور الجديدة غير متطابقة.");
//             return;
//         }

//         try {
//             await axios.put("http://localhost:5000/api/admin/update-password", {
//                 oldPassword,
//                 newPassword,
//             }, { withCredentials: true });

//             setSuccessMsg("✅ تم تغيير كلمة المرور بنجاح!");
//             setOldPassword("");
//             setNewPassword("");
//             setConfirmPassword("");
//             setTimeout(() => setSuccessMsg(""), 3000);
//         } catch (err) {
//             setErrorMsg("❌ فشل في تغيير كلمة المرور.");
//         }
//     };

//     return (
//         <div className="min-h-screen py-8" style={{ backgroundColor: "#FFF7F2" }}>
//             <div className="max-w-2xl mx-auto p-6">
//                 <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "#2B2B2B" }}>
//                     إعدادات الحساب
//                 </h2>

//                 {successMsg && (
//                     <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
//                         <p className="text-green-700 font-medium text-center">{successMsg}</p>
//                     </div>
//                 )}

//                 {errorMsg && (
//                     <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
//                         <p className="text-red-700 font-medium text-center">{errorMsg}</p>
//                     </div>
//                 )}

//                 <div className="grid gap-8">
//                     <form onSubmit={handleInfoUpdate} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
//                         <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-100" style={{ color: "#2B2B2B" }}>
//                             المعلومات الشخصية
//                         </h3>
//                         <div className="space-y-5">
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>الاسم</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
//                                     style={{ backgroundColor: "#FFF7F2", borderColor: "#e0e0e0", focusRing: "#AA1313" }}
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>رقم الهاتف</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
//                                     style={{ backgroundColor: "#FFF7F2", borderColor: "#e0e0e0", focusRing: "#AA1313" }}
//                                     value={phone}
//                                     onChange={(e) => setPhone(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="pt-2">
//                                 <button 
//                                     type="submit" 
//                                     className="w-full py-3 px-6 rounded-lg font-medium text-white transition-colors duration-200 ease-in-out"
//                                     style={{ backgroundColor: "#AA1313" }}
//                                 >
//                                     حفظ التغييرات
//                                 </button>
//                             </div>
//                         </div>
//                     </form>

//                     <form onSubmit={handlePasswordUpdate} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
//                         <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-100" style={{ color: "#2B2B2B" }}>
//                             تغيير كلمة المرور
//                         </h3>
//                         <div className="space-y-5">
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>كلمة المرور الحالية</label>
//                                 <input
//                                     type="password"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
//                                     style={{ backgroundColor: "#FFF7F2", borderColor: "#e0e0e0", focusRing: "#AA1313" }}
//                                     value={oldPassword}
//                                     onChange={(e) => setOldPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>كلمة المرور الجديدة</label>
//                                 <input
//                                     type="password"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
//                                     style={{ backgroundColor: "#FFF7F2", borderColor: "#e0e0e0", focusRing: "#AA1313" }}
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>تأكيد كلمة المرور الجديدة</label>
//                                 <input
//                                     type="password"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
//                                     style={{ backgroundColor: "#FFF7F2", borderColor: "#e0e0e0", focusRing: "#AA1313" }}
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="pt-2">
//                                 <button 
//                                     type="submit" 
//                                     className="w-full py-3 px-6 rounded-lg font-medium text-white transition-colors duration-200 ease-in-out"
//                                     style={{ backgroundColor: "#AA1313" }}
//                                 >
//                                     تحديث كلمة المرور
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Settings;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from 'sweetalert2';

// function Settings() {
//     const [name, setName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const [successMsg, setSuccessMsg] = useState("");
//     const [errorMsg, setErrorMsg] = useState("");

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/admin/settings", { withCredentials: true })
//             .then(res => {
//                 setName(res.data.name);
//                 setPhone(res.data.phonenumber);
//             })
//             .catch(() => setErrorMsg("❌ فشل في تحميل الإعدادات."));
//     }, []);

//     const handleInfoUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(
//                 "http://localhost:5000/api/admin/update-info",
//                 { name, phone },
//                 { withCredentials: true }
//             );

//             await Swal.fire({
//                 title: 'تم التحديث!',
//                 text: 'تم تحديث المعلومات بنجاح',
//                 icon: 'success',
//                 confirmButtonColor: '#AA1313',
//             });
//         } catch (err) {
//             await Swal.fire({
//                 title: 'خطأ!',
//                 text: err.response?.data?.message || 'فشل في تحديث المعلومات',
//                 icon: 'error',
//                 confirmButtonColor: '#AA1313'
//             });
//         }
//     };

//     const handlePasswordUpdate = async (e) => {
//         e.preventDefault();

//         // التحقق من الحقول الفارغة
//         if (!oldPassword) {
//             await Swal.fire({
//                 title: 'حقل مطلوب',
//                 text: 'يجب إدخال كلمة المرور الحالية',
//                 icon: 'warning',
//                 confirmButtonColor: '#AA1313'
//             });
//             return;
//         }

//         if (!newPassword || !confirmPassword) {
//             await Swal.fire({
//                 title: 'حقل مطلوب',
//                 text: 'يجب إدخال كلمة المرور الجديدة وتأكيدها',
//                 icon: 'warning',
//                 confirmButtonColor: '#AA1313'
//             });
//             return;
//         }

//         // التحقق من تطابق كلمات المرور الجديدة
//         if (newPassword !== confirmPassword) {
//             await Swal.fire({
//                 title: 'عدم تطابق',
//                 text: 'كلمة المرور الجديدة غير متطابقة مع حقل التأكيد',
//                 icon: 'error',
//                 confirmButtonColor: '#AA1313'
//             });
//             return;
//         }

//         try {
//              await axios.put(
//                 "http://localhost:5000/api/admin/update-password",
//                 { oldPassword, newPassword },
//                 { withCredentials: true }
//             );

//             // رسالة النجاح مع تفاصيل إضافية
//             await Swal.fire({
//                 title: 'تم بنجاح!',
//                 html: `
//               <div class="text-center">
//                 <p>تم تحديث كلمة المرور بنجاح</p>
//                 <p class="text-sm text-gray-500 mt-2">${new Date().toLocaleString('ar-JO')}</p>
//               </div>
//             `,
//                 icon: 'success',
//                 confirmButtonColor: '#AA1313',
//             });

//             // إعادة تعيين الحقول
//             setOldPassword("");
//             setNewPassword("");
//             setConfirmPassword("");

//         } catch (err) {
//             let errorMessage = 'فشل في تغيير كلمة المرور';

//             // معالجة أخطاء محددة من السيرفر
//             if (err.response) {
//                 if (err.response.status === 401) {
//                     errorMessage = 'كلمة المرور الحالية غير صحيحة';
//                 } else if (err.response.data?.message) {
//                     errorMessage = err.response.data.message;
//                 }
//             }

//             await Swal.fire({
//                 title: 'خطأ في المصادقة',
//                 text: errorMessage,
//                 icon: 'error',
//                 confirmButtonColor: '#AA1313',
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen p-6" style={{ backgroundColor: "#FFF7F2" }}>
//             <div className="max-w-6xl mx-auto px-2">
//                 <div className="flex items-center mb-6">
//                     <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
//                     <h2 className="text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">
//                         إعدادات الحساب
//                     </h2>
//                 </div>
//                 {successMsg && (
//                     <div className="mb-8 p-4 rounded-lg bg-green-50 border border-green-200 shadow-sm">
//                         <p className="text-green-700 font-medium text-center">{successMsg}</p>
//                     </div>
//                 )}

//                 {errorMsg && (
//                     <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 shadow-sm">
//                         <p className="text-red-700 font-medium text-center">{errorMsg}</p>
//                     </div>
//                 )}

//                 <div className="flex flex-col lg:flex-row gap-8">
//                     <form onSubmit={handleInfoUpdate} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex-1">
//                         <div className="flex items-center justify-center mb-6">
//                             <h3 className="text-2xl font-semibold text-center pb-1 border-b-2" style={{ color: "#2B2B2B", borderColor: "#AA1313" }}>
//                                 المعلومات الشخصية
//                             </h3>
//                         </div>
//                         <div className="space-y-6">
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>الاسم</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
//                                     style={{ backgroundColor: "#FFF7F2" }}
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>رقم الهاتف</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
//                                     style={{ backgroundColor: "#FFF7F2" }}
//                                     value={phone}
//                                     onChange={(e) => setPhone(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="pt-4">
//                                 <button
//                                     type="submit"
//                                     className="w-full py-3 px-6 rounded-lg font-medium text-white bg-[#AA1313] hover:bg-[#8a0f0f] transition-all duration-200 ease-in-out cursor-pointer"
//                                 >
//                                     حفظ التغييرات
//                                 </button>
//                             </div>
//                         </div>
//                     </form>

//                     <form onSubmit={handlePasswordUpdate} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex-1">
//                         <div className="flex items-center justify-center mb-6">
//                             <h3 className="text-2xl font-semibold text-center pb-1 border-b-2" style={{ color: "#2B2B2B", borderColor: "#AA1313" }}>
//                                 تغيير كلمة المرور
//                             </h3>
//                         </div>
//                         <div className="space-y-6">
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>كلمة المرور الحالية</label>
//                                 <input
//                                     type="password"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
//                                     style={{ backgroundColor: "#FFF7F2" }}
//                                     value={oldPassword}
//                                     onChange={(e) => setOldPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>كلمة المرور الجديدة</label>
//                                 <input
//                                     type="password"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
//                                     style={{ backgroundColor: "#FFF7F2" }}
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2" style={{ color: "#2B2B2B" }}>تأكيد كلمة المرور الجديدة</label>
//                                 <input
//                                     type="password"
//                                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
//                                     style={{ backgroundColor: "#FFF7F2" }}
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="pt-4">
//                                 <button
//                                     type="submit"
//                                     className="w-full py-3 px-6 rounded-lg font-medium text-white bg-[#AA1313] hover:bg-[#8a0f0f] transition-all duration-300 ease-in-out cursor-pointer"
//                                 >
//                                     تحديث كلمة المرور
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Settings;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function Settings() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/settings", { withCredentials: true })
            .then(res => {
                setName(res.data.name);
                setPhone(res.data.phonenumber);
            })
            .catch(() => setErrorMsg("❌ فشل في تحميل الإعدادات."));
    }, []);

    const handleInfoUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                "http://localhost:5000/api/admin/update-info",
                { name, phone },
                { withCredentials: true }
            );

            await Swal.fire({
                title: 'تم التحديث!',
                text: 'تم تحديث المعلومات بنجاح',
                icon: 'success',
                confirmButtonColor: '#AA1313',
            });
        } catch (err) {
            await Swal.fire({
                title: 'خطأ!',
                text: err.response?.data?.message || 'فشل في تحديث المعلومات',
                icon: 'error',
                confirmButtonColor: '#AA1313'
            });
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        // التحقق من الحقول الفارغة
        if (!oldPassword) {
            await Swal.fire({
                title: 'حقل مطلوب',
                text: 'يجب إدخال كلمة المرور الحالية',
                icon: 'warning',
                confirmButtonColor: '#AA1313'
            });
            return;
        }

        if (!newPassword || !confirmPassword) {
            await Swal.fire({
                title: 'حقل مطلوب',
                text: 'يجب إدخال كلمة المرور الجديدة وتأكيدها',
                icon: 'warning',
                confirmButtonColor: '#AA1313'
            });
            return;
        }

        // التحقق من تطابق كلمات المرور الجديدة
        if (newPassword !== confirmPassword) {
            await Swal.fire({
                title: 'عدم تطابق',
                text: 'كلمة المرور الجديدة غير متطابقة مع حقل التأكيد',
                icon: 'error',
                confirmButtonColor: '#AA1313'
            });
            return;
        }

        try {
             await axios.put(
                "http://localhost:5000/api/admin/update-password",
                { oldPassword, newPassword },
                { withCredentials: true }
            );

            // رسالة النجاح مع تفاصيل إضافية
            await Swal.fire({
                title: 'تم بنجاح!',
                html: `
              <div class="text-center">
                <p>تم تحديث كلمة المرور بنجاح</p>
                <p class="text-sm text-gray-500 mt-2">${new Date().toLocaleString('ar-JO')}</p>
              </div>
            `,
                icon: 'success',
                confirmButtonColor: '#AA1313',
            });

            // إعادة تعيين الحقول
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {
            let errorMessage = 'فشل في تغيير كلمة المرور';

            // معالجة أخطاء محددة من السيرفر
            if (err.response) {
                if (err.response.status === 401) {
                    errorMessage = 'كلمة المرور الحالية غير صحيحة';
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                }
            }

            await Swal.fire({
                title: 'خطأ في المصادقة',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#AA1313',
            });
        }
    };

    return (
        <div className="min-h-screen p-3 sm:p-4 md:p-6" style={{ backgroundColor: "#FFF7F2" }}>
            <div className="max-w-6xl mx-auto px-1 sm:px-2">
                <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-1 h-6 sm:h-8 bg-[#AA1313] ml-2 sm:ml-3"></div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] pb-1 sm:pb-2 w-full border-b border-gray-200">
                        إعدادات الحساب
                    </h2>
                </div>
                {successMsg && (
                    <div className="mb-4 sm:mb-8 p-3 sm:p-4 rounded-lg bg-green-50 border border-green-200 shadow-sm">
                        <p className="text-green-700 font-medium text-center text-sm sm:text-base">{successMsg}</p>
                    </div>
                )}

                {errorMsg && (
                    <div className="mb-4 sm:mb-8 p-3 sm:p-4 rounded-lg bg-red-50 border border-red-200 shadow-sm">
                        <p className="text-red-700 font-medium text-center text-sm sm:text-base">{errorMsg}</p>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                    <form onSubmit={handleInfoUpdate} className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100 flex-1">
                        <div className="flex items-center justify-center mb-4 sm:mb-6">
                            <h3 className="text-xl sm:text-2xl font-semibold text-center pb-1 border-b-2" style={{ color: "#2B2B2B", borderColor: "#AA1313" }}>
                                المعلومات الشخصية
                            </h3>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <label className="block font-medium mb-1 sm:mb-2" style={{ color: "#2B2B2B" }}>الاسم</label>
                                <input
                                    type="text"
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
                                    style={{ backgroundColor: "#FFF7F2" }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 sm:mb-2" style={{ color: "#2B2B2B" }}>رقم الهاتف</label>
                                <input
                                    type="text"
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
                                    style={{ backgroundColor: "#FFF7F2" }}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="pt-2 sm:pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-white bg-[#AA1313] hover:bg-[#8a0f0f] transition-all duration-200 ease-in-out cursor-pointer"
                                >
                                    حفظ التغييرات
                                </button>
                            </div>
                        </div>
                    </form>

                    <form onSubmit={handlePasswordUpdate} className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100 flex-1">
                        <div className="flex items-center justify-center mb-4 sm:mb-6">
                            <h3 className="text-xl sm:text-2xl font-semibold text-center pb-1 border-b-2" style={{ color: "#2B2B2B", borderColor: "#AA1313" }}>
                                تغيير كلمة المرور
                            </h3>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <label className="block font-medium mb-1 sm:mb-2" style={{ color: "#2B2B2B" }}>كلمة المرور الحالية</label>
                                <input
                                    type="password"
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
                                    style={{ backgroundColor: "#FFF7F2" }}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 sm:mb-2" style={{ color: "#2B2B2B" }}>كلمة المرور الجديدة</label>
                                <input
                                    type="password"
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
                                    style={{ backgroundColor: "#FFF7F2" }}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1 sm:mb-2" style={{ color: "#2B2B2B" }}>تأكيد كلمة المرور الجديدة</label>
                                <input
                                    type="password"
                                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a0f0f] focus:border-transparent"
                                    style={{ backgroundColor: "#FFF7F2" }}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="pt-2 sm:pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-white bg-[#AA1313] hover:bg-[#8a0f0f] transition-all duration-300 ease-in-out cursor-pointer"
                                >
                                    تحديث كلمة المرور
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Settings;