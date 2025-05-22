import React, { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/notifications", {
        withCredentials: true,
      });
      setNotifications(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ دالة لتحديد الإشعار كمقروء
  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/notifications/${id}/mark-read`, {}, {
        withCredentials: true,
      });
      // تحديث الإشعارات
      fetchNotifications();
    } catch (error) {
      console.error("فشل في تحديث الإشعار:", error);
    }
  };

  return (
    <div className="p-6 bg-[#FFF7F2]">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
          <h2 className="text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">الإشعارات الأخيرة</h2>
        </div>

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 bg-white rounded-lg">
            لا توجد إشعارات حالياً
          </div>
        ) : (
          <ul className="bg-white rounded-lg overflow-hidden">
            {notifications.map((note) => (
              <li
                key={note._id}
                className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${!note.isRead ? "bg-[#FFF7F2] border-r-4 border-[#AA1313]" : ""
                  }`}
                onClick={() => markAsRead(note._id)}
              >
                <div className="font-medium text-[#2B2B2B]">{note.title || "إشعار"}</div>
                <div className="text-gray-700 my-1">{note.message}</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleString("ar-JO")}
                  </span>
                  {!note.isRead && (
                    <span className="text-xs text-[#AA1313] bg-[#FFF7F2] px-2 py-1 rounded-full">
                      اضغط لتحديد كمقروء
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Notifications;