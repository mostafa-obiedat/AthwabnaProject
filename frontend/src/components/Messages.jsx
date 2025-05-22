// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function Messages() {
//     const [messages, setMessages] = useState([]);
//     const [selectedMessage, setSelectedMessage] = useState(null);
//     const [subject, setSubject] = useState("");
//     const [replyText, setReplyText] = useState("");
//     const [successMsg, setSuccessMsg] = useState("");
//     const [replyStatus, setReplyStatus] = useState("");
//     const [activeTab, setActiveTab] = useState("inbox");

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/admin/messages", { withCredentials: true })
//             .then((res) => {
//                 setMessages(res.data);
//             });
//     }, []);

//     const handleReplySubmit = async (e) => {
//         e.preventDefault();
      
//         try {
//           await axios.post(
//             "http://localhost:5000/api/admin/reply",
//             {
//               to: selectedMessage.email,
//               subject,
//               text: replyText,
//               messageId: selectedMessage._id,
//             },
//             { withCredentials: true }
//           );
      
//           // إشعار النجاح
//           await Swal.fire({
//             title: "تم بنجاح!",
//             text: "تم إرسال الرد بنجاح",
//             icon: "success",
//             confirmButtonColor: "#AA1313",
//             confirmButtonText: "حسناً",
//             timer: 3000, // يختفي تلقائياً بعد 3 ثواني
//           });
      
//           setSelectedMessage(null);
//           setSubject("");
//           setReplyText("");
//         } catch (err) {
//           // إشعار الخطأ
//           await Swal.fire({
//             title: "خطأ!",
//             text: err.response?.data?.message || "فشل في إرسال الرد",
//             icon: "error",
//             confirmButtonColor: "#AA1313",
//             confirmButtonText: "حسناً",
//           });
//         }
//       };

//     const filteredMessages = messages.filter((msg) =>
//         activeTab === "inbox" ? !msg.isReplied : msg.isReplied
//     );

//     return (
//         <div className="bg-[#FFF7F2] min-h-screen p-6">
//             <div className="max-w-6xl mx-auto px-2">
//                 <div className="flex items-center mb-6">
//                     <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
//                     <h2 className="text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">رسائل التواصل</h2>
//                 </div>
//                 {successMsg && (
//                     <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
//                         {successMsg}
//                     </div>
//                 )}

//                 <div className="flex gap-2 mb-8 bg-white rounded-lg p-1 shadow-md w-fit">
//                     <button
//                         className={`px-5 py-2 rounded-md transition-all duration-300 ${activeTab === "inbox"
//                             ? "bg-[#AA1313] text-white"
//                             : "bg-white text-[#2B2B2B] hover:bg-gray-100 cursor-pointer"
//                             }`}
//                         onClick={() => setActiveTab("inbox")}
//                     >
//                         الواردة
//                     </button>
//                     <button
//                         className={`px-5 py-2 rounded-md transition-all duration-300 ${activeTab === "replied"
//                             ? "bg-[#AA1313] text-white"
//                             : "bg-white text-[#2B2B2B] hover:bg-gray-100 cursor-pointer"
//                             }`}
//                         onClick={() => setActiveTab("replied")}
//                     >
//                         تم الرد عليها
//                     </button>
//                 </div>

//                 {filteredMessages.length === 0 ? (
//                     <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
//                         لا توجد رسائل {activeTab === "inbox" ? "واردة" : "تم الرد عليها"} حالياً
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         {filteredMessages.map((msg) => (
//                             <div
//                                 key={msg._id}
//                                 className="p-6 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
//                             >
//                                 <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
//                                     <div>
//                                         <h3 className="text-xl font-semibold text-[#2B2B2B]">{msg.name}</h3>
//                                         <p className="text-gray-600">{msg.email}</p>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <span className={`px-3 py-1 rounded-full text-sm ${msg.isReplied
//                                             ? "bg-green-100 text-green-800"
//                                             : "bg-red-100 text-red-800"
//                                             }`}>
//                                             {msg.isReplied ? "تم الرد" : "لم يتم الرد"}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="bg-gray-50 p-4 rounded-md mb-3 text-[#2B2B2B]">
//                                     {msg.message}
//                                 </div>

//                                 <div className="flex justify-between items-center">
//                                     {!msg.isReplied && (
//                                         <button
//                                             onClick={() => setSelectedMessage(msg)}
//                                             className="flex items-center gap-2 bg-[#AA1313] text-white px-6 py-2 rounded-md hover:bg-[#8a0f0f] transition-all duration-300 cursor-pointer text-[18px]"
//                                         >
//                                             <span>الرد</span>
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 width="20"
//                                                 height="20"
//                                                 fill="currentColor"
//                                                 viewBox="0 0 16 16"
//                                                 className="mt-0.5" // تعديل بسيط لمحاذاة الأيقونة
//                                             >
//                                                 <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
//                                             </svg>
//                                         </button>
//                                     )}
//                                     <p className="text-sm text-gray-500">
//                                         {new Date(msg.createdAt).toLocaleString("ar-JO")}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {selectedMessage && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                         <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
//                             <div className="bg-[#AA1313] text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
//                                 <h3 className="text-xl font-semibold">الرد على {selectedMessage.name}</h3>
//                                 <button
//                                     onClick={() => setSelectedMessage(null)}
//                                     className="text-white hover:text-gray-200 cursor-pointer"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                                         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
//                                     </svg>
//                                 </button>
//                             </div>

//                             <div className="p-6">
//                                 <div className="mb-4 bg-gray-50 p-4 rounded-md">
//                                     <p className="font-semibold text-[#2B2B2B]">الرسالة الأصلية:</p>
//                                     <p className="text-gray-700 mt-1">{selectedMessage.message}</p>
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block font-medium text-[#2B2B2B] mb-2">الموضوع</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#AA1313] focus:border-transparent outline-none"
//                                         value={subject}
//                                         onChange={(e) => setSubject(e.target.value)}
//                                         required
//                                         placeholder="أدخل موضوع الرد..."
//                                     />
//                                 </div>

//                                 <div className="mb-6">
//                                     <label className="block font-medium text-[#2B2B2B] mb-2">الرسالة</label>
//                                     <textarea
//                                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#AA1313] focus:border-transparent outline-none"
//                                         value={replyText}
//                                         onChange={(e) => setReplyText(e.target.value)}
//                                         rows={6}
//                                         required
//                                         placeholder="أدخل نص الرد..."
//                                     />
//                                 </div>

//                                 <div className="flex gap-3">
//                                     <button
//                                         onClick={handleReplySubmit}
//                                         className="bg-[#AA1313] text-white px-6 py-2 rounded-md hover:bg-[#8a0f0f] transition-colors duration-300 cursor-pointer"
//                                     >
//                                         إرسال الرد
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setSelectedMessage(null)}
//                                         className="px-5 py-2 border border-gray-300 rounded-md text-[#2B2B2B] hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
//                                     >
//                                         إلغاء
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {replyStatus && (
//                     <div className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 text-sm font-medium border-r-4 border-green-500">
//                         {replyStatus}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Messages;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [subject, setSubject] = useState("");
    const [replyText, setReplyText] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [replyStatus, setReplyStatus] = useState("");
    const [activeTab, setActiveTab] = useState("inbox");

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/messages", { withCredentials: true })
            .then((res) => {
                setMessages(res.data);
            });
    }, []);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
      
        try {
          await axios.post(
            "http://localhost:5000/api/admin/reply",
            {
              to: selectedMessage.email,
              subject,
              text: replyText,
              messageId: selectedMessage._id,
            },
            { withCredentials: true }
          );
      
          // إشعار النجاح
          await Swal.fire({
            title: "تم بنجاح!",
            text: "تم إرسال الرد بنجاح",
            icon: "success",
            confirmButtonColor: "#AA1313",
            confirmButtonText: "حسناً",
            timer: 3000, // يختفي تلقائياً بعد 3 ثواني
          });
      
          setSelectedMessage(null);
          setSubject("");
          setReplyText("");
        } catch (err) {
          // إشعار الخطأ
          await Swal.fire({
            title: "خطأ!",
            text: err.response?.data?.message || "فشل في إرسال الرد",
            icon: "error",
            confirmButtonColor: "#AA1313",
            confirmButtonText: "حسناً",
          });
        }
      };

    const filteredMessages = messages.filter((msg) =>
        activeTab === "inbox" ? !msg.isReplied : msg.isReplied
    );

    return (
        <div className="bg-[#FFF7F2] min-h-screen p-3 sm:p-4 md:p-6">
            <div className="max-w-6xl mx-auto px-1 sm:px-2">
                <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-1 h-6 sm:h-8 bg-[#AA1313] ml-2 sm:ml-3"></div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] pb-1 sm:pb-2 w-full border-b border-gray-200">رسائل التواصل</h2>
                </div>
                {successMsg && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 sm:p-4 mb-4 sm:mb-6 rounded-md text-sm sm:text-base">
                        {successMsg}
                    </div>
                )}

                <div className="flex gap-2 mb-4 sm:mb-8 bg-white rounded-lg p-1 shadow-md w-fit">
                    <button
                        className={`px-3 sm:px-5 py-1 sm:py-2 rounded-md transition-all duration-300 text-sm sm:text-base ${activeTab === "inbox"
                            ? "bg-[#AA1313] text-white"
                            : "bg-white text-[#2B2B2B] hover:bg-gray-100 cursor-pointer"
                            }`}
                        onClick={() => setActiveTab("inbox")}
                    >
                        الواردة
                    </button>
                    <button
                        className={`px-3 sm:px-5 py-1 sm:py-2 rounded-md transition-all duration-300 text-sm sm:text-base ${activeTab === "replied"
                            ? "bg-[#AA1313] text-white"
                            : "bg-white text-[#2B2B2B] hover:bg-gray-100 cursor-pointer"
                            }`}
                        onClick={() => setActiveTab("replied")}
                    >
                        تم الرد عليها
                    </button>
                </div>

                {filteredMessages.length === 0 ? (
                    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md text-center text-gray-500 text-sm sm:text-base">
                        لا توجد رسائل {activeTab === "inbox" ? "واردة" : "تم الرد عليها"} حالياً
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-4">
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg._id}
                                className="p-3 sm:p-6 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-[#2B2B2B]">{msg.name}</h3>
                                        <p className="text-gray-600 text-sm sm:text-base">{msg.email}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${msg.isReplied
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}>
                                            {msg.isReplied ? "تم الرد" : "لم يتم الرد"}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 sm:p-4 rounded-md mb-3 text-[#2B2B2B] text-sm sm:text-base">
                                    {msg.message}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                                    {!msg.isReplied && (
                                        <button
                                            onClick={() => setSelectedMessage(msg)}
                                            className="flex items-center justify-center sm:justify-start gap-2 bg-[#AA1313] text-white px-4 sm:px-6 py-2 rounded-md hover:bg-[#8a0f0f] transition-all duration-300 cursor-pointer text-sm sm:text-base"
                                        >
                                            <span>الرد</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                className="mt-0.5" // تعديل بسيط لمحاذاة الأيقونة
                                            >
                                                <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                                            </svg>
                                        </button>
                                    )}
                                    <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-right">
                                        {new Date(msg.createdAt).toLocaleString("ar-JO")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="bg-[#AA1313] text-white px-3 sm:px-6 py-3 sm:py-4 rounded-t-lg flex justify-between items-center sticky top-0">
                                <h3 className="text-base sm:text-xl font-semibold">الرد على {selectedMessage.name}</h3>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="text-white hover:text-gray-200 cursor-pointer p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-3 sm:p-6">
                                <div className="mb-3 sm:mb-4 bg-gray-50 p-3 sm:p-4 rounded-md">
                                    <p className="font-semibold text-[#2B2B2B] text-sm sm:text-base">الرسالة الأصلية:</p>
                                    <p className="text-gray-700 mt-1 text-sm sm:text-base">{selectedMessage.message}</p>
                                </div>

                                <div className="mb-3 sm:mb-4">
                                    <label className="block font-medium text-[#2B2B2B] mb-1 sm:mb-2 text-sm sm:text-base">الموضوع</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#AA1313] focus:border-transparent outline-none text-sm sm:text-base"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                        placeholder="أدخل موضوع الرد..."
                                    />
                                </div>

                                <div className="mb-4 sm:mb-6">
                                    <label className="block font-medium text-[#2B2B2B] mb-1 sm:mb-2 text-sm sm:text-base">الرسالة</label>
                                    <textarea
                                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#AA1313] focus:border-transparent outline-none text-sm sm:text-base"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows={6}
                                        required
                                        placeholder="أدخل نص الرد..."
                                    />
                                </div>

                                <div className="flex gap-2 sm:gap-3">
                                    <button
                                        onClick={handleReplySubmit}
                                        className="bg-[#AA1313] text-white px-3 sm:px-6 py-2 rounded-md hover:bg-[#8a0f0f] transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                                    >
                                        إرسال الرد
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedMessage(null)}
                                        className="px-3 sm:px-5 py-2 border border-gray-300 rounded-md text-[#2B2B2B] hover:bg-gray-100 transition-colors duration-300 cursor-pointer text-sm sm:text-base"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {replyStatus && (
                    <div className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-medium border-r-4 border-green-500">
                        {replyStatus}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messages;